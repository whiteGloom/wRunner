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
  }

  append(roots) {
    roots.appendChild(this.mainNode);
  }

  applyValueNotesDisplay(...args) {
    this.valueNotes.applyDisplay(...args, this.path);
  }

  generateScaleDivisions(...args) {
    this.scale.generateDivisions(...args);
  }

  updateDOM(type) {
    this.handlers.updateDOM(type);
    this.valueNotes.updateDOM(type);
  }

  setPositions(values, limits, direction, type, valueNotesMode) {
    this.pathPassed.setPosition(limits, values, direction, type);

    this.handlers.setPosition(limits, values, direction);
    this.valueNotes.setPosition(limits, values, direction, valueNotesMode, this.path);
  }

  applyStyles(styles) {
    const els = [
      ...[
        this.mainNode, this.outer,
        this.path,
      ],
      ...this.pathPassed.getElements(),
      ...this.handlers.getElements(),
      ...this.valueNotes.getElements(),
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

  handleMouseDownAction(eventDown, direction) {
    if (eventDown.button !== 0) return;
    let wasDragged = false;

    // Handlers
    const handler = (event) => {
      const isHorizontal = direction.value === direction.constants.horizontalValue;
      const scale = this.path[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
      const min = this.path.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
      const pos = event[isHorizontal ? 'clientX' : 'clientY'];

      // If the dragging is out of slider's range, the function stops.
      if (pos < min - 10 || pos > min + scale + 10) return;

      const data = ((pos - min) / scale) * 100;
      this.UIValueAction.trigger(isHorizontal ? data : 100 - data);
    };
    const mouseUp = (eventUp) => {
      const { target } = eventUp;
      document.body.removeEventListener('mousemove', handler);

      if (wasDragged) return;
      if (this.handlers.getElements().includes(target)) return;

      handler(eventUp);
    };

    document.body.addEventListener('mousemove', () => { wasDragged = true; }, { once: true });
    document.body.addEventListener('mousemove', handler);
    document.body.addEventListener('mouseup', mouseUp, { once: true });
  }

  _init() {
    this.mainNode = helper.makeEl(['wrunner']);
    this.outer = helper.makeEl(['wrunner__outer']);
    this.path = helper.makeEl(['wrunner__path']);

    this.outer.appendChild(this.path);

    this.pathPassed = new PathPassedView({ parent: this.path });
    this.handlers = new HandlersView({ parent: this.path });
    this.valueNotes = new ValueNotesView({ parent: this.outer });
    this.scale = new ScaleView({ parent: this.outer });

    window.requestAnimationFrame(() => {
      this.mainNode.appendChild(this.outer);
    });
  }

  _addEvents() {
    this.UIActionMouseDown = makeEvent();
    this.UIValueAction = makeEvent();
    this.windowResizeEvent = makeEvent();

    this.valueNoteModeUpdateEvent = this.valueNotes.valueNoteModeUpdateEvent;
  }

  _addListenners() {
    this.path.addEventListener('mousedown', this.UIActionMouseDown.trigger);
    window.addEventListener('resize', this.windowResizeEvent.trigger);
  }
}

export default View;
