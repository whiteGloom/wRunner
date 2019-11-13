class Presenter {
	constructor(options) {
		options = options ? options : {};

		this.model = options.model;
		this.view = options.view;

		// Plugin load
		this._applyDefaultEvents();
		this._applyUserEvents(options.userOptions);
		this._applyUserOptions(options.userOptions);
		this._initInstance();
		this._triggerEvents();
	}

	onValueUpdate(handler) {
		this.model.valueUpdateEvent.addHandler(handler);
	}

	onStepUpdate(handler) {
		this.model.stepUpdateEvent.addHandler(handler);
	}

	onLimitsUpdate(handler) {
		this.model.limitsUpdateEvent.addHandler(handler);
	}

	onTypeUpdate(handler) {
		this.model.typeUpdateEvent.addHandler(handler);
	}

	onThemeUpdate(handler) {
		this.view.themeUpdateEvent.addHandler(handler);
	}

	onDirectionUpdate(handler) {
		this.view.directionUpdateEvent.addHandler(handler);
	}

	onValueNoteDisplayUpdate(handler) {
		this.view.valueNoteDisplayUpdateEvent.addHandler(handler);
	}

	onRootsUpdate(handler) {
		this.view.rootsUpdateEvent.addHandler(handler);
	}

	onDivisionsCountUpdate(handler) {
		this.view.divisionsCountUpdateEvent.addHandler(handler);
	}

	_applyDefaultEvents() {
		// Model events
		this.model.typeUpdateEvent.addHandler(function(data) {
			this.view.updateDOM(this.model.getType());
			this.model.recalculateValue();
			this.view.applyValueNoteDisplay();
		}.bind(this));

		this.model.limitsUpdateEvent.addHandler(function(data) {
			this.model.recalculateValue();
		}.bind(this));

		this.model.stepUpdateEvent.addHandler(function(data) {
			this.model.recalculateValue();
		}.bind(this));

		this.model.valueUpdateEvent.addHandler(function(data) {
			this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
		}.bind(this));


		// View events
		this.view.rootsUpdateEvent.addHandler(function(data) {
			this.view.append();
			this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
		}.bind(this));

		this.view.UIMouseActionEvent.addHandler(function(data) {
			this.model.setNearestValue(data, true, true);
		}.bind(this));

		this.view.themeUpdateEvent.addHandler(function(data) {
			this.view.applyStyles();
			this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
		}.bind(this));

		this.view.directionUpdateEvent.addHandler(function(data) {
			this.view.applyStyles();
			this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
		}.bind(this));

		this.view.valueNoteDisplayUpdateEvent.addHandler(function(data) {
			this.view.applyValueNoteDisplay();
		}.bind(this));

		this.view.divisionsCountUpdateEvent.addHandler(function(data) {
			this.view.generateDivisions();
			this.view.applyStyles();
		}.bind(this));

		this.view.valueNoteRangeModeUpdateEvent.addHandler(function(data) {
			this.view.applyValueNoteDisplay();
		}.bind(this));
	}

	_initInstance() {
		this.view.updateDOM(this.model.getType());
		this.view.generateDivisions();
		this.view.applyValueNoteDisplay();
		this.view.applyStyles();
		this.view.append();
	}

	_applyUserEvents(options) {
		options = options ? options : {};

		if (options.onTypeUpdate !== undefined) this.onTypeUpdate(options.onTypeUpdate);
		if (options.onLimitsUpdate !== undefined) this.onLimitsUpdate(options.onLimitsUpdate);
		if (options.onStepUpdate !== undefined) this.onStepUpdate(options.onStepUpdate);
		if (options.onValueUpdate !== undefined) this.onValueUpdate(options.onValueUpdate);

		if (options.onRootsUpdate !== undefined) this.onRootsUpdate(options.onRootsUpdate);
		if (options.onThemeUpdate !== undefined) this.onThemeUpdate(options.onThemeUpdate);
		if (options.onDirectionUpdate !== undefined) this.onDirectionUpdate(options.onDirectionUpdate);
		if (options.onDivisionsCountUpdate !== undefined) this.onDivisionsCountUpdate(options.onDivisionsCountUpdate);
		if (options.onValueNoteDisplayUpdate !== undefined) this.onValueNoteDisplayUpdate(options.onValueNoteDisplayUpdate);
	}

	_applyUserOptions(options) {
		options = options ? options : {};

		if (options.type !== undefined) this.model.setType(options.type);
		if (options.limits !== undefined) this.model.setLimits(options.limits);
		if (options.step !== undefined) this.model.setStep(options.step);
		if (options.singleValue !== undefined) this.model.setSingleValue(options.singleValue);
		if (options.rangeValue !== undefined) this.model.setRangeValue(options.rangeValue);

		if (options.roots !== undefined) this.view.setRoots(options.roots);
		if (options.theme !== undefined) this.view.setTheme(options.theme);
		if (options.direction !== undefined) this.view.setDirection(options.direction);
		if (options.divisionsCount !== undefined) this.view.setDivisionsCount(options.divisionsCount);
		if (options.valueNoteDisplay !== undefined) this.view.setValueNoteDisplay(options.valueNoteDisplay);
	}

	_triggerEvents() {
		this.model.valueUpdateEvent.trigger(this.model.getValue());
		this.model.typeUpdateEvent.trigger(this.model.getType());
		this.model.stepUpdateEvent.trigger(this.model.step);
		this.model.limitsUpdateEvent.trigger(this.model.getLimits());

		this.view.themeUpdateEvent.trigger(this.view.getTheme());
		this.view.directionUpdateEvent.trigger(this.view.getDirection());
		this.view.valueNoteDisplayUpdateEvent.trigger(this.view.getValueNoteDisplay());
		this.view.rootsUpdateEvent.trigger(this.view.getRoots());
		this.view.divisionsCountUpdateEvent.trigger(this.view.getDivisionsCount());
	}
}

export default Presenter;