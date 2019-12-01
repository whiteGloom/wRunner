class ViewDefaults {
  constructor() {
    this.roots = document.body;
    this.divisionsCount = 5;
    this.valueNotesDisplay = true;
    this.valueNotesMode = 'separate';
    this.valueNotesModeConstants = {
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
      constants: {
        horizontalValue: 'horizontal',
        verticalValue: 'vertical',
      }
    }
  }

  getOptionsPresets() {
    return {
      roots: this.roots,
      theme: this.theme.value,
      direction: this.direction.value,
      divisionsCount: this.divisionsCount,
      valueNoteDisplay: this.valueNoteDisplay,
    };
  }
}

export default ViewDefaults;
