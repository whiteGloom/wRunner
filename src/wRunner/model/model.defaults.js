class ModelDefaults {
  constructor() {
    this.minLimit = 0;
    this.maxLimit = 100;
    this.valuesCount = this.maxLimit - this.minLimit;
    this.singleValue = 50;
    this.rangeValueMin = 20;
    this.rangeValueMax = 80;
    this.singleSelected = ((this.singleValue - this.minLimit) / this.valuesCount) * 100;
    this.rangeSelected = ((this.rangeValueMax - this.rangeValueMin) / this.valuesCount) * 100;
    this.step = 1;
    this.type = 'single';
    this.typeConstants = {
      singleValue: 'single',
      rangeValue: 'range',
    };
  }

  getOptionsPresets() {
    const presets = {
      type: this.type,
      limits: this.limits = { minLimit: this.minLimit, maxLimit: this.maxLimit },
      step: this.step,
      singleValue: this.singleValue,
      rangeValue: { minValue: this.rangeValueMin, maxValue: this.rangeValueMax },
    };

    return presets;
  }
}


export default ModelDefaults;
