import helper from '@helper';

class HandlersView {
  constructor(parent, type) {
    this.parent = parent;
    this.type = type;

    this._init();
  }

  destroy() {
    this.handler.remove();
  }

  setPosition(value, limits, direction) {
    const { minLimit, valuesCount } = limits;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const posProp = isHorizontal ? 'left' : 'top';
    const position = isHorizontal
      ? ((value - minLimit) / valuesCount) * 100
      : 100 - ((value - minLimit) / valuesCount) * 100;

    this.handler.style.cssText = '';
    this.handler.style[posProp] = `${position}%`;
  }

  _init() {
    this.handler = helper.makeEl(['wrunner__handle', `wrunner__handle_type_${this.type}`]);
    this.parent.appendChild(this.handler);
  }
}

export default HandlersView;
