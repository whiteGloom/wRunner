import makeEvent from '@event';
import helper from '@helper';

class ValueNotesView {
  constructor(parent) {
    this.parent = parent;

    this._init();
  }

  destroy() {
    this.valueNote.remove();
  }

  setPosition(value, title, limits, direction, path) {
    const { minLimit, valuesCount } = limits;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const sizeProp = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const posProp = isHorizontal ? 'left' : 'top';
    const pathScale = path[sizeProp];
    const noteHalfScale = this.valueNote[sizeProp] / 2;

    this.valueNote.innerHTML = typeof title === 'object'
      ? `${title[0]}${isHorizontal ? ' - ' : '<br>|<br>'}${title[1]}`
      : title;

    const globalPosition = ((value - minLimit) / valuesCount) * pathScale;
    const position = isHorizontal
      ? ((globalPosition - noteHalfScale) / pathScale) * 100
      : 100 - ((globalPosition + noteHalfScale) / pathScale) * 100;

    this.valueNote.style.cssText = '';
    this.valueNote.style[posProp] = `${position}%`;
  }

  applyDisplay(value) {
    const mark = this.valueNote.classList[0];
    this.valueNote.classList[value ? 'add' : 'remove'](`${mark}_display_visible`);
    this.valueNote.classList[value ? 'remove' : 'add'](`${mark}_display_hidden`);
  }

  _init() {
    this.valueNote = helper.makeEl(['wrunner__value-note', `wrunner__value-note_type_${this.type}`]);
    this.parent.appendChild(this.valueNote);
  }

  static checkValueNotesMode(els, limits, values, direction, mode, path, event) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const sizeProp = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const { minLimit, valuesCount } = limits;
    const { rangeValueMin, rangeValueMax } = values;
    const calcPos = (el, value) => {
      const percent = (value - minLimit) / valuesCount;
      return percent * path[sizeProp] + el.valueNote[sizeProp] / 2;
    };

    const sizes = (els[0].valueNote[sizeProp] + els[1].valueNote[sizeProp]) / 2;
    const distance = calcPos(els[1], rangeValueMax) - calcPos(els[0], rangeValueMin);
    if (distance >= sizes) {
      if (mode.value !== mode.constants.separateValue) {
        event.trigger(mode.constants.separateValue);
      }
    } else if (mode.value !== mode.constants.commonValue) {
      event.trigger(mode.constants.commonValue);
    }
  }
}

export default ValueNotesView;
