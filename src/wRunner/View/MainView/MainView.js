import { boundMethod } from 'autobind-decorator';
import makeEvent from '@event';
import helper from '@helper';
import ValueNotesView from '../ValueNotesView/ValueNotesView';
import HandlersView from '../HandlersView/HandlersView';
import ScaleView from '../ScaleView/ScaleView';
import PathPassedView from '../PathPassedView/PathPassedView';

class View {
  constructor() {
    this._init();
    this._addEvents();
    this._addListenners();
    this.handlersList = [];
    this.valueNotesList = [];
  }

  append(roots) {
    roots.appendChild(this.mainNode);
  }

  applyValueNotesDisplay(display, valueNotesMode) {
    if (!display) {
      this.valueNotesList.forEach((el) => { el.applyDisplay(false); });
      return;
    }

    if (this.valueNotesList.length === 1) this.valueNotesList[0].applyDisplay(true);
    if (this.valueNotesList.length === 3) {
      const values = [true, false, true];
      const isSeparate = valueNotesMode.value === valueNotesMode.constants.separateValue;
      this.valueNotesList.forEach((el, i) => {
        el.applyDisplay(isSeparate ? values[i] : !values[i]);
      });
    }
  }

  generateScaleDivisions(...args) {
    this.scale.generateDivisions(...args);
  }

  updateDOM(type) {
    this.handlersList.concat(this.valueNotesList).forEach((el) => {
      el.destroy();
    });
    this.handlersList.length = 0;
    this.valueNotesList.length = 0;

    if (type.value === type.constants.singleValue) {
      this.handlersList.push(new HandlersView(this.path, 'single'));
      this.valueNotesList.push(new ValueNotesView(this.outer, 'single'));
    }
    if (type.value === type.constants.rangeValue) {
      this.handlersList.push(new HandlersView(this.path, 'min'));
      this.handlersList.push(new HandlersView(this.path, 'max'));
      this.valueNotesList.push(new ValueNotesView(this.outer, 'min'));
      this.valueNotesList.push(new ValueNotesView(this.outer, 'common'));
      this.valueNotesList.push(new ValueNotesView(this.outer, 'max'));
    }
  }

  setPositions(values, limits, direction, type, valueNotesMode) {
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isSingle = type.value === type.constants.singleValue;
    const setValueNote = (el, value, title) => {
      el.setPosition(
        value,
        title || value,
        limits,
        direction,
        this.path,
      );
    };

    window.requestAnimationFrame(() => {
      this.pathPassed.setPosition(limits, values, direction, type);
      if (isSingle) {
        this.handlersList[0].setPosition(singleValue, limits, direction);
        setValueNote(this.valueNotesList[0], singleValue);
      }
      if (!isSingle) {
        const [noteOne, noteSecond, noteThird] = this.valueNotesList;
        this.handlersList[0].setPosition(rangeValueMin, limits, direction);
        this.handlersList[1].setPosition(rangeValueMax, limits, direction);
        setValueNote(noteOne, rangeValueMin);
        setValueNote(noteThird, rangeValueMax);
        setValueNote(
          noteSecond,
          (rangeValueMax + rangeValueMin) / 2,
          [rangeValueMin, rangeValueMax],
        );
        ValueNotesView.checkValueNotesMode(
          [noteOne, noteThird],
          limits,
          values,
          direction,
          valueNotesMode,
          this.path,
          this.valueNoteModeUpdateEvent,
        );
      }
    });
  }

  applyStyles(styles) {
    const els = [
      ...[
        this.mainNode, this.outer,
        this.path, this.pathPassed.pathPassed,
      ],
      ...this.handlersList.map((el) => el.handler),
      ...this.valueNotesList.map((el) => el.valueNote),
      ...this.scale.getElements(),
    ];

    window.requestAnimationFrame(() => {
      els.forEach((el) => {
        Object.values(styles).forEach((style) => {
          const name = el.classList[0];
          const { oldValue, value } = style;

          if (oldValue) el.classList.remove(`${name}_${style.className}_${oldValue}`);
          el.classList.add(`${name}_${style.className}_${value}`);
        });
      });
    });
  }

  handleMouseDown(eventDown, direction) {
    eventDown.preventDefault();
    if (eventDown.button !== 0) return;
    let wasDragged = false;

    const calc = (event) => {
      const isHorizontal = direction.value === direction.constants.horizontalValue;
      const min = this.path.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
      const scale = this.path[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
      const pos = event[isHorizontal ? 'clientX' : 'clientY'];

      // If the dragging is out of slider's range, the function stops.
      if (pos < min - 10 || pos > min + scale + 10) return;

      const data = ((pos - min) / scale) * 100;
      this.UIValueAction.trigger(isHorizontal ? data : 100 - data);
    };

    const handleMouseMove = (eventMove) => {
      eventMove.preventDefault();
      calc(eventMove);
    };

    const handleMouseMoveOnce = () => { wasDragged = true; };

    const handleMouseUp = (eventUp) => {
      eventUp.preventDefault();
      const { target } = eventUp;
      document.body.removeEventListener('mousemove', handleMouseMove);

      if (wasDragged || this.handlersList.map((el) => el.handler).includes(target)) return;

      calc(eventUp);
    };

    document.body.addEventListener('mousemove', handleMouseMoveOnce, { once: true });
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  _init() {
    this.mainNode = helper.makeEl(['wrunner']);
    this.outer = helper.makeEl(['wrunner__outer']);
    this.path = helper.makeEl(['wrunner__path']);

    this.outer.appendChild(this.path);

    this.pathPassed = new PathPassedView({ parent: this.path });
    this.scale = new ScaleView({ parent: this.outer });

    window.requestAnimationFrame(() => {
      this.mainNode.appendChild(this.outer);
    });
  }

  @boundMethod
  _resize(event) {
    this.windowResizeEvent.trigger(event);
  }

  @boundMethod
  _handleMouseDown(event) {
    this.UIActionMouseDown.trigger(event);
  }

  _addEvents() {
    this.UIActionMouseDown = makeEvent();
    this.UIValueAction = makeEvent();
    this.windowResizeEvent = makeEvent();

    this.valueNoteModeUpdateEvent = makeEvent();
  }

  _addListenners() {
    window.addEventListener('resize', this._resize);
    this.path.addEventListener('mousedown', this._handleMouseDown);
  }
}

export default View;
