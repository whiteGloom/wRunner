import helper from '@helper';

class ScaleView {
  constructor({ parent }) {
    this.parent = parent;
    this.scaleDivisionsList = [];

    this._init();
  }

  generateDivisions(count) {
    this.scaleDivisionsList.forEach((el) => {
      el.remove();
    });
    this.scaleDivisionsList.length = 0;

    while (this.scaleDivisionsList.length < count) {
      const el = helper.makeEl(['wrunner__scaleDivision']);
      this.scaleDivisionsList.push(el);
    }

    window.requestAnimationFrame(() => {
      this.scaleDivisionsList.forEach((el) => {
        this.scaleDivisionsBlock.appendChild(el);
      });
    });
  }

  getElements() {
    return [this.scaleDivisionsBlock, ...this.scaleDivisionsList];
  }

  _init() {
    this.scaleDivisionsBlock = helper.makeEl(['wrunner__scaleDivisionsBlock']);

    this.parent.appendChild(this.scaleDivisionsBlock);
  }
}

export default ScaleView;
