import modelModule from "./model/model.js";
import viewModule from "./view/view.js";
import presenterModule from "./presenter/presenter.js";

;(function($){
	$.fn.wRunner = function(instanceOptions) {
		instanceOptions = instanceOptions ? instanceOptions : {};
		instanceOptions.roots = this[0];

		const structure = new function() {
			// Model
			this.Model = modelModule;

			// View
			this.View = viewModule;

			// Presenter
			this.Presenter = presenterModule;
		};

		return newInstance();


		function newInstance() {

			var model = new structure.Model(),
				view = new structure.View(),
				presenter = new structure.Presenter({model: model, view: view, instanceOptions: instanceOptions});

			return {
				setType: model.setType.bind(model),
				setLimits: model.setLimits.bind(model),
				setSingleValue: model.setSingleValue.bind(model),
				setRangeValue: model.setRangeValue.bind(model),
				setNearestValueViaPercents: model.setNearestValueViaPercents.bind(model),
				setStep: model.setStep.bind(model),

				getType: model.getType.bind(model),
				getLimits: model.getLimits.bind(model),
				getValue: model.getValue.bind(model),
				getStep: model.getStep.bind(model),

				setRoots: view.setRoots.bind(view),
				setStyles: view.setStyles.bind(view),
				setValueNoteDisplay: view.setValueNoteDisplay.bind(view),
				setDivisionsCount: view.setDivisionsCount.bind(view),

				getRoots: view.getRoots.bind(view),
				getStyles: view.getStyles.bind(view),
				getValueNoteDisplay: view.getValueNoteDisplay.bind(view),
				getDivisionsCount: view.getDivisionsCount.bind(view),

				onStepUpdate: presenter.onStepUpdate.bind(presenter),
				onTypeUpdate: presenter.onTypeUpdate.bind(presenter),
				onLimitsUpdate: presenter.onLimitsUpdate.bind(presenter),
				onValueUpdate: presenter.onValueUpdate.bind(presenter),

				onRootsUpdate: presenter.onRootsUpdate.bind(presenter),
				onDivisionsCountUpdate: presenter.onDivisionsCountUpdate.bind(presenter),
				onValueNoteDisplayUpdate: presenter.onValueNoteDisplayUpdate.bind(presenter),
				onStylesUpdate: presenter.onStylesUpdate.bind(presenter)
			};
		}
	};
})($);