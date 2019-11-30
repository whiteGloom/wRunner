import ViewDefaults from './view.defaults';
import makeEventModule from '@event';
import helperModule from '@helper';

const makeEvent = makeEventModule;
const helper = helperModule;

class View {
  constructor() {
    // Defaults
    const defaults = new ViewDefaults();
    this.roots = defaults.roots;
    this.divisionsCount = defaults.divisionsCount;
    this.valueNoteDisplay = defaults.valueNoteDisplay;
    this.valueNoteRangeMode = defaults.valueNoteRangeMode;
    this.valueNoteRangeModeConstants = defaults.valueNoteRangeModeConstants;
    this.theme = defaults.theme;
    this.direction = defaults.direction;
    this.directionConstants = defaults.directionConstants;

    // Stable elements
    this.mainNode = document.createElement('div');
    this.outer = document.createElement('div');
    this.path = document.createElement('div');
    this.pathPassed = document.createElement('div');
    this.divisionsBlock = document.createElement('div');
    this.divisionsList = [];
    this.valueNotes = [];
    this.handlers = [];

    // Init
    this.init();
    this.addEvents();
    this.addListenners();
  }

  init() {
    this.mainNode.classList.add('wrunner');
    this.outer.classList.add('wrunner__outer');
    this.path.classList.add('wrunner__path');
    this.pathPassed.classList.add('wrunner__path-passed');
    this.divisionsBlock.classList.add('wrunner__divisions');

    this.path.appendChild(this.pathPassed);
    this.outer.appendChild(this.path);
    this.outer.appendChild(this.divisionsBlock);

    window.requestAnimationFrame(() => {
      this.mainNode.appendChild(this.outer);
    });
  }

  addEvents() {
    this.UIMouseActionEvent = makeEvent();
    this.rootsUpdateEvent = makeEvent();
    this.themeUpdateEvent = makeEvent();
    this.directionUpdateEvent = makeEvent();
    this.valueNoteDisplayUpdateEvent = makeEvent();
    this.valueNoteRangeModeUpdateEvent = makeEvent();
    this.divisionsCountUpdateEvent = makeEvent();
    this.windowResizeEvent = makeEvent();
  }

  addListenners() {
    this.path.addEventListener('mousedown', this.mouseDownActionHandler.bind(this));
    window.addEventListener('resize', this.windowResizeEvent.trigger);
  }

  mouseDownActionHandler(eventDown) {
    if (eventDown.button !== 0) return;
    let wasDragged = false;

    // Handlers
    function handlerFunction(event) {
      const isHorizontal = this.direction.value === this.directionConstants.horizontalValue;
      const scale = this.path[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
      const min = this.path.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
      const pos = event[isHorizontal ? 'clientX' : 'clientY'];

      // If the dragging is out of slider's range, the function stops.
      if (pos < min - 10 || pos > min + scale + 10) return;

      if (isHorizontal) {
        this.UIMouseActionEvent.trigger(((pos - min) / scale) * 100);
      } else {
        this.UIMouseActionEvent.trigger(100 - ((pos - min) / scale) * 100);
      }
    }
    const handler = handlerFunction.bind(this);

    function mouseUpFunction(eventUp) {
      const { target } = eventUp;
      document.body.removeEventListener('mousemove', handler);

      if (wasDragged) return;
      if (target === this.handle || target === this.handleMin || target === this.handleMax) return;

      handler(eventUp);
    }
    const mouseUp = mouseUpFunction.bind(this);

    document.body.addEventListener('mousemove', () => { wasDragged = true; }, { once: true });
    document.body.addEventListener('mousemove', handler);
    document.body.addEventListener('mouseup', mouseUp, { once: true });
  }

  updateDOM(type) {
    function makeEl(classes) {
      const el = document.createElement('div');
      classes.forEach((nodeClass) => {
        el.classList.add(nodeClass);
      });
      return el;
    }

    this.handlers.concat(this.valueNotes).forEach((el) => {
      el.remove();
    });
    this.handlers.length = 0;
    this.valueNotes.length = 0;

    if (type.value === type.constants.singleValue) {
      this.handlers.push(makeEl(['wrunner__handle']));
      this.valueNotes.push(makeEl(['wrunner__value-note']));
    }
    if (type.value === type.constants.rangeValue) {
      this.handlers.push(makeEl(['wrunner__handle', 'wrunner__handle_type_min']));
      this.handlers.push(makeEl(['wrunner__handle', 'wrunner__handle_type_max']));
      this.valueNotes.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_min']));
      this.valueNotes.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_common']));
      this.valueNotes.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_max']));
    }

    window.requestAnimationFrame(() => {
      this.handlers.forEach((el) => {
        this.path.appendChild(el);
      });
      this.valueNotes.forEach((el) => {
        this.outer.appendChild(el);
      });
    });
  }

  append() {
    this.roots.appendChild(this.mainNode);
    return this.roots;
  }

  applyStyles() {
    const styles = [this.theme, this.direction];
    const els = [
      this.mainNode, this.outer,
      this.path, this.pathPassed,
      this.divisionsBlock,
    ].concat(this.divisionsList, this.handlers, this.valueNotes);

    window.requestAnimationFrame(() => {
      els.forEach((el) => {
        Object.keys(styles).forEach((style) => {
          const name = el.classList[0];
          const { oldValue, value } = styles[style];

          if (oldValue) el.classList.remove(`${name}_${styles[style].className}_${oldValue}`);
          el.classList.add(`${name}_${styles[style].className}_${value}`);
        });
      });
    });
  }

  drawValue(values, limits, direction, type) {
    this.setPathPosition(limits, values, direction, type);
    this.setHandlersPosition(limits, values, direction);
    this.setValueNotesPosition(limits, values, direction);
  }

  setPathPosition({ minLimit, maxLimit, valuesCount }, values, direction, type) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const isSingle = type.value === type.constants.singleValue;
    const posProp = isHorizontal ? 'left' : 'top';
    const sizeProp = isHorizontal ? 'width' : 'height';
    window.requestAnimationFrame(() => {
      this.pathPassed.style.cssText = '';

      let position;
      if (isSingle) {
        position = isHorizontal
          ? 0 : 100 - ((values.value - minLimit) / valuesCount) * 100;
      }
      if (!isSingle) {
        position = isHorizontal
          ? ((values.minValue - minLimit) / valuesCount) * 100
          : ((maxLimit - values.maxValue) / valuesCount) * 100;
      }
      const size = isSingle
        ? ((values.value - minLimit) / valuesCount) * 100
        : ((values.maxValue - values.minValue) / valuesCount) * 100;

      this.pathPassed.style[sizeProp] = `${size}%`;
      this.pathPassed.style[posProp] = `${position}%`;
    });
  }

  setHandlersPosition({ minLimit, valuesCount }, values, direction) {
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
      if (this.handlers.length === 1) {
        setPosition(this.handlers[0], values.value);
      }
      if (this.handlers.length === 2) {
        setPosition(this.handlers[0], values.minValue);
        setPosition(this.handlers[1], values.maxValue);
      }
    });
  }

  setValueNotesPosition({ minLimit, valuesCount }, values, direction) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const getSizeProp = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const posProp = isHorizontal ? 'left' : 'top';

    function draw(element, value, title = '') {
      const pathScale = this.path[getSizeProp];
      const el = element;
      el.style.cssText = '';
      if (typeof title === 'string' || typeof title === 'number') {
        el.innerHTML = title;
      } else {
        el.innerHTML = `${title[0]}${isHorizontal ? ' - ' : '<br>|<br>'}${title[1]}`;
      }

      const percent = (value - minLimit) / valuesCount;
      const position = isHorizontal
        ? ((percent * pathScale - el[getSizeProp] / 2) / pathScale) * 100
        : 100 - ((percent * pathScale + el[getSizeProp] / 2) / pathScale) * 100;

      el.style[posProp] = `${position}%`;
    }

    window.requestAnimationFrame(() => {
      if (this.valueNotes.length === 1) {
        draw.call(this, this.valueNotes[0], values.value, values.value);
      }
      if (this.valueNotes.length === 3) {
        draw.call(this, this.valueNotes[0], values.minValue, values.minValue);
        draw.call(this, this.valueNotes[1], (values.minValue + values.maxValue) / 2,
          [values.minValue, values.maxValue]);
        draw.call(this, this.valueNotes[2], values.maxValue, values.maxValue);
        this.checkValueNotesMode({ minLimit, valuesCount }, values, direction);
      }
    });
  }

  checkValueNotesMode({ minLimit, valuesCount }, { minValue, maxValue }, direction) {
    if (this.valueNotes.length < 3) return;
    const getSizeProp = direction.value === direction.constants.horizontalValue ? 'offsetWidth' : 'offsetHeight';
    const [elFirst,, elSec] = this.valueNotes;
    function calcPos(el, value) {
      return ((value - minLimit) / valuesCount) * this.path[getSizeProp] + el[getSizeProp] / 2;
    }
    const distance = calcPos.call(this, elSec, maxValue) - calcPos.call(this, elFirst, minValue);
    const sizes = (elFirst[getSizeProp] + elSec[getSizeProp]) / 2;

    if (distance >= sizes) {
      if (this.valueNoteRangeMode !== this.valueNoteRangeModeConstants.separateValue) {
        this.valueNoteRangeMode = this.valueNoteRangeModeConstants.separateValue;
        this.valueNoteRangeModeUpdateEvent.trigger(this.valueNoteRangeMode);
      }
    } else if (this.valueNoteRangeMode !== this.valueNoteRangeModeConstants.commonValue) {
      this.valueNoteRangeMode = this.valueNoteRangeModeConstants.commonValue;
      this.valueNoteRangeModeUpdateEvent.trigger(this.valueNoteRangeMode);
    }
  }

  applyValueNotesDisplay(display) {
    function set(el, value) {
      const mark = el.classList[0];
      window.requestAnimationFrame(() => {
        el.classList[value ? 'add' : 'remove'](`${mark}_display_visible`);
        el.classList[value ? 'remove' : 'add'](`${mark}_display_hidden`);
      });
    }

    if (this.valueNotes.length === 1) {
      set(this.valueNotes[0], display);
    }
    if (this.valueNotes.length === 3) {
      if (!display) {
        this.valueNotes.forEach((el) => {
          set(el, false);
        });
      } else {
        if (this.valueNoteRangeMode === this.valueNoteRangeModeConstants.separateValue) {
          set(this.valueNotes[0], true);
          set(this.valueNotes[1], false);
          set(this.valueNotes[2], true);
        }
        if (this.valueNoteRangeMode === this.valueNoteRangeModeConstants.commonValue) {
          set(this.valueNotes[0], false);
          set(this.valueNotes[1], true);
          set(this.valueNotes[2], false);
        }
      }
    }
  }

  generateDivisions() {
    this.divisionsBlock.innerHTML = '';
    this.divisionsList.length = 0;

    while (this.divisionsList.length < this.divisionsCount) {
      const instance = document.createElement('div');
      instance.classList.add('wrunner__division');

      this.divisionsList.push(instance);
      this.divisionsBlock.appendChild(instance);
    }
  }

  setRoots(newRoots) {
    if (!helper.isDOMEl(newRoots)) return;
    this.roots = newRoots;

    this.rootsUpdateEvent.trigger(this.roots);
  }

  setDivisionsCount(newCount) {
    if (!helper.isNumber(newCount) || newCount < 0) return;

    let count = Math.round(+newCount);

    if (count === 1) {
      count += 1;
    }
    this.divisionsCount = +count;

    this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
  }

  setTheme(newTheme) {
    if (typeof newTheme !== 'string') return;

    this.theme.oldValue = this.theme.value;
    this.theme.value = newTheme;

    this.themeUpdateEvent.trigger(this.theme.value);
  }

  setDirection(newDirection) {
    if (typeof newDirection !== 'string') return;

    Object.keys(this.directionConstants).forEach((constant) => {
      if (newDirection === this.directionConstants[constant]) {
        this.direction.oldValue = this.direction.value;
        this.direction.value = newDirection;

        this.directionUpdateEvent.trigger({
          value: this.direction.value,
          constants: { ...this.directionConstants },
        });
        return {
          value: this.direction.value,
          constants: { ...this.directionConstants },
        };
      }
      return false;
    });
  }

  setValueNoteDisplay(newValue) {
    if (typeof newValue !== 'boolean') return;
    this.valueNoteDisplay = newValue;

    this.valueNoteDisplayUpdateEvent.trigger(this.valueNoteDisplay);
  }

  getRoots() {
    return this.roots;
  }

  getTheme() {
    return this.theme.value;
  }

  getDirection() {
    return {
      value: this.direction.value,
      constants: { ...this.directionConstants },
    };
  }

  getValueNoteDisplay() {
    return this.valueNoteDisplay;
  }

  getDivisionsCount() {
    return this.divisionsCount;
  }
}

export default View;
