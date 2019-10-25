const helper = new function() {
	this.isNumber = function(value) {
		if ((typeof value === "number" || typeof value === "string") & isFinite(value)) return true;

		return false;
	};

	this.toNumber = function(value) {
		if (this.isNumber(value)) return +value;
		return false;
	};

	this.isDOMEl = function(el) {
		if (this.isObject(el) && el.constructor !== Object && this.isNumber(el.nodeType) && +el.nodeType === 1) return true;
		return false;
	};

	this.isObject = function(el) {
		if (typeof el === "object" && el !== null) return true;
		return false;
	};
};

export default helper;