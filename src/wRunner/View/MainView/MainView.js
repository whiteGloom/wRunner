import { boundMethod } from 'autobind-decorator';
import makeEvent from '@event';
import Helper from '@Helper';

import TrackView from '../TrackView/TrackView';
import HandlerView from '../HandlerView/HandlerView';
import ValueNoteView from '../ValueNoteView/ValueNoteView';
import ScaleView from '../ScaleView/ScaleView';

class View {
  constructor() {
    this.handlersList = [];
    this.valueNotesList = [];

    this._init();
    this._addEvents();
    this._addListenners();
  }

  append(roots) {
    roots.appendChild(this.mainNode);
  }

  handleMouseAction(event, direction) {
    this.track.handleMouseAction(event, direction, this.handlersList.map((el) => el.handler));
  }

  updateScaleDivisions(count) {
    this.scale.updateDivisions(count);
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

  updateDOM(type) {
    this.handlersList.concat(this.valueNotesList).forEach((el) => {
      el.destroy();
    });
    this.handlersList.length = 0;
    this.valueNotesList.length = 0;

    if (type.value === type.constants.singleValue) {
      this.handlersList.push(new HandlerView(this.track.track, 'single'));
      this.valueNotesList.push(new ValueNoteView(this.outer, 'single'));
    }
    if (type.value === type.constants.rangeValue) {
      this.handlersList.push(new HandlerView(this.track.track, 'min'));
      this.handlersList.push(new HandlerView(this.track.track, 'max'));
      this.valueNotesList.push(new ValueNoteView(this.outer, 'min'));
      this.valueNotesList.push(new ValueNoteView(this.outer, 'common'));
      this.valueNotesList.push(new ValueNoteView(this.outer, 'max'));
    }
  }

  setPositions(values, limits, direction, type, valueNotesMode) {
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isSingle = type.value === type.constants.singleValue;
    const setValueNotePosition = (note, positionValue, title) => {
      note.setPosition(
        positionValue,
        title || positionValue,
        limits,
        direction,
        this.track.track,
      );
    };

    window.requestAnimationFrame(() => {
      this.track.setPosition(limits, values, direction, type);
      if (isSingle) {
        this.handlersList[0].setPosition(singleValue, limits, direction);
        setValueNotePosition(this.valueNotesList[0], singleValue);
      }
      if (!isSingle) {
        const [handlerOne, handlerTwo] = this.handlersList;
        const [noteOne, noteSecond, noteThird] = this.valueNotesList;

        handlerOne.setPosition(rangeValueMin, limits, direction);
        handlerTwo.setPosition(rangeValueMax, limits, direction);

        setValueNotePosition(noteOne, rangeValueMin);
        setValueNotePosition(noteThird, rangeValueMax);
        setValueNotePosition(
          noteSecond,
          (rangeValueMax + rangeValueMin) / 2,
          [rangeValueMin, rangeValueMax],
        );
        ValueNoteView.checkValueNotesMode(
          [noteOne, noteThird],
          limits,
          values,
          direction,
          valueNotesMode,
          this.track.track,
          this.valueNoteModeUpdateEvent,
        );
      }
    });
  }

  applyStyles(styles) {
    const elements = [
      ...[this.mainNode, this.outer],
      ...[this.track.track, this.track.progress],
      ...this.handlersList.map((handlerInstance) => handlerInstance.handler),
      ...this.valueNotesList.map((valueNoteInstance) => valueNoteInstance.valueNote),
      ...this.scale.getElements(),
    ];

    window.requestAnimationFrame(() => {
      elements.forEach((element) => {
        Object.values(styles).forEach((style) => {
          const name = element.classList[0];
          const { oldValue, value } = style;

          if (oldValue) element.classList.remove(`${name}_${style.className}_${oldValue}`);
          element.classList.add(`${name}_${style.className}_${value}`);
        });
      });
    });
  }

  _init() {
    this.mainNode = Helper.makeElement(['wrunner']);
    this.outer = Helper.makeElement(['wrunner__outer']);

    this.track = new TrackView({ parent: this.outer });
    this.scale = new ScaleView({ parent: this.outer });

    window.requestAnimationFrame(() => {
      this.mainNode.appendChild(this.outer);
    });
  }

  @boundMethod
  _resize(event) {
    this.windowResizeEvent.trigger(event);
  }

  _addEvents() {
    this.windowResizeEvent = makeEvent();
    this.valueNoteModeUpdateEvent = makeEvent();

    this.trackMousedownEvent = this.track.mousedownEvent;
    this.actionPositionCalculatedEvent = this.track.actionPositionCalculatedEvent;
  }

  _addListenners() {
    window.addEventListener('resize', this._resize);
  }
}

export default View;
