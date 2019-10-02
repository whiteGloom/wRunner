import makeEventModule from '../../event.js';
import helperModule from '../../helper.js';

const helper = helperModule;
const makeEvent = makeEventModule;

function Model() {
	// Defaults
	this.minLimit = 0;
	this.maxLimit = 100;
	this.valuesCount = this.maxLimit - this.minLimit;

	this.singleValue = 50;
	this.rangeMinValue = 20;
	this.rangeMaxValue = 80;
	this.singleSelected = (this.singleValue - this.minLimit) / this.valuesCount * 100;
	this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100;
	
	this.step = 1;

	this.type = 'single';
	this.typeConstants = {
		singleValue: 'single',
		rangeValue: 'range',
	};


	this.valueUpdateEvent = makeEvent();
	this.limitsUpdateEvent = makeEvent();
	this.stepUpdateEvent = makeEvent();
	this.percentageUpdateEvent = makeEvent();
	this.typeUpdateEvent = makeEvent();
};

Model.prototype = {
	setLimits(newLimits, auto) {
		var newLimits = newLimits ? newLimits : {};

		// If any argument does not fit, it will take a current value.
		var min = helper.isNumber(newLimits.minLimit) ? +newLimits.minLimit : this.minLimit,
			max = helper.isNumber(newLimits.maxLimit) ? +newLimits.maxLimit : this.maxLimit;

		// If minLimit > maxLimit, it will reverse them.
		if (min <= max) {
			this.minLimit = min;
			this.maxLimit = max;
		} else {
			this.minLimit = max;
			this.maxLimit = min;
			if (!auto) console.log('Values have been reversed, because the minimum value is less than the maximum value.');
		};

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
		}
	},

	getLimits() {
		return {
			minLimit: this.minLimit,
			maxLimit: this.maxLimit,
			valuesCount: this.valuesCount
		}
	},

	setSingleValue(value, auto){
		var value = helper.isNumber(value) ? +value : this.singleValue;
		this.setAValueTo(value, 'singleValue', true);

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
		}
	},

	setRangeValue(values, auto) {
		if (typeof values !== 'object') return;

		if (values == null) {
			var min = this.rangeMinValue;
			var max = this.rangeMaxValue;
		} else {
			var min = helper.isNumber(values.minValue) ? +values.minValue : this.rangeMinValue;
			var max = helper.isNumber(values.maxValue) ? +values.maxValue : this.rangeMaxValue;
		};

		if (min > max) {
			let clone = max;
			max = min;
			min = clone;
		}
		
		this.setAValueTo(min, 'rangeMinValue');
		this.setAValueTo(max, 'rangeMaxValue');


		// Update selected
		this.rangeSelected = (this.rangeMaxValue - this.rangeMinValue) / this.valuesCount * 100;

		// Returns
		this.valueUpdateEvent.trigger({
			minValue: this.rangeMinValue,
			maxValue: this.rangeMaxValue,
			selected: this.rangeSelected,
		});
		return {
			minValue: this.rangeMinValue,
			maxValue: this.rangeMaxValue,
			selected: this.rangeSelected,
		}
	},

	recalculateValue() {
		if (this.type === this.typeConstants.singleValue) {
			return this.setSingleValue(null, true);
		}

		if (this.type === this.typeConstants.rangeValue) {
			return this.setRangeValue(null, true);
		}
	},

	setNearestValueViaPercents(percents) {
		if (!helper.isNumber(percents)) return;

		var value = Math.round(this.valuesCount * +percents / 100 + this.minLimit);

		if (this.type === this.typeConstants.singleValue) {
			return this.setSingleValue(value, true);
		}

		if (this.type === this.typeConstants.rangeValue) {
			if (value < (this.rangeMinValue + this.rangeMaxValue) / 2) {
				return this.setRangeValue({minValue: +value}, true);
			} else {
				return this.setRangeValue({maxValue: +value}, true);
			};
		}
	},

	setAValueTo(value, mutable, auto) {
		var stepped;

		// Calculating a stepped value.
		if (+value !== this[mutable]) {
			stepped = this[mutable] - Math.round((this[mutable] - +value) / this.step) * this.step;
		} else {
			stepped = Math.round(this[mutable] / this.step) * this.step;
		};

		// Changing a mutable value.
		if (stepped < this.minLimit) {
			this[mutable] = this.minLimit;
			if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
		} else if (stepped > this.maxLimit) {
			this[mutable] = this.maxLimit;
			if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
		} else {
			this[mutable] = stepped;
		};
	},

	getValue() {
		if(this.type == this.typeConstants.singleValue) {
			return {
				value: this.singleValue,
				selected: this.singleSelected,
			}
		};

		if(this.type == this.typeConstants.rangeValue) {
			return {
				minValue: this.rangeMinValue,
				maxValue: this.rangeMaxValue,
				selected: this.rangeSelected,
			}
		};
	},

	setStep(newStep) {
		if (!helper.isNumber(newStep) || newStep <= 0) return;
		this.step = +newStep;

		this.stepUpdateEvent.trigger(this.step);
		return this.step;
	},

	getStep() {
		return this.step;
	},

	setType(type) {
		var exist = false;
		for (var constant in this.typeConstants) {
			if (type === this.typeConstants[constant]) {
				exist = true;
				break;
			}
		}

		if (!exist) return;
		this.type = type;

		this.typeUpdateEvent.trigger(this.type);
		if (this.type == this.typeConstants.singleValue) {
			this.valueUpdateEvent.trigger({
				value: this.value,
				selected: this.singleSelected
			});
		}
		if (this.type == this.typeConstants.rangeValue) {
			this.valueUpdateEvent.trigger({
				minValue: this.minValue,
				maxValue: this.maxValue,
				selected: this.rangeSelected
			})
		}
		return this.type
	},

	getType() {
		return {
			type: this.type,
			typeConstants: Object.assign({}, this.typeConstants)
		};
	},
};

export default Model