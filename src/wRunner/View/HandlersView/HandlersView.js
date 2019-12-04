import helper from '@helper';

class HandlersView {
  constructor({ parent }) {
    this.parent = parent;
    this.handlersList = [];
  }

  updateDOM(type) {
    this.handlersList.forEach((el) => {
      el.remove();
    });
    this.handlersList.length = 0;

    if (type.value === type.constants.singleValue) {
      this.handlersList.push(helper.makeEl(['wrunner__handle', 'wrunner__handle_type_single']));
    }
    if (type.value === type.constants.rangeValue) {
      this.handlersList.push(helper.makeEl(['wrunner__handle', 'wrunner__handle_type_min']));
      this.handlersList.push(helper.makeEl(['wrunner__handle', 'wrunner__handle_type_max']));
    }

    window.requestAnimationFrame(() => {
      this.handlersList.forEach((el) => {
        this.parent.appendChild(el);
      });
    });
  }

  setPosition(limits, values, direction) {
    const { minLimit, valuesCount } = limits;
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const posProp = isHorizontal ? 'left' : 'top';

    function setPosition(element, value) {
      const el = element;
      el.style.cssText = '';
      const position = isHorizontal
        ? ((value - minLimit) / valuesCount) * 100
        : 100 - ((value - minLimit) / valuesCount) * 100;

      el.style[posProp] = `${position}%`;
    }

    window.requestAnimationFrame(() => {
      if (this.handlersList.length === 1) {
        setPosition(this.handlersList[0], singleValue);
      }
      if (this.handlersList.length === 2) {
        setPosition(this.handlersList[0], rangeValueMin);
        setPosition(this.handlersList[1], rangeValueMax);
      }
    });
  }

  getElements() {
    return [...this.handlersList];
  }
}

export default HandlersView;
