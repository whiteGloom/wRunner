import Helper from '@Helper';

class ScaleView {
  constructor({ parent }) {
    this.parent = parent;
    this.scaleDivisionsList = [];

    this._init();
  }

  updateDivisions(count) {
    this.scaleDivisionsList.forEach((division) => {
      division.remove();
    });
    this.scaleDivisionsList.length = 0;

    while (this.scaleDivisionsList.length < count) {
      const division = Helper.makeElement(['wrunner__scale-division']);
      this.scaleDivisionsList.push(division);
    }

    this._appendDivisions();
  }

  getElements() {
    return [this.scaleDivisionsBlock, ...this.scaleDivisionsList];
  }

  _appendDivisions() {
    window.requestAnimationFrame(() => {
      this.scaleDivisionsList.forEach((division) => {
        this.scaleDivisionsBlock.appendChild(division);
      });
    });
  }

  _init() {
    this.scaleDivisionsBlock = Helper.makeElement(['wrunner__scale-divisions-block']);

    this.parent.appendChild(this.scaleDivisionsBlock);
  }
}

export default ScaleView;
