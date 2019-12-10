import { boundMethod } from 'autobind-decorator';
import helper from '@helper';
import makeEvent from '@event';

class TrackView {
  constructor({ parent }) {
    this.parent = parent;

    this._init();
    this._addEvents();
    this._addListenners();
  }

  handleUIAction(eventDown, direction, handlers) {
    eventDown.preventDefault();
    if (eventDown.button !== 0) return;
    let wasDragged = false;

    const handleMouseMoveOnce = () => { wasDragged = true; };

    const handleMouseMove = (eventMove) => {
      eventMove.preventDefault();
      this._calculateUIMouseActionPosition(eventMove, direction);
    };

    const handleMouseUp = (eventUp) => {
      eventUp.preventDefault();
      const { target } = eventUp;
      document.body.removeEventListener('mousemove', handleMouseMove);

      if (wasDragged || handlers.includes(target)) return;

      this._calculateUIMouseActionPosition(eventUp, direction);
    };

    document.body.addEventListener('mousemove', handleMouseMoveOnce, { once: true });
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  setPosition(limits, values, direction, type) {
    const { minLimit, valuesCount, maxLimit } = limits;
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const isSingle = type.value === type.constants.singleValue;
    const posProp = isHorizontal ? 'left' : 'top';
    const sizeProp = isHorizontal ? 'width' : 'height';
    this.progress.style.cssText = '';

    let position;
    if (isSingle) {
      position = isHorizontal
        ? 0 : 100 - ((singleValue - minLimit) / valuesCount) * 100;
    } else {
      position = isHorizontal
        ? ((rangeValueMin - minLimit) / valuesCount) * 100
        : ((maxLimit - rangeValueMax) / valuesCount) * 100;
    }
    const size = isSingle
      ? ((singleValue - minLimit) / valuesCount) * 100
      : ((rangeValueMax - rangeValueMin) / valuesCount) * 100;

    this.progress.style[sizeProp] = `${size}%`;
    this.progress.style[posProp] = `${position}%`;
  }

  @boundMethod
  _calculateUIMouseActionPosition(action, direction) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const min = this.track.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
    const scale = this.track[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
    const pos = action[isHorizontal ? 'clientX' : 'clientY'];

    // If the dragging is out of slider's range, the function stops.
    if (pos < min - 10 || pos > min + scale + 10) return;

    const eventPos = ((pos - min) / scale) * 100;
    this.UIActionPosCalculatedEvent.trigger(isHorizontal ? eventPos : 100 - eventPos);
  }

  @boundMethod
  _handleMouseDown(event) {
    this.mousedownEvent.trigger(event);
  }

  _addEvents() {
    this.mousedownEvent = makeEvent();
    this.UIActionPosCalculatedEvent = makeEvent();
  }

  _addListenners() {
    this.track.addEventListener('mousedown', this._handleMouseDown);
  }

  _init() {
    this.track = helper.makeEl(['wrunner__track']);
    this.progress = helper.makeEl(['wrunner__progress']);
    this.track.appendChild(this.progress);
    this.parent.appendChild(this.track);
  }
}

export default TrackView;
