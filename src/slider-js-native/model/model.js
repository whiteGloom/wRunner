import makeEvent from '../../event.js';
import helper from '../../helper.js';

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

	this.valueByProgressUpdateEvent = makeEvent();
	this.valueUpdateEvent = makeEvent();
	this.limitsUpdateEvent = makeEvent();
	this.stepUpdateEvent = makeEvent();
	this.percentageUpdateEvent = makeEvent();
	this.typeUpdateEvent = makeEvent();
};

Model.prototype = {
	setLimits: function(newLimits, auto) {
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

	getLimits: function() {
		return {
			minLimit: this.minLimit,
			maxLimit: this.maxLimit,
			valuesCount: this.valuesCount
		}
	},

	setValue: function(newValue, auto) {
		var set = setTo.bind(this);

		if(this.type == this.typeConstants.singleValue) {
			var val = helper.isNumber(newValue) ? +newValue : this.singleValue;
			set(val, 'singleValue');

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
		};

		if (this.type == this.typeConstants.rangeValue) {
			// If new value is a object
			if (helper.isObject(newValue) || newValue == null) {
				if (newValue == null) {
					var min = this.rangeMinValue;
					var max = this.rangeMaxValue;
				} else {
					var min = helper.isNumber(newValue.minValue) ? +newValue.minValue : this.rangeMinValue;
					var max = helper.isNumber(newValue.maxValue) ? +newValue.maxValue : this.rangeMaxValue;
				};

				if (min > max) {
					let clone = max;
					max = min;
					min = clone;
				};

				set(min, 'rangeMinValue');
				set(max, 'rangeMaxValue');
			};

			// If new value is a number
			if (helper.isNumber(newValue)) {
				// Choosing a value to set 
				if (newValue < (this.rangeMaxValue + this.rangeMinValue) / 2) {
					set(+newValue, 'rangeMinValue');
					set(this.rangeMaxValue, 'rangeMaxValue');
				} else {
					set(this.rangeMinValue, 'rangeMinValue');
					set(+newValue, 'rangeMaxValue');
				};
			};

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
		}

		// Setter
		function setTo(newValue, mutable) {
			var stepped;

			// Calculating stepped value.
			if (+newValue != this[mutable]) {
				stepped = this[mutable] - Math.round((this[mutable] - +newValue) / this.step) * this.step;
			} else {
				stepped = Math.round(this[mutable] / this.step) * this.step;
			};

			if (stepped < this.minLimit) {
				this[mutable] = this.minLimit;
				if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
			} else if (stepped > this.maxLimit) {
				this[mutable] = this.maxLimit;
				if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
			} else {
				this[mutable] = stepped;
			};
		}
	},

	getValue: function() {
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

	setStep: function(newStep) {
		if (!helper.isNumber(newStep) || newStep <= 0) return;
		this.step = +newStep;

		this.stepUpdateEvent.trigger(this.step);
		return this.step;
	},

	getStep: function() {
		return this.step;
	},

	// Function that calculating new value by click or drag.
	setValueByProgress: function(progress) {
		if (!helper.isNumber(progress)) return;

		var value = Math.round(this.valuesCount * +progress / 100 + this.minLimit);

		this.valueByProgressUpdateEvent.trigger(value);
		return value
	},

	setType: function(type) {
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

	getType: function() {
		return {
			type: this.type,
			typeConstants: Object.assign({}, this.typeConstants)
		};
	},
};

export default Model