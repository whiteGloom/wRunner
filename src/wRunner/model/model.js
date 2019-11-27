import { ModelDefaults } from './model.defaults';
import makeEventModule from '@event';
import helperModule from '@helper';


const helper = helperModule;
const makeEvent = makeEventModule;

class Model {
  constructor() {
    // Defaults
    const defaults = new ModelDefaults();
    this.minLimit = defaults.minLimit;
    this.maxLimit = defaults.maxLimit;
    this.valuesCount = defaults.valuesCount;
    this.singleValue = defaults.singleValue;
    this.rangeValueMin = defaults.rangeValueMin;
    this.rangeValueMax = defaults.rangeValueMax;
    this.singleSelected = defaults.singleSelected;
    this.rangeSelected = defaults.rangeSelected;
    this.step = defaults.step;
    this.type = defaults.type;
    this.typeConstants = defaults.typeConstants;

    this.addEvents();
  }

  recalculateValue() {
    if (this.type === this.typeConstants.singleValue) {
      return this.setSingleValue(null, true);
    }

    if (this.type === this.typeConstants.rangeValue) {
      return this.setRangeValue(null, true);
    }
    return false;
  }

  setAValueTo(newValue, mutable) {
    // Calculating a stepped value.
    const stepped = Math.round((+newValue) / this.step) * this.step;

    // Changing a mutable value.
    if (stepped < this.minLimit) {
      this[mutable] = this.minLimit;
    } else if (stepped > this.maxLimit) {
      this[mutable] = this.maxLimit;
    } else {
      this[mutable] = stepped;
    }
  }

  setType(newType) {
    Object.keys(this.typeConstants).forEach((constant) => {
      if (newType === this.typeConstants[constant]) {
        this.type = newType;

        this.typeUpdateEvent.trigger({
          value: this.type,
          typeConstants: { ...this.typeConstants },
        });
      }
      return false;
    });
  }

  setLimits(newLimits = {}) {
    // If any argument does not fit, it will take a current value.
    const min = helper.isNumber(newLimits.minLimit) ? +newLimits.minLimit : this.minLimit;
    const max = helper.isNumber(newLimits.maxLimit) ? +newLimits.maxLimit : this.maxLimit;

    if (min < max) {
      this.minLimit = min;
      this.maxLimit = max;
    }
    if (min === max) {
      this.minLimit = min;
      this.maxLimit = max + 1;
    }
    if (min > max) {
      this.minLimit = max;
      this.maxLimit = min;
    }

    // Update count of values.
    this.valuesCount = this.maxLimit - this.minLimit;

    this.limitsUpdateEvent.trigger({
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      valuesCount: this.valuesCount,
    });

    return {
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      valuesCount: this.valuesCount,
    };
  }

  setStep(newStep) {
    if (!helper.isNumber(newStep) || +newStep <= 0) return;
    this.step = +newStep;

    this.stepUpdateEvent.trigger(this.step);
  }

  setSingleValue(newValue) {
    const value = helper.isNumber(newValue) ? +newValue : this.singleValue;

    this.setAValueTo(value, 'singleValue');

    // Update selected
    this.singleSelected = ((this.singleValue - this.minLimit) / this.valuesCount) * 100;

    // Returns
    this.valueUpdateEvent.trigger({
      value: this.singleValue,
      selected: this.singleSelected,
    });
    return {
      value: this.singleValue,
      selected: this.singleSelected,
    };
  }

  setRangeValue(newValuesArg = {}) {
    const newValues = helper.isObject(newValuesArg) ? newValuesArg : {};
    let min = helper.isNumber(newValues.minValue) ? +newValues.minValue : this.rangeValueMin;
    let max = helper.isNumber(newValues.maxValue) ? +newValues.maxValue : this.rangeValueMax;

    if (min === max) {
      max += this.step;
    }
    if (min > max) {
      const clone = max;
      max = min;
      min = clone;
    }

    this.setAValueTo(min, 'rangeValueMin');
    this.setAValueTo(max, 'rangeValueMax');


    // Update selected
    this.rangeSelected = ((this.rangeValueMax - this.rangeValueMin) / this.valuesCount) * 100;

    // Returns
    this.valueUpdateEvent.trigger({
      minValue: this.rangeValueMin,
      maxValue: this.rangeValueMax,
      selected: this.rangeSelected,
    });
    return {
      minValue: this.rangeValueMin,
      maxValue: this.rangeValueMax,
      selected: this.rangeSelected,
    };
  }

  setNearestValue(newValue, viaPercents) {
    if (!helper.isNumber(newValue)) return;

    const value = viaPercents === false
      ? Math.round(+newValue)
      : Math.round(this.valuesCount * (+newValue / 100) + this.minLimit);

    if (this.type === this.typeConstants.singleValue) {
      this.setSingleValue(value);
    }

    if (this.type === this.typeConstants.rangeValue) {
      if (value < (this.rangeValueMin + this.rangeValueMax) / 2) {
        this.setRangeValue({ minValue: +value }, true);
      } else {
        this.setRangeValue({ maxValue: +value }, true);
      }
    }
  }

  getType() {
    return {
      value: this.type,
      typeConstants: { ...this.typeConstants },
    };
  }

  getLimits() {
    return {
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      valuesCount: this.valuesCount,
    };
  }

  getStep() {
    return this.step;
  }

  getValue() {
    if (this.type === this.typeConstants.singleValue) {
      return {
        value: this.singleValue,
        selected: this.singleSelected,
      };
    }

    if (this.type === this.typeConstants.rangeValue) {
      return {
        minValue: this.rangeValueMin,
        maxValue: this.rangeValueMax,
        selected: this.rangeSelected,
      };
    }
    return false;
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
