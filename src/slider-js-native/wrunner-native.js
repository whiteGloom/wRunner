import modelModule from "./model/model.js";
import viewModule from "./view/view.js";
import presenterModule from "./presenter/presenter.js";

window.wRunner = function(userOptions) {
	userOptions = userOptions ? userOptions : {};

	const structure = new function() {
		this.Model = modelModule;

		this.View = viewModule;

		this.Presenter = presenterModule;
	};

	return newInstance();


	function newInstance() {
		// Structure
		var model = new structure.Model(),
			view = new structure.View(),
			presenter = new structure.Presenter({model: model, view: view, userOptions: userOptions});

		var setters = {
			setType: model.setType.bind(model),
			setLimits: model.setLimits.bind(model),
			setStep: model.setStep.bind(model),
			setSingleValue: model.setSingleValue.bind(model),
			setRangeValue: model.setRangeValue.bind(model),
			setNearestValue: model.setNearestValue.bind(model),

			setRoots: view.setRoots.bind(view),
			setTheme: view.setTheme.bind(view),
			setDirection: view.setDirection.bind(view),
			setValueNoteDisplay: view.setValueNoteDisplay.bind(view),
			setDivisionsCount: view.setDivisionsCount.bind(view)
		};

		var getters = {
			getType: model.getType.bind(model),
			getLimits: model.getLimits.bind(model),
			getStep: model.getStep.bind(model),
			getValue: model.getValue.bind(model),

			getRoots: view.getRoots.bind(view),
			getTheme: view.getTheme.bind(view),
			getDirection: view.getDirection.bind(view),
			getValueNoteDisplay: view.getValueNoteDisplay.bind(view),
			getDivisionsCount: view.getDivisionsCount.bind(view),
		};

		var events = {
			onTypeUpdate: presenter.onTypeUpdate.bind(presenter),
			onLimitsUpdate: presenter.onLimitsUpdate.bind(presenter),
			onStepUpdate: presenter.onStepUpdate.bind(presenter),
			onValueUpdate: presenter.onValueUpdate.bind(presenter),

			onRootsUpdate: presenter.onRootsUpdate.bind(presenter),
			onThemeUpdate: presenter.onThemeUpdate.bind(presenter),
			onDirectionUpdate: presenter.onDirectionUpdate.bind(presenter),
			onDivisionsCountUpdate: presenter.onDivisionsCountUpdate.bind(presenter),
			onValueNoteDisplayUpdate: presenter.onValueNoteDisplayUpdate.bind(presenter)
		};

		return {
			...setters, ...getters, ...events
		};
	}
};