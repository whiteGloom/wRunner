class Helper {
  isNumber(value) {
    if ((typeof value === 'number' || typeof value === 'string') && isFinite(+value)) return true;

    return false;
  }

  isObject(el) {
    if (typeof el === 'object' && el !== null) return true;

    return false;
  }

  toNumber(value) {
    if (this.isNumber(value)) return +value;

    return false;
  }

  isDOMEl(el) {
    if (this.isObject(el)
      && el.constructor !== Object
      && this.isNumber(el.nodeType)
      && +el.nodeType === 1) return true;

    return false;
  }

  makeEl(classes) {
    const el = document.createElement('div');
    classes.forEach((nodeClass) => {
      el.classList.add(nodeClass);
    });
    return el;
  }
}

export default new Helper();
