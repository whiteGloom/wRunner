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

  applyValueNotesDisplay(isDisplayed, valueNotesMode) {
    if (!isDisplayed) {
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

  setPositions({
    values,
    limits,
    direction,
    type,
    valueNotesMode,
  }) {
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isSingle = type.value === type.constants.singleValue;
    const updateValueNote = (note, positionValue, title) => {
      note.update({
        title: title || positionValue,
        track: this.track.track,
        positionValue,
        limits,
        direction,
      });
    };

    window.requestAnimationFrame(() => {
      this.track.setPosition(limits, values, direction, type);
      if (isSingle) {
        this.handlersList[0].setPosition(singleValue, limits, direction);
        updateValueNote(this.valueNotesList[0], singleValue);
      }
      if (!isSingle) {
        const [handlerMin, handlerMax] = this.handlersList;
        const [noteMin, noteCommon, noteMax] = this.valueNotesList;
        const noteCommonPosition = (rangeValueMax + rangeValueMin) / 2;

        handlerMin.setPosition(rangeValueMin, limits, direction);
        handlerMax.setPosition(rangeValueMax, limits, direction);

        updateValueNote(noteMin, rangeValueMin);
        updateValueNote(noteMax, rangeValueMax);
        updateValueNote(noteCommon, noteCommonPosition, [rangeValueMin, rangeValueMax]);
        ValueNoteView.checkValueNotesMode({
          event: this.valueNotesModeUpdateEvent,
          notes: [noteMin, noteMax],
          track: this.track.track,
          mode: valueNotesMode,
          direction,
          limits,
          values,
        });
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

  @boundMethod
  _resize(event) {
    this.windowResizeEvent.trigger(event);
  }

  _addEvents() {
    this.windowResizeEvent = makeEvent();
    this.valueNotesModeUpdateEvent = makeEvent();

    this.trackMousedownEvent = this.track.mousedownEvent;
    this.actionPositionCalculatedEvent = this.track.actionPositionCalculatedEvent;
  }

  _addListenners() {
    window.addEventListener('resize', this._resize);
  }

  _init() {
    this.mainNode = Helper.makeElement(['wrunner']);
    this.outer = Helper.makeElement(['wrunner__outer']);

    this.track = new TrackView({ parent: this.outer });
    this.scale = new ScaleView({ parent: this.outer });

    window.requestAnimationFrame(() => {
      this.mainNode.appendChild(this.outer);
    });

    this._addEvents();
    this._addListenners();
  }
}

export default View;
