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
    this.valueNotesDisplay = defaults.valueNotesDisplay;
    this.valueNotesMode = defaults.valueNotesMode;
    this.valueNotesModeConstants = defaults.valueNotesModeConstants;
    this.theme = defaults.theme;
    this.direction = defaults.direction;

    // Stable elements
    this.mainNode = document.createElement('div');
    this.outer = document.createElement('div');
    this.path = document.createElement('div');
    this.pathPassed = document.createElement('div');
    this.divisionsBlock = document.createElement('div');
    this.handlersList = [];
    this.valueNotesList = [];
    this.divisionsList = [];

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
    this.valueNotesDisplayUpdateEvent = makeEvent();
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
      const isHorizontal = this.direction.value === this.direction.constants.horizontalValue;
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

    this.handlersList.concat(this.valueNotesList).forEach((el) => {
      el.remove();
    });
    this.handlersList.length = 0;
    this.valueNotesList.length = 0;

    if (type.value === type.constants.singleValue) {
      this.handlersList.push(makeEl(['wrunner__handle']));
      this.valueNotesList.push(makeEl(['wrunner__value-note']));
    }
    if (type.value === type.constants.rangeValue) {
      this.handlersList.push(makeEl(['wrunner__handle', 'wrunner__handle_type_min']));
      this.handlersList.push(makeEl(['wrunner__handle', 'wrunner__handle_type_max']));
      this.valueNotesList.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_min']));
      this.valueNotesList.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_common']));
      this.valueNotesList.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_max']));
    }

    window.requestAnimationFrame(() => {
      this.handlersList.forEach((el) => {
        this.path.appendChild(el);
      });
      this.valueNotesList.forEach((el) => {
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
    ].concat(this.divisionsList, this.handlersList, this.valueNotesList);

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

  setPathPosition(
    { minLimit, maxLimit, valuesCount },
    { singleValue, rangeValueMin, rangeValueMax },
    direction,
    type,
  ) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const isSingle = type.value === type.constants.singleValue;
    const posProp = isHorizontal ? 'left' : 'top';
    const sizeProp = isHorizontal ? 'width' : 'height';
    window.requestAnimationFrame(() => {
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
    });
  }

  setHandlersPosition(
    { minLimit, valuesCount },
    { singleValue, rangeValueMin, rangeValueMax },
    direction,
  ) {
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

  setValueNotesPosition(
    { minLimit, valuesCount },
    { singleValue, rangeValueMin, rangeValueMax },
    direction,
  ) {
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
      if (this.valueNotesList.length === 1) {
        draw.call(this, this.valueNotesList[0], singleValue, singleValue);
      }
      if (this.valueNotesList.length === 3) {
        draw.call(this, this.valueNotesList[0], rangeValueMin, rangeValueMin);
        draw.call(this, this.valueNotesList[1], (rangeValueMin + rangeValueMax) / 2,
          [rangeValueMin, rangeValueMax]);
        draw.call(this, this.valueNotesList[2], rangeValueMax, rangeValueMax);
        this.checkValueNotesMode(
          { minLimit, valuesCount },
          { rangeValueMin, rangeValueMax },
          direction,
        );
      }
    });
  }

  checkValueNotesMode({ minLimit, valuesCount }, { rangeValueMin, rangeValueMax }, direction) {
    if (this.valueNotesList.length < 3) return;
    const getSizeProp = direction.value === direction.constants.horizontalValue ? 'offsetWidth' : 'offsetHeight';
    const [elFirst,, elSec] = this.valueNotesList;
    function calcPos(el, value) {
      return ((value - minLimit) / valuesCount) * this.path[getSizeProp] + el[getSizeProp] / 2;
    }
    const calc = calcPos.bind(this);
    const distance = calc(elSec, rangeValueMax) - calc(elFirst, rangeValueMin);
    const sizes = (elFirst[getSizeProp] + elSec[getSizeProp]) / 2;

    if (distance >= sizes) {
      if (this.valueNotesMode !== this.valueNotesModeConstants.separateValue) {
        this.valueNotesMode = this.valueNotesModeConstants.separateValue;
        this.valueNoteRangeModeUpdateEvent.trigger();
      }
    } else if (this.valueNotesMode !== this.valueNotesModeConstants.commonValue) {
      this.valueNotesMode = this.valueNotesModeConstants.commonValue;
      this.valueNoteRangeModeUpdateEvent.trigger();
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

    if (this.valueNotesList.length === 1) {
      set(this.valueNotesList[0], display);
    }
    if (this.valueNotesList.length === 3) {
      if (!display) {
        this.valueNotesList.forEach((el) => {
          set(el, false);
        });
      } else {
        if (this.valueNotesMode === this.valueNotesModeConstants.separateValue) {
          set(this.valueNotesList[0], true);
          set(this.valueNotesList[1], false);
          set(this.valueNotesList[2], true);
        }
        if (this.valueNotesMode === this.valueNotesModeConstants.commonValue) {
          set(this.valueNotesList[0], false);
          set(this.valueNotesList[1], true);
          set(this.valueNotesList[2], false);
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

    this.divisionsCount = Math.round(+newCount) !== 1
      ? Math.round(+newCount)
      : Math.round(+newCount) + 1;
    this.divisionsCountUpdateEvent.trigger(this.divisionsCount);
  }

  setTheme(newTheme) {
    if (typeof newTheme !== 'string') return;

    this.theme.oldValue = this.theme.value;
    this.theme.value = newTheme;

    this.themeUpdateEvent.trigger(this.theme.value);
  }

  setDirection(newDirection) {
    if (Object.values(this.direction.constants).includes(newDirection)) {
      this.direction.oldValue = this.direction.value;
      this.direction.value = newDirection;
      this.directionUpdateEvent.trigger({
        value: this.direction.value,
        constants: { ...this.direction.constants },
      });
    }
  }

  setValueNotesDisplay(newValue) {
    if (typeof newValue !== 'boolean') return;
    this.valueNotesDisplay = newValue;

    this.valueNotesDisplayUpdateEvent.trigger(this.valueNotesDisplay);
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
      constants: { ...this.direction.constants },
    };
  }

  getValueNotesDisplay() {
    return this.valueNotesDisplay;
  }

  getDivisionsCount() {
    return this.divisionsCount;
  }
}

export default View;
