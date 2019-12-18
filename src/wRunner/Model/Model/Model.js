import { boundMethod } from 'autobind-decorator';
import ConfigDefaults from '../ConfigDefaults/ConfigDefaults';

import makeEvent from '@event';
import Helper from '@Helper';

class Model {
  constructor() {
    const defaults = new ConfigDefaults();
    this.limits = defaults.limits;
    this.values = defaults.values;
    this.type = defaults.type;
    this.step = defaults.step;
    this.roots = defaults.roots;
    this.scaleDivisionsCount = defaults.scaleDivisionsCount;
    this.isValueNotesDisplayed = defaults.isValueNotesDisplayed;
    this.valueNotesMode = defaults.valueNotesMode;
    this.theme = defaults.theme;
    this.direction = defaults.direction;

    this._init();
  }

  recalculateValue() {
    const isSingle = this.type.value === this.type.constants.singleValue;
    if (isSingle) this.setSingleValue(null);
    if (!isSingle) this.setRangeValues(null);
  }

  @boundMethod
  setType(newType) {
    if (Object.values(this.type.constants).includes(newType)) {
      this.type.value = newType;
      this.typeUpdateEvent.trigger({
        value: this.type.value,
        constants: { ...this.type.constants },
      });
    }
  }

  @boundMethod
  setLimits(newLimits) {
    const limits = Helper.isObject(newLimits) ? newLimits : {};
    let min = Helper.isNumber(limits.minLimit) ? Number(limits.minLimit) : this.limits.minLimit;
    let max = Helper.isNumber(limits.maxLimit) ? Number(limits.maxLimit) : this.limits.maxLimit;

    if (min > max) [min, max] = [max, min];
    if (max - min < this.step) max += this.step;

    this.limits.minLimit = Math.round((min / this.step)) * this.step;
    this.limits.maxLimit = Math.round((max / this.step)) * this.step;
    this.limits.valuesCount = this.limits.maxLimit - this.limits.minLimit;
    this.limitsUpdateEvent.trigger({ ...this.limits });
  }

  @boundMethod
  setStep(newStep) {
    if (!Helper.isNumber(newStep) || newStep < 1) return;
    this.step = Number(newStep);

    this.stepUpdateEvent.trigger(this.step);
  }

  @boundMethod
  setSingleValue(newValue) {
    const value = Helper.isNumber(newValue) ? Number(newValue) : this.values.singleValue;

    this.values.singleValue = this._cutValueToLimits(this._recalculateValueByStep(value));
    this.valueUpdateEvent.trigger({ ...this.values });
  }

  @boundMethod
  setRangeValues(newValues) {
    const values = Helper.isObject(newValues) ? newValues : {};
    let min = Helper.isNumber(values.minValue)
      ? Number(values.minValue)
      : this.values.rangeValueMin;
    let max = Helper.isNumber(values.maxValue)
      ? Number(values.maxValue)
      : this.values.rangeValueMax;
    if (min === max) max += this.step;
    if (min > max) [min, max] = [max, min];

    this.values.rangeValueMin = this._cutValueToLimits(this._recalculateValueByStep(min));
    this.values.rangeValueMax = this._cutValueToLimits(this._recalculateValueByStep(max));
    this.valueUpdateEvent.trigger({ ...this.values });
  }

  @boundMethod
  setNearestValue(newValue, viaPercents) {
    if (!Helper.isNumber(newValue)) return;

    const isSingle = this.type.value === this.type.constants.singleValue;
    const value = viaPercents === false
      ? Math.round(Number(newValue))
      : Math.round(this.limits.minLimit + (Number(newValue) / 100) * this.limits.valuesCount);

    if (isSingle) this.setSingleValue(value);

    if (!isSingle) {
      if (value < (this.values.rangeValueMin + this.values.rangeValueMax) / 2) {
        this.setRangeValues({ minValue: value });
      } else {
        this.setRangeValues({ maxValue: value });
      }
    }
  }

  @boundMethod
  setRoots(newRoots) {
    if (!Helper.isDOMEl(newRoots)) return;
    this.roots = newRoots;

    this.rootsUpdateEvent.trigger(this.roots);
  }

  @boundMethod
  setTheme(newTheme) {
    if (typeof newTheme !== 'string') return;

    this.theme.oldValue = this.theme.value;
    this.theme.value = newTheme;

    this.themeUpdateEvent.trigger(this.theme.value);
  }

  @boundMethod
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

  @boundMethod
  setValueNotesDisplay(newValue) {
    if (typeof newValue !== 'boolean') return;
    this.isValueNotesDisplayed = newValue;

    this.valueNotesDisplayUpdateEvent.trigger(this.isValueNotesDisplayed);
  }

  @boundMethod
  setValueNotesMode(newMode) {
    if (Object.values(this.valueNotesMode.constants).includes(newMode)) {
      this.valueNotesMode.value = newMode;
    }
  }

  @boundMethod
  setScaleDivisionsCount(newCount) {
    if (!Helper.isNumber(newCount) || newCount < 0) return;

    this.scaleDivisionsCount = Math.round(Number(newCount)) !== 1
      ? Math.round(Number(newCount))
      : Math.round(Number(newCount)) + 1;
    this.scaleDivisionsCountUpdateEvent.trigger(this.scaleDivisionsCount);
  }

  @boundMethod
  getType() {
    return {
      value: this.type.value,
      constants: { ...this.type.constants },
    };
  }

  @boundMethod
  getLimits() {
    return { ...this.limits };
  }

  @boundMethod
  getValues() {
    return { ...this.values };
  }

  @boundMethod
  getStep() {
    return this.step;
  }

  @boundMethod
  getRoots() {
    return this.roots;
  }

  @boundMethod
  getTheme() {
    return this.theme.value;
  }

  @boundMethod
  getDirection() {
    return {
      value: this.direction.value,
      constants: { ...this.direction.constants },
    };
  }

  @boundMethod
  getValueNotesDisplay() {
    return this.isValueNotesDisplayed;
  }

  @boundMethod
  getValueNotesMode() {
    return {
      value: this.valueNotesMode.value,
      constants: { ...this.valueNotesMode.constants },
    };
  }

  @boundMethod
  getScaleDivisionsCount() {
    return this.scaleDivisionsCount;
  }

  _cutValueToLimits(value) {
    if (value < this.limits.minLimit) return this.limits.minLimit;
    if (value > this.limits.maxLimit) return this.limits.maxLimit;
    return value;
  }

  _recalculateValueByStep(value) {
    return Math.round((value) / this.step) * this.step;
  }

  _addEvents() {
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

  _init() {
    this._addEvents();
  }
}

export default Model;
