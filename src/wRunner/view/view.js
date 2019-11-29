import { ViewDefaults } from './view.defaults';
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
    this.handle = document.createElement('div');
    this.handleMin = document.createElement('div');
    this.handleMax = document.createElement('div');
    this.valueNote = document.createElement('div');
    this.valueNoteMin = document.createElement('div');
    this.valueNoteMax = document.createElement('div');
    this.valueNoteCommon = document.createElement('div');
    this.divisionsBlock = document.createElement('div');
    this.divisionsList = [];

    // Init
    this.init();
    this.addEvents();
    this.addListenners();
  }

  init() {
    window.requestAnimationFrame(() => {
      this.mainNode.classList.add('wrunner');
      this.outer.classList.add('wrunner__outer');
      this.path.classList.add('wrunner__path');
      this.pathPassed.classList.add('wrunner__path-passed');
      this.handle.classList.add('wrunner__handle');
      this.handleMin.classList.add('wrunner__handle-min');
      this.handleMax.classList.add('wrunner__handle-max');
      this.valueNote.classList.add('wrunner__value-note');
      this.valueNoteMin.classList.add('wrunner__value-note-min');
      this.valueNoteMax.classList.add('wrunner__value-note-max');
      this.valueNoteCommon.classList.add('wrunner__value-note-common');
      this.divisionsBlock.classList.add('wrunner__divisions');
    });

    this.path.appendChild(this.pathPassed);
    this.outer.appendChild(this.path);
    this.outer.appendChild(this.divisionsBlock);
    this.mainNode.appendChild(this.outer);
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
      let scale;
      let min;
      let pos;
      const direction = this.direction.value;
      const { directionConstants } = this;

      if (direction === directionConstants.horizontalValue) {
        scale = this.path.offsetWidth;
        min = this.path.getBoundingClientRect().left;
        pos = event.clientX;
      }
      if (direction === directionConstants.verticalValue) {
        scale = this.path.offsetHeight;
        min = this.path.getBoundingClientRect().top;
        pos = event.clientY;
      }

      const max = min + scale;

      // If the dragging is out of slider's range, the function stops.
      if (pos < min - 10 || pos > max + 10) return;

      if (direction === directionConstants.horizontalValue) {
        this.UIMouseActionEvent.trigger(((pos - min) / scale) * 100);
      }
      if (direction === directionConstants.verticalValue) {
        this.UIMouseActionEvent.trigger(100 - ((pos - min) / scale) * 100);
      }
    }
    const handler = handlerFunction.bind(this);

    function mouseUpFunction(eventUp) {
      const { target } = eventUp;

      // Removing move bind.
      document.body.removeEventListener('mousemove', handler);

      // If handle was dragged, stop the function.
      if (wasDragged) return;
      if (target === this.handle || target === this.handleMin || target === this.handleMax) return;

      // Else trigger a click.
      handler(eventUp);
    }
    const mouseUp = mouseUpFunction.bind(this);

    // The handler that indicates that the handle has been dragged.
    document.body.addEventListener('mousemove', () => { wasDragged = true; }, { once: true });

    // The handler that called when mouse button released.
    document.body.addEventListener('mousemove', handler);

    // The handler that called when mouse moved, while button pressed.
    document.body.addEventListener('mouseup', mouseUp, { once: true });
  }

  updateDOM(type) {
    if (type.value === type.typeConstants.singleValue) {
      window.requestAnimationFrame(() => {
        this.handleMin.remove();
        this.handleMax.remove();
        this.valueNoteMin.remove();
        this.valueNoteMax.remove();
        this.valueNoteCommon.remove();

        this.path.appendChild(this.handle);
        this.outer.appendChild(this.valueNote);
      });
    }
    if (type.value === type.typeConstants.rangeValue) {
      window.requestAnimationFrame(() => {
        this.handle.remove();
        this.valueNote.remove();

        this.path.appendChild(this.handleMin);
        this.path.appendChild(this.handleMax);
        this.outer.appendChild(this.valueNoteMin);
        this.outer.appendChild(this.valueNoteMax);
        this.outer.appendChild(this.valueNoteCommon);
      });
    }
  }

  append() {
    window.requestAnimationFrame(() => {
      this.roots.appendChild(this.mainNode);
    });
    return this.roots;
  }

  applyStyles() {
    const styles = [this.theme, this.direction];
    const els = [
      this.mainNode, this.outer,
      this.path, this.pathPassed,
      this.divisionsBlock, this.handle,
      this.handleMin, this.handleMax,
      this.valueNote, this.valueNoteMin,
      this.valueNoteMax, this.valueNoteCommon,
    ].concat(this.divisionsList);

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

  drawValue(value, limits, type) {
    let pathScale;
    const { selected } = value;
    const direction = this.direction.value;
    const { directionConstants } = this;

    function drawSingleValue() {
      let valueNoteScale;
      const clearList = [
        this.pathPassed, this.handle, this.valueNote,
      ];

      this.valueNote.innerHTML = value.value;


      if (direction === directionConstants.horizontalValue) {
        clearList.forEach((elem) => {
          const el = elem;
          if (el.style.top !== '') el.style.top = '';
          if (el.style.left !== '') el.style.left = '';
          if (el.style.height !== '') el.style.height = '';
        });

        // Passed path
        this.pathPassed.style.width = `${selected}%`;

        // Handle
        this.handle.style.left = `${selected}%`;

        pathScale = this.path.offsetWidth; valueNoteScale = this.valueNote.offsetWidth;

        this.valueNote.style.left = `${((pathScale * (selected / 100) - (valueNoteScale / 2)) / pathScale) * 100}%`;
      }

      if (direction === directionConstants.verticalValue) {
        clearList.forEach((elem) => {
          const el = elem;
          if (el.style.top !== '') el.style.top = '';
          if (el.style.left !== '') el.style.left = '';
          if (el.style.width !== '') el.style.width = '';
        });

        // Passed path
        this.pathPassed.style.height = `${selected}%`;

        // Handle
        this.handle.style.top = `${100 - selected}%`;

        pathScale = this.path.offsetHeight; valueNoteScale = this.valueNote.offsetHeight;

        this.valueNote.style.top = `${100 - ((pathScale * (selected / 100) + valueNoteScale / 2) / pathScale) * 100}%`;
      }
    }

    function drawRangeValue() {
      let valueNoteMinScale;
      let valueNoteMaxScale;
      let valueNoteCommonScale;
      let maxPos;
      let minPos;
      let commonPos;

      const start = ((value.minValue - limits.minLimit) / limits.valuesCount) * 100;
      const clearList = [
        this.pathPassed,
        this.handleMin, this.handleMax,
        this.valueNoteMin, this.valueNoteMax, this.valueNoteCommon,
      ];

      this.valueNoteMin.innerHTML = value.minValue;
      this.valueNoteMax.innerHTML = value.maxValue;

      function checkValueNoteRangeMode() {
        if (maxPos - minPos >= (valueNoteMinScale + valueNoteMaxScale) / 2) {
          if (this.valueNoteRangeMode !== this.valueNoteRangeModeConstants.separateValue) {
            this.valueNoteRangeMode = this.valueNoteRangeModeConstants.separateValue;
            this.valueNoteRangeModeUpdateEvent.trigger(this.valueNoteRangeMode);
          }
        } else if (this.valueNoteRangeMode !== this.valueNoteRangeModeConstants.commonValue) {
          this.valueNoteRangeMode = this.valueNoteRangeModeConstants.commonValue;
          this.valueNoteRangeModeUpdateEvent.trigger(this.valueNoteRangeMode);
        }
      }

      if (direction === directionConstants.horizontalValue) {
        clearList.forEach((elem) => {
          const el = elem;
          if (el.style.top !== '') el.style.top = '';
          if (el.style.height !== '') el.style.height = '';
        });

        this.valueNoteCommon.innerHTML = `${value.minValue} - ${value.maxValue}`;

        // Passed path
        this.pathPassed.style.width = `${selected}%`;
        this.pathPassed.style.left = `${start}%`;

        // Handle
        this.handleMin.style.left = `${start}%`;
        this.handleMax.style.left = `${start + selected}%`;

        pathScale = this.path.offsetWidth;
        valueNoteMinScale = this.valueNoteMin.offsetWidth;
        valueNoteMaxScale = this.valueNoteMax.offsetWidth;
        valueNoteCommonScale = this.valueNoteCommon.offsetWidth;

        minPos = (pathScale * (start / 100) - valueNoteMinScale / 2);
        maxPos = (pathScale * ((start + selected) / 100) - valueNoteMaxScale / 2);
        commonPos = (pathScale * ((start + selected / 2) / 100) - valueNoteCommonScale / 2);

        this.valueNoteMin.style.left = `${(minPos / pathScale) * 100}%`;
        this.valueNoteMax.style.left = `${(maxPos / pathScale) * 100}%`;
        this.valueNoteCommon.style.left = `${(commonPos / pathScale) * 100}%`;

        // valueNoteRangeMode
        checkValueNoteRangeMode.call(this, minPos, maxPos, valueNoteMinScale, valueNoteMaxScale);
      }

      if (direction === directionConstants.verticalValue) {
        clearList.forEach((elem) => {
          const el = elem;
          if (el.style.left !== '') el.style.left = '';
          if (el.style.width !== '') el.style.width = '';
        });

        this.valueNoteCommon.innerHTML = `${value.maxValue}<br>|<br>${value.minValue}`;

        // Passed path
        this.pathPassed.style.height = `${selected}%`;
        this.pathPassed.style.top = `${100 - selected - start}%`;

        // Handle
        this.handleMax.style.top = `${100 - start - selected}%`;
        this.handleMin.style.top = `${100 - start}%`;

        pathScale = this.path.offsetHeight;
        valueNoteMinScale = this.valueNoteMin.offsetHeight;
        valueNoteMaxScale = this.valueNoteMax.offsetHeight;
        valueNoteCommonScale = this.valueNoteCommon.offsetHeight;

        minPos = (pathScale * (start / 100) + valueNoteMinScale / 2);
        maxPos = (pathScale * ((start + selected) / 100) + valueNoteMaxScale / 2);
        commonPos = (pathScale * ((start + selected / 2) / 100) + valueNoteCommonScale / 2);

        this.valueNoteMin.style.top = `${100 - (minPos / pathScale) * 100}%`;
        this.valueNoteMax.style.top = `${100 - (maxPos / pathScale) * 100}%`;
        this.valueNoteCommon.style.top = `${100 - (commonPos / pathScale) * 100}%`;

        // valueNoteRangeMode
        checkValueNoteRangeMode.call(this);
      }
    }

    if (type.value === type.typeConstants.singleValue) {
      window.requestAnimationFrame(drawSingleValue.bind(this));
    }

    if (type.value === type.typeConstants.rangeValue) {
      window.requestAnimationFrame(drawRangeValue.bind(this));
    }
  }

  applyValueNoteDisplay() {
    const notes = [this.valueNote, this.valueNoteMin, this.valueNoteMax, this.valueNoteCommon];

    function handle(els, action) {
      els.forEach((el) => {
        const mark = el.classList[0];

        el.classList[action === 'show' ? 'add' : 'remove'](`${mark}_display_visible`);
        el.classList[action === 'show' ? 'remove' : 'add'](`${mark}_display_hidden`);
      });
    }

    function showSingleDisplay() {
      const notesSingle = [this.valueNote];
      handle(notesSingle, 'show');
    }

    function showRangeDisplay() {
      const notesSeparate = [this.valueNoteMin, this.valueNoteMax];
      const notesCommon = [this.valueNoteCommon];

      // Separate
      if (this.valueNoteRangeMode === this.valueNoteRangeModeConstants.separateValue) {
        handle(notesSeparate, 'show');
        handle(notesCommon, 'hide');
      }
      // Common
      if (this.valueNoteRangeMode === this.valueNoteRangeModeConstants.commonValue) {
        handle(notesCommon, 'show');
        handle(notesSeparate, 'hide');
      }
    }

    if (this.valueNoteDisplay === false) {
      window.requestAnimationFrame(handle.bind(this, notes, 'hide'));
    }

    if (this.valueNoteDisplay === true) {
      window.requestAnimationFrame(showSingleDisplay.bind(this));
      window.requestAnimationFrame(showRangeDisplay.bind(this));
    }
  }

  generateDivisions() {
    this.divisionsBlock.innerHTML = '';
    this.divisionsList.length = 0;

    for (let i = this.divisionsCount; i > 0; i -= 1) {
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
