class ViewDefaults {
  constructor() {
    this.roots = document.body;
    this.divisionsCount = 5;
    this.valueNoteDisplay = true;
    this.valueNoteRangeMode = 'separate';
    this.valueNoteRangeModeConstants = {
      separateValue: 'separate',
      commonValue: 'common',
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
    };
    this.directionConstants = {
      horizontalValue: 'horizontal',
      verticalValue: 'vertical',
    };
  }
}

class ViewPublicks {
  constructor() {
    this.roots = document.body;
    this.theme = 'default';
    this.direction = 'horizontal';
    this.divisionsCount = 5;
    this.valueNoteDisplay = true;
  }
}

export { ViewDefaults, ViewPublicks };
