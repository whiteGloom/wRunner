import EventDispatcher from '../abstracts/event-dispatcher';

/**
 * @class
 * @extends {EventDispatcher}
 */
class MainModel extends EventDispatcher {
  /** @enum {number} */
  static VALUES_TYPES = {
    NUMERIC: 0,
    CUSTOM: 1
  };

  /** @const {number} */
  static DEFAULT_NUMERIC_STEP = 1;

  /** @const {MainModel.VALUES_TYPES} */
  static DEFAULT_VALUES_TYPE = MainModel.VALUES_TYPES.NUMERIC;

  /** @const {MainModel.VALUES_TYPES} */
  static DEFAULT_NUMERIC_VALUES_LIMITS = MainModel.VALUES_TYPES.NUMERIC;

  constructor() {
    super();

    /**
     * @type {Array<*>}
     * @protected
     */
    this._customValuesArray = [];

    /**
     * @type {Array<number>}
     * @protected
     */
    this._numericValuesArray = [];

    /**
     * @type {number}
     * @protected
     */
    this._numericStep = MainModel.DEFAULT_NUMERIC_STEP;

    /**
     * @type {MainModel.VALUES_TYPES}
     * @protected
     */
    this._valuesType = MainModel.DEFAULT_VALUES_TYPE;

    /**
     * @type {{ min: number, max: number }}
     * @protected
     */
    this._numericLimits = {
      min: 0,
      max: 100
    };
  }

  /**
   * @protected
   */
  _updateNumericValuesArray() {
    this._numericValuesArray = [];

    const { min, max } = this._numericLimits;

    let nextValue = min;
    let i = 0;
    while (nextValue < max) {
      this._numericValuesArray.push(nextValue);

      i += 1;
      nextValue = min + (this._numericStep * i);
    }

    this._numericValuesArray.push(max);
  }

  /**
   * @param {MainModel.VALUES_TYPES} newType
   * @public
   */
  setValuesType(newType) {
    if (!MainModel.VALUES_TYPES.includes(newType)) {
      return;
    }

    this._valuesType = newType;
  }

  /**
   * @param {number} minLimit
   * @param {number} maxLimit
   * @public
   */
  setNumericLimits(minLimit, maxLimit) {
    if (typeof minLimit !== 'number' || typeof maxLimit !== 'number') {
      return;
    }

    let min = minLimit;
    let max = maxLimit;

    if (min > max) {
      [min, max] = [max, min];
    }

    this._numericLimits.min = min;
    this._numericLimits.max = max;
  }

  /**
   * @param {number} newStep
   * @public
   */
  setNumericStep(newStep) {
    if (typeof newStep !== 'number') {
      return;
    }

    this._numericStep = newStep;
  }

  /**
   * @param {Array<*>} newCustomValues
   * @public
   */
  setCustomValues(newCustomValues) {
    if (!Array.isArray(newCustomValues)) {
      return;
    }

    this._customValuesArray = newCustomValues;
  }
}

export default MainModel;
