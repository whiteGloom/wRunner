import { boundMethod } from 'autobind-decorator';
import helper from '@helper';
import makeEvent from '@event';

class TrackView {
  constructor({ parent }) {
    this.parent = parent;

    this._init();
    this._addEvents();
    this._addListeners();
  }

  handleMouseAction(eventDown, direction, handlers) {
    eventDown.preventDefault();
    if (eventDown.button !== 0) return;
    let wasDragged = false;

    const handleMouseMoveOnce = () => { wasDragged = true; };

    const handleMouseMove = (eventMove) => {
      eventMove.preventDefault();
      this._calculateMouseActionPosition(eventMove, direction);
    };

    const handleMouseUp = (eventUp) => {
      eventUp.preventDefault();
      const { target } = eventUp;
      window.removeEventListener('mousemove', handleMouseMove);

      if (wasDragged || handlers.includes(target)) return;

      this._calculateMouseActionPosition(eventUp, direction);
    };

    window.addEventListener('mousemove', handleMouseMoveOnce, { once: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp, { once: true });
  }

  setPosition(limits, values, direction, type) {
    const { minLimit, valuesCount, maxLimit } = limits;
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const isSingle = type.value === type.constants.singleValue;
    const positionProperty = isHorizontal ? 'left' : 'top';
    const sizeProperty = isHorizontal ? 'width' : 'height';
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

    this.progress.style[sizeProperty] = `${size}%`;
    this.progress.style[positionProperty] = `${position}%`;
  }

  @boundMethod
  _calculateMouseActionPosition(action, direction) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const leftTrackBorder = this.track.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
    const trackScale = this.track[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
    const position = action[isHorizontal ? 'clientX' : 'clientY'];

    const eventPosition = ((position - leftTrackBorder) / trackScale) * 100;
    this.actionPositionCalculatedEvent.trigger(isHorizontal ? eventPosition : 100 - eventPosition);
  }

  @boundMethod
  _handleMouseDown(event) {
    this.mousedownEvent.trigger(event);
  }

  _addEvents() {
    this.mousedownEvent = makeEvent();
    this.actionPositionCalculatedEvent = makeEvent();
  }

  _addListeners() {
    this.track.addEventListener('mousedown', this._handleMouseDown);
  }

  _init() {
    this.track = helper.makeElement(['wrunner__track']);
    this.progress = helper.makeElement(['wrunner__progress']);
    this.track.appendChild(this.progress);
    this.parent.appendChild(this.track);
  }
}

export default TrackView;
