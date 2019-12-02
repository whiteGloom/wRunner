import makeEventModule from '@event';

const makeEvent = makeEventModule;

class View {
  constructor() {
    this.handlersList = [];
    this.valueNotesList = [];
    this.divisionsList = [];

    // Init
    this.init();
    this.addEvents();
    this.addListenners();
  }

  init() {
    this.mainNode = document.createElement('div');
    this.outer = document.createElement('div');
    this.path = document.createElement('div');
    this.pathPassed = document.createElement('div');
    this.divisionsBlock = document.createElement('div');

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
    this.UIActionMouseDown = makeEvent();
    this.UIValueAction = makeEvent();
    this.valueNoteModeUpdateEvent = makeEvent();
    this.windowResizeEvent = makeEvent();
  }

  addListenners() {
    this.path.addEventListener('mousedown', this.UIActionMouseDown.trigger);
    window.addEventListener('resize', this.windowResizeEvent.trigger);
  }

  handlerMouseDownAction(eventDown, direction) {
    if (eventDown.button !== 0) return;
    let wasDragged = false;

    // Handlers
    function handlerFunction(event) {
      const isHorizontal = direction.value === direction.constants.horizontalValue;
      const scale = this.path[isHorizontal ? 'offsetWidth' : 'offsetHeight'];
      const min = this.path.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
      const pos = event[isHorizontal ? 'clientX' : 'clientY'];

      // If the dragging is out of slider's range, the function stops.
      if (pos < min - 10 || pos > min + scale + 10) return;

      const data = ((pos - min) / scale) * 100;
      this.UIValueAction.trigger(isHorizontal ? data : 100 - data);
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
      this.handlersList.push(makeEl(['wrunner__handle', 'wrunner__handle_type_single']));
      this.valueNotesList.push(makeEl(['wrunner__value-note', 'wrunner__value-note_type_single']));
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

  append(roots) {
    roots.appendChild(this.mainNode);
  }

  applyStyles(styles) {
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

  drawValue(values, limits, direction, type, valueNotesMode) {
    this.setPathPosition(limits, values, direction, type);
    this.setHandlersPosition(limits, values, direction);
    this.setValueNotesPosition(limits, values, direction, valueNotesMode);
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
    valueNotesMode,
  ) {
    const isHorizontal = direction.value === direction.constants.horizontalValue;
    const getSizeProp = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    const posProp = isHorizontal ? 'left' : 'top';

    function drawEl(element, value, title) {
      const pathScale = this.path[getSizeProp];
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
    }
    const draw = drawEl.bind(this);

    window.requestAnimationFrame(() => {
      if (this.valueNotesList.length === 1) {
        draw(this.valueNotesList[0], singleValue, singleValue);
      }
      if (this.valueNotesList.length === 3) {
        draw(this.valueNotesList[0], rangeValueMin, rangeValueMin);
        draw(this.valueNotesList[1], (rangeValueMin + rangeValueMax) / 2,
          [rangeValueMin, rangeValueMax]);
        draw(this.valueNotesList[2], rangeValueMax, rangeValueMax);

        this.checkValueNotesMode(
          { minLimit, valuesCount },
          { rangeValueMin, rangeValueMax },
          direction,
          valueNotesMode,
        );
      }
    });
  }

  checkValueNotesMode(
    { minLimit, valuesCount },
    { rangeValueMin, rangeValueMax },
    direction,
    valueNotesMode,
  ) {
    if (this.valueNotesList.length < 3) return;
    const getSizeProp = direction.value === direction.constants.horizontalValue ? 'offsetWidth' : 'offsetHeight';
    const [elFirst,, elSec] = this.valueNotesList;
    const sizes = (elFirst[getSizeProp] + elSec[getSizeProp]) / 2;
    function calcPos(el, value) {
      return ((value - minLimit) / valuesCount) * this.path[getSizeProp] + el[getSizeProp] / 2;
    }
    const calc = calcPos.bind(this);
    const distance = calc(elSec, rangeValueMax) - calc(elFirst, rangeValueMin);

    if (distance >= sizes) {
      if (valueNotesMode.value !== valueNotesMode.constants.separateValue) {
        this.valueNoteModeUpdateEvent.trigger(valueNotesMode.constants.separateValue);
      }
    } else if (valueNotesMode.value !== valueNotesMode.constants.commonValue) {
      this.valueNoteModeUpdateEvent.trigger(valueNotesMode.constants.commonValue);
    }
  }

  applyValueNotesDisplay(display, valueNotesMode) {
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

  generateDivisions(count) {
    this.divisionsBlock.innerHTML = '';
    this.divisionsList.length = 0;

    while (this.divisionsList.length < count) {
      const instance = document.createElement('div');
      instance.classList.add('wrunner__division');

      this.divisionsList.push(instance);
      this.divisionsBlock.appendChild(instance);
    }
  }
}

export default View;
