const helper = new function() {
	this.isNumber = function(value, exceps) {
		var exceps = exceps ? exceps : [];
		for (var i = 0; i < exceps.length; i++) {
			if (typeof value === exceps[i]) return true
		};

		if (!Number.isNaN(+value) && (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number')) return true;

		return false
	},

	this.toNumber = function(value) {
		if (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number' && !Number.isNaN(+value)) return +value;
		return false
	},

	this.isDomEl = function(el) {
		if (typeof el !== 'object' || Number.isNaN(el) || el === null) return false;
		return 'ownerDocument' in el ? true : false;
	},

	this.isObject = function(el) {
		if (typeof el === 'object' && el !== null && !Number.isNaN(el)) return true;
		return false
	},

	this.isArray = function(el) {
		if (typeof el === 'object' && el !== null && !Number.isNaN(el) && el.length) return true;
		return false
	}
}

export default helper