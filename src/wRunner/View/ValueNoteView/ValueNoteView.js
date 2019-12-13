import makeEvent from '@event';
import helper from '@helper';

class ValueNoteView {
  constructor(parent, type) {
    this.parent = parent;
    this.type = type;

    this._init();
  }

  destroy() {
    this.valueNote.remove();
  }

  setPosition(positionValue, title, limits, direction, track) {
    const { minLimit, valuesCount } = limits;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const sizeProperty = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const positionProperty = isHorizontal ? 'left' : 'top';
    const trackScale = track[sizeProperty];

    this.valueNote.innerHTML = typeof title === 'object'
      ? `${title[0]}${isHorizontal ? ' - ' : '<br>|<br>'}${title[1]}`
      : title;

    const noteHalfScale = this.valueNote[sizeProperty] / 2;
    const globalPosition = ((positionValue - minLimit) / valuesCount) * trackScale;
    const position = isHorizontal
      ? ((globalPosition - noteHalfScale) / trackScale) * 100
      : 100 - ((globalPosition + noteHalfScale) / trackScale) * 100;

    this.valueNote.style.cssText = '';
    this.valueNote.style[positionProperty] = `${position}%`;
  }

  applyDisplay(displayValue) {
    const classMark = this.valueNote.classList[0];
    this.valueNote.classList[displayValue ? 'add' : 'remove'](`${classMark}_display_visible`);
    this.valueNote.classList[displayValue ? 'remove' : 'add'](`${classMark}_display_hidden`);
  }

  _init() {
    this.valueNote = helper.makeElement(['wrunner__value-note', `wrunner__value-note_type_${this.type}`]);
    this.parent.appendChild(this.valueNote);
  }

  static checkValueNotesMode(notes, limits, values, direction, mode, path, event) {
    const [noteOne, noteTwo] = notes;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const sizeProperty = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const { minLimit, valuesCount } = limits;
    const { rangeValueMin, rangeValueMax } = values;

    const calcPosition = (element, value) => {
      const percent = (value - minLimit) / valuesCount;
      return percent * path[sizeProperty] + element.valueNote[sizeProperty] / 2;
    };

    const sizes = (noteOne.valueNote[sizeProperty] + noteTwo.valueNote[sizeProperty]) / 2;
    const distance = calcPosition(noteTwo, rangeValueMax) - calcPosition(noteOne, rangeValueMin);

    if (distance >= sizes) {
      if (mode.value !== mode.constants.separateValue) {
        event.trigger(mode.constants.separateValue);
      }
    } else if (mode.value !== mode.constants.commonValue) {
      event.trigger(mode.constants.commonValue);
    }
  }
}

export default ValueNoteView;
