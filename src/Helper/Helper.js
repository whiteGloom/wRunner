class Helper {
  static isNumber(value) {
    if ((typeof value === 'number' || typeof value === 'string') && Number.isFinite(Number(value))) {
      return true;
    }

    return false;
  }

  static isObject(el) {
    if (typeof el === 'object' && el !== null) return true;

    return false;
  }

  static toNumber(value) {
    if (Helper.isNumber(value)) return +value;

    return false;
  }

  static isDOMEl(el) {
    if (Helper.isObject(el)
      && el.constructor !== Object
      && Helper.isNumber(el.nodeType)
      && Number(el.nodeType) === 1) return true;

    return false;
  }

  static makeElement(classes) {
    const el = document.createElement('div');
    classes.forEach((nodeClass) => {
      el.classList.add(nodeClass);
    });
    return el;
  }
}

export default Helper;
