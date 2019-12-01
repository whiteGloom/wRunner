import ModelDefaults from './model.defaults';
import makeEventModule from '@event';
import helperModule from '@helper';

const helper = helperModule;
const makeEvent = makeEventModule;

class Model {
  constructor() {
    const defaults = new ModelDefaults();
    this.limits = defaults.limits;
    this.values = defaults.values;
    this.type = defaults.type;
    this.step = defaults.step;

    this.addEvents();
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
      this.typeUpdateEvent.trigger({ ...this.type });
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

  getType() {
    return { ...this.type };
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

  addEvents() {
    this.valueUpdateEvent = makeEvent();
    this.limitsUpdateEvent = makeEvent();
    this.stepUpdateEvent = makeEvent();
    this.percentageUpdateEvent = makeEvent();
    this.typeUpdateEvent = makeEvent();
  }
}

export default Model;
