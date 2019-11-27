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
}

class ModelPublicks {
  constructor() {
    this.type = 'single';
    this.limits = {minLimit: 0, maxLimit: 100};
    this.step = 1;
    this.singleValue = 50;
    this.rangeValue = {minValue: 20, maxValue: 80};
  }
}


export { ModelDefaults, ModelPublicks };
