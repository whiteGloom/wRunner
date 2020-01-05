import Helper from '@Helper';

class ValueNoteView {
  constructor(parent, type) {
    this.parent = parent;
    this.type = type;

    this._init();
  }

  destroy() {
    this.valueNote.remove();
  }

  update(options = {}) {
    const {
      positionValue, title,
      limits, direction, track,
    } = options;
    const { minLimit, valuesCount } = limits;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const sizeProperty = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const positionProperty = isHorizontal ? 'left' : 'top';
    const trackScale = track[sizeProperty];

    this.clearTextNodes();
    if (typeof title === 'object') {
      const [titleMin, titleMax] = title;
      this.addTextNode(titleMin);
      this.addTextNode(isHorizontal ? ` - ` : '|');
      this.addTextNode(titleMax);
    } else {
      this.addTextNode(title);
    }

    const noteHalfSize = this.valueNote[sizeProperty] / 2;
    const globalPosition = ((positionValue - minLimit) / valuesCount) * trackScale;
    const position = isHorizontal
      ? ((globalPosition - noteHalfSize) / trackScale) * 100
      : 100 - ((globalPosition + noteHalfSize) / trackScale) * 100;

    this.valueNote.style.cssText = '';
    this.valueNote.style[positionProperty] = `${position}%`;
  }

  applyDisplay(isDisplayed) {
    const classMark = this.valueNote.classList[0];
    this.valueNote.classList[isDisplayed ? 'add' : 'remove'](`${classMark}_display_visible`);
    this.valueNote.classList[isDisplayed ? 'remove' : 'add'](`${classMark}_display_hidden`);
  }

  addTextNode(str) {
    const node = document.createElement("DIV");
    node.innerHTML = str;
    this.valueNote.appendChild(node);
  }

  clearTextNodes() {
    this.valueNote.innerHTML = "";
  }

  _init() {
    this.valueNote = Helper.makeElement(['wrunner__value-note', `wrunner__value-note_type_${this.type}`]);
    this.parent.appendChild(this.valueNote);
  }

  static checkValueNotesMode(options = {}) {
    const {
      notes, limits,
      values, direction,
      mode, track, event,
    } = options;
    const { minLimit, valuesCount } = limits;
    const { rangeValueMin, rangeValueMax } = values;
    const [noteMin, noteMax] = notes;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const sizeProperty = isHorizontal ? 'offsetWidth' : 'offsetHeight';

    const calcPosition = (element, value) => {
      const percent = (value - minLimit) / valuesCount;
      return percent * track[sizeProperty] + element.valueNote[sizeProperty] / 2;
    };

    const sizes = (noteMin.valueNote[sizeProperty] + noteMax.valueNote[sizeProperty]) / 2;
    const distance = calcPosition(noteMax, rangeValueMax) - calcPosition(noteMin, rangeValueMin);

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
