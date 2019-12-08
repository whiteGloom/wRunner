import helper from '@helper';

class PathPassedView {
  constructor({ parent }) {
    this.parent = parent;

    this._init();
  }

  setPosition(limits, values, direction, type) {
    const { minLimit, valuesCount, maxLimit } = limits;
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const isSingle = type.value === type.constants.singleValue;
    const posProp = isHorizontal ? 'left' : 'top';
    const sizeProp = isHorizontal ? 'width' : 'height';
    this.pathPassed.style.cssText = '';

    let position;
    if (isSingle) {
      position = isHorizontal
        ? 0 : 100 - ((singleValue - minLimit) / valuesCount) * 100;
    }
    if (!isSingle) {
      position = isHorizontal
        ? ((rangeValueMin - minLimit) / valuesCount) * 100
        : ((maxLimit - rangeValueMax) / valuesCount) * 100;
    }
    const size = isSingle
      ? ((singleValue - minLimit) / valuesCount) * 100
      : ((rangeValueMax - rangeValueMin) / valuesCount) * 100;

    this.pathPassed.style[sizeProp] = `${size}%`;
    this.pathPassed.style[posProp] = `${position}%`;
  }

  _init() {
    this.pathPassed = helper.makeEl(['wrunner__path-passed']);
    this.parent.appendChild(this.pathPassed);
  }
}

export default PathPassedView;
