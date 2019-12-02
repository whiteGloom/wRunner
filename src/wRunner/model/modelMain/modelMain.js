import ModelDefaults from '../modelDefaults/modelDefaults';
import makeEventModule from '@event';
import helperModule from '@helper';

const helper = helperModule;
const makeEvent = makeEventModule;

class ModelMain {
  constructor() {
    const defaults = new ModelDefaults();
    this.limits = defaults.limits;
    this.values = defaults.values;
    this.type = defaults.type;
    this.step = defaults.step;
    this.roots = defaults.roots;
    this.scaleDivisionsCount = defaults.divisionsCount;
    this.valueNotesDisplay = defaults.valueNotesDisplay;
    this.valueNotesMode = defaults.valueNotesMode;
    this.theme = defaults.theme;
    this.direction = defaults.direction;

    this.addEvents();
  }

  addEvents() {
    this.valueUpdateEvent = makeEvent();
    this.limitsUpdateEvent = makeEvent();
    this.stepUpdateEvent = makeEvent();
    this.percentageUpdateEvent = makeEvent();
    this.typeUpdateEvent = makeEvent();
    this.rootsUpdateEvent = makeEvent();
    this.themeUpdateEvent = makeEvent();
    this.directionUpdateEvent = makeEvent();
    this.valueNotesDisplayUpdateEvent = makeEvent();
    this.scaleDivisionsCountUpdateEvent = makeEvent();
  }

  recalculateValue() {
    const isSingle = this.type.value === this.type.constants.singleValue;
    if (isSingle) this.setSingleValue(null);
    if (!isSingle) this.setRangeValues(null);
  }

  cutToLimits(value) {
    if (value < this.limits.minLimit) return this.limits.minLimit;
    if (value > this.limits.maxLimit) return this.limits.maxLimit;
    return value;
  }

  calcStepped(value) {
    return Math.round((value) / this.step) * this.step;
  }

  setType(newType) {
    if (Object.values(this.type.constants).includes(newType)) {
      this.type.value = newType;
      this.typeUpdateEvent.trigger({
        value: this.type.value,
        constants: { ...this.type.constants },
      });
    }
  }

  setLimits(newLimits = {}) {
    let min = helper.isNumber(newLimits.minLimit) ? +newLimits.minLimit : this.limits.minLimit;
    let max = helper.isNumber(newLimits.maxLimit) ? +newLimits.maxLimit : this.limits.maxLimit;

    if (min === max) max += 1;
    if (min > max) [min, max] = [max, min];

    this.limits.minLimit = min;
    this.limits.maxLimit = max;
    this.limits.valuesCount = this.limits.maxLimit - this.limits.minLimit;
    this.limitsUpdateEvent.trigger({ ...this.limits });
  }

  setStep(newStep) {
    if (!helper.isNumber(newStep) || +newStep < 1) return;
    this.step = +newStep;

    this.stepUpdateEvent.trigger(this.step);
  }

  setSingleValue(newValue) {
    const value = helper.isNumber(newValue) ? +newValue : this.values.singleValue;

    this.values.singleValue = this.cutToLimits(this.calcStepped(value));
    this.valueUpdateEvent.trigger({ ...this.values });
  }

  setRangeValues(newValues) {
    const values = helper.isObject(newValues) ? newValues : {};
    let min = helper.isNumber(values.minValue)
      ? +values.minValue
      : this.values.rangeValueMin;
    let max = helper.isNumber(values.maxValue)
      ? +values.maxValue
      : this.values.rangeValueMax;
    if (min === max) max += this.step;
    if (min > max) [min, max] = [max, min];

    this.values.rangeValueMin = this.cutToLimits(this.calcStepped(min));
    this.values.rangeValueMax = this.cutToLimits(this.calcStepped(max));
    this.valueUpdateEvent.trigger({ ...this.values });
  }

  setNearestValue(newValue, viaPercents) {
    if (!helper.isNumber(newValue)) return;

    const isSingle = this.type.value === this.type.constants.singleValue;
    const value = viaPercents === false
      ? Math.round(+newValue)
      : Math.round(this.limits.minLimit + (+newValue / 100) * this.limits.valuesCount);

    if (isSingle) this.setSingleValue(value);

    if (!isSingle) {
      if (value < (this.values.rangeValueMin + this.values.rangeValueMax) / 2) {
        this.setRangeValues({ minValue: value });
      } else {
        this.setRangeValues({ maxValue: value });
      }
    }
  }

  setRoots(newRoots) {
    if (!helper.isDOMEl(newRoots)) return;
    this.roots = newRoots;

    this.rootsUpdateEvent.trigger(this.roots);
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

  setValueNotesMode(newMode) {
    if (Object.values(this.valueNotesMode.constants).includes(newMode)) {
      this.valueNotesMode.value = newMode;
    }
  }

  setScaleDivisionsCount(newCount) {
    if (!helper.isNumber(newCount) || newCount < 0) return;

    this.scaleDivisionsCount = Math.round(+newCount) !== 1
      ? Math.round(+newCount)
      : Math.round(+newCount) + 1;
    this.scaleDivisionsCountUpdateEvent.trigger(this.scaleDivisionsCount);
  }

  getType() {
    return {
      value: this.type.value,
      constants: { ...this.type.constants },
    };
  }

  getLimits() {
    return { ...this.limits };
  }

  getValues() {
    return { ...this.values };
  }

  getStep() {
    return this.step;
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

  getValueNotesMode() {
    return {
      value: this.valueNotesMode.value,
      constants: { ...this.valueNotesMode.constants },
    };
  }

  getScaleDivisionsCount() {
    return this.scaleDivisionsCount;
  }
}

export default ModelMain;
