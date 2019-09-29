import makeEvent from '../../event.js';
import helper from '../../helper.js';

function Presenter(data) {
	var data = data ? data : {};

	this.model = data.model;
	this.view = data.view;

	// Model events
	this.model.stepUpdateEvent.addHandler(function(data) {
		this.model.setValue(null, true)
	}.bind(this));

	this.model.valueByProgressUpdateEvent.addHandler(function(data) {
		this.model.setValue(data, true);
	}.bind(this));

	this.model.valueUpdateEvent.addHandler(function(data) {
		this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
	}.bind(this));

	this.model.limitsUpdateEvent.addHandler(function(data) {
		this.model.setValue(null, true);
	}.bind(this));

	this.model.typeUpdateEvent.addHandler(function(data) {
		this.view.updateDOM(this.model.getType());
	}.bind(this));

	// View events
	this.view.baseDOMGeneratedEvent.addHandler(function(data) {
		this.view.updateDOM(this.model.getType());
	}.bind(this));

	this.view.DOMUpdateEvent.addHandler(function(data) {
		this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
	}.bind(this));

	this.view.mouseDownEvent.addHandler(function(data) {
		this.view.action(data)
	}.bind(this));

	this.view.UIValueActionEvent.addHandler(function(data) {
		this.model.setValueByProgress(data, true)
	}.bind(this));

	this.view.stylesUpdateEvent.addHandler(function(data) {
		this.view.applyStyles();
		this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
	}.bind(this));

	this.view.valueNoteDisplayUpdateEvent.addHandler(function(data) {
		this.view.applyValueNoteDisplay();
		this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType())
	}.bind(this));

	this.view.rootsUpdateEvent.addHandler(function(data) {
		this.view.append();
	}.bind(this));

	this.view.divisionsCountUpdateEvent.addHandler(function(data) {
		this.view.generateDivisions();
		this.view.applyStyles();
	}.bind(this));

	// Plugin load
	this.runInstance();
	this.applyOptions(data.options);
	this.triggerEvents();
};

Presenter.prototype = {
	runInstance: function() {
		this.view.generateBaseDOM();
		this.view.generateDivisions();
		this.view.append();
		this.view.applyValueNoteDisplay();
		this.view.applyStyles();
		this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
	},

	applyOptions: function(options) {
		var options = options ? options : {};

		// Model
		if (options.step !== undefined) this.model.setStep(options.step);
		if (options.type !== undefined) this.model.setType(options.type);
		if (options.limits !== undefined) this.model.setLimits(options.limits);
		if (options.value !== undefined) this.model.setValue(options.value);

		// View
		if (options.roots !== undefined) this.view.setRoots(options.roots);
		if (options.divisionsCount !== undefined) this.view.setDivisionsCount(options.divisionsCount);
		if (options.valueNoteDisplay !== undefined) this.view.setValueNoteDisplay(options.valueNoteDisplay);
		if (options.styles !== undefined) this.view.setStyles(options.styles);

		// Events
		if (options.onStepUpdate !== undefined) this.onStepUpdate(options.onStepUpdate);
		if (options.onTypeUpdate !== undefined) this.onTypeUpdate(options.onTypeUpdate);
		if (options.onLimitsUpdate !== undefined) this.onLimitsUpdate(options.onLimitsUpdate);
		if (options.onValueUpdate !== undefined) this.onValueUpdate(options.onValueUpdate);

		if (options.onRootsUpdate !== undefined) this.onRootsUpdate(options.onRootsUpdate);
		if (options.onDivisionsCountUpdate !== undefined) this.onDivisionsCountUpdate(options.onDivisionsCountUpdate);
		if (options.onValueNoteDisplayUpdate !== undefined) this.onValueNoteDisplayUpdate(options.onValueNoteDisplayUpdate);
		if (options.onStylesUpdate !== undefined) this.onStylesUpdate(options.onStylesUpdate);
	},

	triggerEvents: function() {
		if (this.model.type == this.model.typeConstants.singleValue) {
			this.model.valueUpdateEvent.trigger({
				value: this.model.value,
				selected: this.model.singleSelected
			});
		}
		if (this.model.type == this.model.typeConstants.rangeValue) {
			this.model.valueUpdateEvent.trigger({
				minValue: this.model.minValue,
				maxValue: this.model.maxValue,
				selected: this.model.rangeSelected
			})
		}

		this.model.typeUpdateEvent.trigger(this.model.type);
		this.model.stepUpdateEvent.trigger(this.model.step);;
		this.model.limitsUpdateEvent.trigger({
			minLimit: this.model.minLimit,
			maxLimit: this.model.maxLimit,
			valuesCount: this.model.valuesCount
		});

		this.view.stylesUpdateEvent.trigger(Object.assign({}, this.view.styles));
		this.view.valueNoteDisplayUpdateEvent.trigger(this.view.valueNoteDisplay);
		this.view.rootsUpdateEvent.trigger(this.view.roots);
		this.view.divisionsCountUpdateEvent.trigger(this.view.divisionsCount);
	},

	onValueUpdate: function(handler) {
		this.model.valueUpdateEvent.addHandler(handler);
	},

	onStepUpdate: function(handler) {
		this.model.stepUpdateEvent.addHandler(handler);
	},

	onLimitsUpdate: function(handler) {
		this.model.limitsUpdateEvent.addHandler(handler);
	},

	onTypeUpdate: function(handler) {
		this.model.typeUpdateEvent.addHandler(handler);
	},

	onStylesUpdate: function(handler) {
		this.view.stylesUpdateEvent.addHandler(handler);
	},

	onValueNoteDisplayUpdate: function(handler) {
		this.view.valueNoteDisplayUpdateEvent.addHandler(handler);
	},

	onRootsUpdate: function(handler) {
		this.view.rootsUpdateEvent.addHandler(handler);
	},

	onDivisionsCountUpdate: function(handler) {
		this.view.divisionsCountUpdateEvent.addHandler(handler);
	},
}

export default Presenter