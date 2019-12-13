import helper from '@helper';

class HandlerView {
  constructor(parent, type) {
    this.parent = parent;
    this.type = type;

    this._init();
  }

  destroy() {
    this.handler.remove();
  }

  setPosition(positionValue, limits, direction) {
    const { minLimit, valuesCount } = limits;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const positionProperty = isHorizontal ? 'left' : 'top';
    const position = isHorizontal
      ? ((positionValue - minLimit) / valuesCount) * 100
      : 100 - ((positionValue - minLimit) / valuesCount) * 100;

    this.handler.style.cssText = '';
    this.handler.style[positionProperty] = `${position}%`;
  }

  _init() {
    this.handler = helper.makeElement(['wrunner__handle', `wrunner__handle_type_${this.type}`]);
    this.parent.appendChild(this.handler);
  }
}

export default HandlerView;
