import makeEventModule from "@event";
import helperModule from "@helper";

const helper = helperModule;
const makeEvent = makeEventModule;

class Model {
	constructor() {
		// Defaults
		this.minLimit = 0;
		this.maxLimit = 100;
		this.valuesCount = this.maxLimit - this.minLimit;

		this.singleValue = 50;
		this.rangeValueMin = 20;
		this.rangeValueMax = 80;
		this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100;
		this.rangeSelected = (this.rangeValueMax - this.rangeValueMin) / this.valuesCount * 100;
		
		this.step = 1;

		this.type = "single";
		this.typeConstants = {
			singleValue: "single",
			rangeValue: "range"
		};

		this._addEvents();
	}

	recalculateValue() {
		if (this.type === this.typeConstants.singleValue) {
			return this.setSingleValue(null, true);
		}

		if (this.type === this.typeConstants.rangeValue) {
			return this.setRangeValue(null, true);
		}
	}

	setAValueTo(newValue, mutable, isAuto) {
		// Calculating a stepped value.
		var stepped = Math.round((+newValue) / this.step) * this.step;

		// Changing a mutable value.
		if (stepped < this.minLimit) {
			this[mutable] = this.minLimit;
			if (!isAuto) console.log("The value was equated to the minimum, because it is less than the minimum value.");
		} else if (stepped > this.maxLimit) {
			this[mutable] = this.maxLimit;
			if (!isAuto) console.log("The value was equated to the maximum, because it is more than the maximum value.");
		} else {
			this[mutable] = stepped;
		}
	}

	setType(newType) {
		for (var constant in this.typeConstants) {
			if (newType === this.typeConstants[constant]) {
				this.type = newType;

				this.typeUpdateEvent.trigger({
					value: this.type,
					typeConstants: Object.assign({}, this.typeConstants)
				});
				return {
					value: this.type,
					typeConstants: Object.assign({}, this.typeConstants)
				};
			}
		}
	}

	setLimits(newLimits, isAuto) {
		if(!helper.isObject(newLimits)) newLimits = {};

		// If any argument does not fit, it will take a current value.
		var min = helper.isNumber(newLimits.minLimit) ? +newLimits.minLimit : this.minLimit,
			max = helper.isNumber(newLimits.maxLimit) ? +newLimits.maxLimit : this.maxLimit;

		if (min < max) {
			this.minLimit = min;
			this.maxLimit = max;
		}
		if (min === max) {
			this.minLimit = min;
			this.maxLimit = max + 1;
			if (!isAuto) console.log("Maximum limit was increased by 1, because the minimum limit is equal to the maximum limit.");
		} 
		if (min > max) {
			this.minLimit = max;
			this.maxLimit = min;
			if (!isAuto) console.log("Limits was reversed, because the maximum limit is less than the minimum limit.");
		}

		// Update count of values.
		this.valuesCount = this.maxLimit - this.minLimit;

		this.limitsUpdateEvent.trigger({
			minLimit: this.minLimit,
			maxLimit: this.maxLimit,
			valuesCount: this.valuesCount
		});

		return {
			minLimit: this.minLimit,
			maxLimit: this.maxLimit,
			valuesCount: this.valuesCount
		};
	}

	setStep(newStep) {
		if (!helper.isNumber(newStep) || +newStep <= 0) return;
		this.step = +newStep;

		this.stepUpdateEvent.trigger(this.step);
		return this.step;
	}

	setSingleValue(newValue, isAuto) {
		newValue = helper.isNumber(newValue) ? +newValue : this.singleValue;

		this.setAValueTo(newValue, "singleValue", isAuto);

		// Update selected
		this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100;

		// Returns
		this.valueUpdateEvent.trigger({
			value: this.singleValue,
			selected: this.singleSelected
		});
		return {
			value: this.singleValue,
			selected: this.singleSelected
		};
	}

	setRangeValue(newValues, isAuto) {
		if (!helper.isObject(newValues)) newValues = {};

		var min = helper.isNumber(newValues.minValue) ? +newValues.minValue : this.rangeValueMin;
		var max = helper.isNumber(newValues.maxValue) ? +newValues.maxValue : this.rangeValueMax;

		if (min === max) {
			max += this.step;
			if (!isAuto) console.log("The maximum value was increased by step size, because minimum value is equal to maximum value.");
		}
		if (min > max) {
			let clone = max;
			max = min;
			min = clone;
			if (!isAuto) console.log("The values was reversed, because maximum value is less than minimum value.");
		}
		
		this.setAValueTo(min, "rangeValueMin", isAuto);
		this.setAValueTo(max, "rangeValueMax", isAuto);


		// Update selected
		this.rangeSelected = (this.rangeValueMax - this.rangeValueMin) / this.valuesCount * 100;

		// Returns
		this.valueUpdateEvent.trigger({
			minValue: this.rangeValueMin,
			maxValue: this.rangeValueMax,
			selected: this.rangeSelected
		});
		return {
			minValue: this.rangeValueMin,
			maxValue: this.rangeValueMax,
			selected: this.rangeSelected
		};
	}

	setNearestValue(value, viaPercents, isAuto) {
		if (!helper.isNumber(value)) return;

		var value = viaPercents === false
			? Math.round(+value)
			: Math.round(this.valuesCount * +value / 100 + this.minLimit)

		if (this.type === this.typeConstants.singleValue) {
			return this.setSingleValue(value, isAuto);
		}

		if (this.type === this.typeConstants.rangeValue) {
			if (value < (this.rangeValueMin + this.rangeValueMax) / 2) {
				return this.setRangeValue({minValue: +value}, true);
			} else {
				return this.setRangeValue({maxValue: +value}, true);
			}
		}
	}

	getType() {
		return {
			value: this.type,
			typeConstants: Object.assign({}, this.typeConstants)
		};
	}

	getLimits() {
		return {
			minLimit: this.minLimit,
			maxLimit: this.maxLimit,
			valuesCount: this.valuesCount
		};
	}

	getStep() {
		return this.step;
	}

	getValue() {
		if(this.type === this.typeConstants.singleValue) {
			return {
				value: this.singleValue,
				selected: this.singleSelected
			};
		}

		if(this.type === this.typeConstants.rangeValue) {
			return {
				minValue: this.rangeValueMin,
				maxValue: this.rangeValueMax,
				selected: this.rangeSelected
			};
		}
	}

	_addEvents() {
		this.valueUpdateEvent = makeEvent();
		this.limitsUpdateEvent = makeEvent();
		this.stepUpdateEvent = makeEvent();
		this.percentageUpdateEvent = makeEvent();
		this.typeUpdateEvent = makeEvent();
	}
}

export default Model;