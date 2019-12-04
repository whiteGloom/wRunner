import makeEvent from '@event';
import helper from '@helper';

class ValueNotesView {
  constructor({ parent }) {
    this.parent = parent;
    this.valueNotesList = [];

    this._addEvents();
  }

  updateDOM(type) {
    this.valueNotesList.forEach((el) => {
      el.remove();
    });
    this.valueNotesList.length = 0;

    if (type.value === type.constants.singleValue) {
      this.valueNotesList.push(helper.makeEl(['wrunner__value-note', 'wrunner__value-note_type_single']));
    }
    if (type.value === type.constants.rangeValue) {
      this.valueNotesList.push(helper.makeEl(['wrunner__value-note', 'wrunner__value-note_type_min']));
      this.valueNotesList.push(helper.makeEl(['wrunner__value-note', 'wrunner__value-note_type_common']));
      this.valueNotesList.push(helper.makeEl(['wrunner__value-note', 'wrunner__value-note_type_max']));
    }

    window.requestAnimationFrame(() => {
      this.valueNotesList.forEach((el) => {
        this.parent.appendChild(el);
      });
    });
  }

  setPosition(limits, values, direction, valueNotesMode, path) {
    const { minLimit, valuesCount } = limits;
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const getSizeProp = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const posProp = isHorizontal ? 'left' : 'top';

    const draw = (element, value, title) => {
      const pathScale = path[getSizeProp];
      const el = element;
      const percent = (value - minLimit) / valuesCount;
      el.style.cssText = '';
      el.innerHTML = typeof title === 'object'
        ? `${title[0]}${isHorizontal ? ' - ' : '<br>|<br>'}${title[1]}`
        : title;

      const position = isHorizontal
        ? ((percent * pathScale - el[getSizeProp] / 2) / pathScale) * 100
        : 100 - ((percent * pathScale + el[getSizeProp] / 2) / pathScale) * 100;
      el.style[posProp] = `${position}%`;
    };

    window.requestAnimationFrame(() => {
      if (this.valueNotesList.length === 1) {
        draw(this.valueNotesList[0], singleValue, singleValue);
      }
      if (this.valueNotesList.length === 3) {
        draw(this.valueNotesList[0], rangeValueMin, rangeValueMin);
        draw(this.valueNotesList[1], (rangeValueMin + rangeValueMax) / 2,
          [rangeValueMin, rangeValueMax]);
        draw(this.valueNotesList[2], rangeValueMax, rangeValueMax);

        this._checkValueNotesMode(limits, values, direction, valueNotesMode, path);
      }
    });
  }

  applyDisplay(display, valueNotesMode) {
    function set(el, value) {
      const mark = el.classList[0];
      el.classList[value ? 'add' : 'remove'](`${mark}_display_visible`);
      el.classList[value ? 'remove' : 'add'](`${mark}_display_hidden`);
    }

    window.requestAnimationFrame(() => {
      if (!display) {
        this.valueNotesList.forEach((el) => {
          set(el, false);
        });
        return;
      }
      if (this.valueNotesList.length === 1) {
        set(this.valueNotesList[0], true);
      }
      if (this.valueNotesList.length === 3) {
        const values = [true, false, true];
        const isSep = valueNotesMode.value === valueNotesMode.constants.separateValue;
        this.valueNotesList.forEach((el, i) => {
          set(el, isSep ? values[i] : !values[i]);
        });
      }
    });
  }

  getElements() {
    return [...this.valueNotesList];
  }

  _addEvents() {
    this.valueNoteModeUpdateEvent = makeEvent();
  }

  _checkValueNotesMode(limits, values, direction, valueNotesMode, path) {
    if (this.valueNotesList.length < 3) return;
    const { minLimit, valuesCount } = limits;
    const { singleValue, rangeValueMin, rangeValueMax } = values;
    const getSizeProp = direction.value === direction.constants.horizontalValue ? 'offsetWidth' : 'offsetHeight';
    const [elFirst,, elSec] = this.valueNotesList;
    const sizes = (elFirst[getSizeProp] + elSec[getSizeProp]) / 2;
    const calcPos = (el, value) => {
      const percent = (value - minLimit) / valuesCount;
      return percent * path[getSizeProp] + el[getSizeProp] / 2;
    };
    const distance = calcPos(elSec, rangeValueMax) - calcPos(elFirst, rangeValueMin);

    if (distance >= sizes) {
      if (valueNotesMode.value !== valueNotesMode.constants.separateValue) {
        this.valueNoteModeUpdateEvent.trigger(valueNotesMode.constants.separateValue);
      }
    } else if (valueNotesMode.value !== valueNotesMode.constants.commonValue) {
      this.valueNoteModeUpdateEvent.trigger(valueNotesMode.constants.commonValue);
    }
  }
}

export default ValueNotesView;
