class ModelDefaults {
  constructor() {
    this.limits = {
      minLimit: 0,
      maxLimit: 100,
      valuesCount: 100,
    }
    this.values = {
      singleValue: 50,
      rangeValueMin: 20,
      rangeValueMax: 80,
    };
    this.type = {
      value: 'single',
      constants: {
        singleValue: 'single',
        rangeValue: 'range',
      },
    };
    this.step = 1;
  }

  getOptionsPresets() {
    const presets = {
      type: this.type.value,
      limits: { minLimit: this.limits.minLimit, maxLimit: this.limits.maxLimit },
      step: this.step,
      singleValue: this.singleValue,
      rangeValue: { minValue: this.values.rangeValueMin, maxValue: this.values.rangeValueMax },
    };

    return presets;
  }
}


export default ModelDefaults;
