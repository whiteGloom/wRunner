import { boundMethod } from 'autobind-decorator';
import ModelDefaults from '../ModelDefaults/ModelDefaults';

import makeEvent from '@event';
import helper from '@helper';

class ModelMain {
  constructor() {
    const defaults = new ModelDefaults();
    this.limits = defaults.limits;
    this.values = defaults.values;
    this.type = defaults.type;
    this.step = defaults.step;
    this.roots = defaults.roots;
    this.scaleDivisionsCount = defaults.scaleDivisionsCount;
    this.valueNotesDisplay = defaults.valueNotesDisplay;
    this.valueNotesMode = defaults.valueNotesMode;
    this.theme = defaults.theme;
    this.direction = defaults.direction;

    this._addEvents();
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
    const limits = helper.isObject(newLimits) ? newLimits : {};
    let min = helper.isNumber(limits.minLimit) ? +limits.minLimit : this.limits.minLimit;
    let max = helper.isNumber(limits.maxLimit) ? +limits.maxLimit : this.limits.maxLimit;

    if (min > max) [min, max] = [max, min];
    if (max - min < this.step) max += this.step;

    this.limits.minLimit = Math.round((min / this.step)) * this.step;
    this.limits.maxLimit = Math.round((max / this.step)) * this.step;
    this.limits.valuesCount = this.limits.maxLimit - this.limits.minLimit;
    this.limitsUpdateEvent.trigger({ ...this.limits });
  }

  @boundMethod
  setStep(newStep) {
    if (!helper.isNumber(newStep) || +newStep < 1) return;
    this.step = +newStep;

    this.stepUpdateEvent.trigger(this.step);
  }

  @boundMethod
  setSingleValue(newValue) {
    const value = helper.isNumber(newValue) ? +newValue : this.values.singleValue;

    this.values.singleValue = this._cutToLimits(this._calcStepped(value));
    this.valueUpdateEvent.trigger({ ...this.values });
  }

  @boundMethod
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

    this.values.rangeValueMin = this._cutToLimits(this._calcStepped(min));
    this.values.rangeValueMax = this._cutToLimits(this._calcStepped(max));
    this.valueUpdateEvent.trigger({ ...this.values });
  }

  @boundMethod
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

  @boundMethod
  setRoots(newRoots) {
    if (!helper.isDOMEl(newRoots)) return;
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
    this.valueNotesDisplay = newValue;

    this.valueNotesDisplayUpdateEvent.trigger(this.valueNotesDisplay);
  }

  @boundMethod
  setValueNotesMode(newMode) {
    if (Object.values(this.valueNotesMode.constants).includes(newMode)) {
      this.valueNotesMode.value = newMode;
    }
  }

  @boundMethod
  setScaleDivisionsCount(newCount) {
    if (!helper.isNumber(newCount) || newCount < 0) return;

    this.scaleDivisionsCount = Math.round(+newCount) !== 1
      ? Math.round(+newCount)
      : Math.round(+newCount) + 1;
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
    return this.valueNotesDisplay;
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

  _cutToLimits(value) {
    if (value < this.limits.minLimit) return this.limits.minLimit;
    if (value > this.limits.maxLimit) return this.limits.maxLimit;
    return value;
  }

  _calcStepped(value) {
    return Math.round((value) / this.step) * this.step;
  }
}

export default ModelMain;
