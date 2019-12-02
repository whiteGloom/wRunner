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
    this.valueNotesMode = {
      value: 'separate',
      constants: {
        separateValue: 'separate',
        commonValue: 'common',
      }
    };
    this.theme = {
      value: 'default',
      className: 'theme',
      oldValue: null,
    };
    this.direction = {
      value: 'horizontal',
      className: 'direction',
      oldValue: null,
      constants: {
        horizontalValue: 'horizontal',
        verticalValue: 'vertical',
      }
    }
    this.roots = document.body;
    this.divisionsCount = 5;
    this.valueNotesDisplay = true;
    this.step = 1;
  }

  getOptionsPresets() {
    const presets = {
      type: this.type.value,
      limits: { minLimit: this.limits.minLimit, maxLimit: this.limits.maxLimit },
      step: this.step,
      singleValue: this.singleValue,
      rangeValue: { minValue: this.values.rangeValueMin, maxValue: this.values.rangeValueMax },
      roots: this.roots,
      theme: this.theme.value,
      direction: this.direction.value,
      divisionsCount: this.divisionsCount,
      valueNotesDisplay: this.valueNotesDisplay,
    };

    return presets;
  }
}


export default ModelDefaults;
