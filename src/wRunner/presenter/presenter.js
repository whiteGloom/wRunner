import { ModelPublicks } from '../model/model.defaults';
import { ViewPublicks } from '../view/view.defaults';

class Presenter {
  constructor(options = {}) {
    const { userOptions, model, view } = options;

    const modelPublicks = new ModelPublicks();
    const viewPublicks = new ViewPublicks();
    const combinedOptions = { ...modelPublicks, ...viewPublicks, ...userOptions };

    this.model = model;
    this.view = view;

    // Plugin load
    this.applyDefaultEvents();
    this.applyUserEvents(combinedOptions);
    this.applyUserOptions(combinedOptions);
  }


  getPublicMethods() {
    return {
      setType: this.model.setType.bind(this.model),
      setLimits: this.model.setLimits.bind(this.model),
      setStep: this.model.setStep.bind(this.model),
      setSingleValue: this.model.setSingleValue.bind(this.model),
      setRangeValue: this.model.setRangeValue.bind(this.model),
      setNearestValue: this.model.setNearestValue.bind(this.model),
      getType: this.model.getType.bind(this.model),
      getLimits: this.model.getLimits.bind(this.model),
      getStep: this.model.getStep.bind(this.model),
      getValue: this.model.getValue.bind(this.model),
      onValueUpdate: this.model.valueUpdateEvent.addHandler,
      onStepUpdate: this.model.stepUpdateEvent.addHandler,
      onLimitsUpdate: this.model.limitsUpdateEvent.addHandler,
      onTypeUpdate: this.model.typeUpdateEvent.addHandler,

      setRoots: this.view.setRoots.bind(this.view),
      setTheme: this.view.setTheme.bind(this.view),
      setDirection: this.view.setDirection.bind(this.view),
      setValueNoteDisplay: this.view.setValueNoteDisplay.bind(this.view),
      setDivisionsCount: this.view.setDivisionsCount.bind(this.view),
      getRoots: this.view.getRoots.bind(this.view),
      getTheme: this.view.getTheme.bind(this.view),
      getDirection: this.view.getDirection.bind(this.view),
      getValueNoteDisplay: this.view.getValueNoteDisplay.bind(this.view),
      getDivisionsCount: this.view.getDivisionsCount.bind(this.view),
      onThemeUpdate: this.view.themeUpdateEvent.addHandler,
      onDirectionUpdate: this.view.directionUpdateEvent.addHandler,
      onValueNoteDisplayUpdate: this.view.valueNoteDisplayUpdateEvent.addHandler,
      onRootsUpdate: this.view.rootsUpdateEvent.addHandler,
      onDivisionsCountUpdate: this.view.divisionsCountUpdateEvent.addHandler,
    };
  }

  typeUpdateEventHandler() {
    this.view.updateDOM(this.model.getType());
    this.model.recalculateValue();
    this.view.applyValueNoteDisplay();
  }

  limitsUpdateEventHandler() {
    this.model.recalculateValue();
  }

  stepUpdateEventHandler() {
    this.model.recalculateValue();
  }

  valueUpdateEventHandler() {
    this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
  }

  rootsUpdateEventHandler() {
    this.view.append();
    this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
  }

  UIMouseActionEventHandler(data) {
    this.model.setNearestValue(data);
  }

  themeUpdateEventHandler() {
    this.view.applyStyles();
    this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
  }

  directionUpdateEventHandler() {
    this.view.applyStyles();
    this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
  }

  valueNoteDisplayUpdateEventHandler() {
    this.view.applyValueNoteDisplay();
  }

  divisionsCountUpdateEventHandler() {
    this.view.generateDivisions();
    this.view.applyStyles();
  }

  valueNoteRangeModeUpdateEventHandler() {
    this.view.applyValueNoteDisplay();
  }

  windowResizeEventHandler() {
    this.view.drawValue(this.model.getValue(), this.model.getLimits(), this.model.getType());
  }

  applyDefaultEvents() {
    // Model events
    this.model.typeUpdateEvent
      .addHandler(this.typeUpdateEventHandler.bind(this));
    this.model.limitsUpdateEvent
      .addHandler(this.limitsUpdateEventHandler.bind(this));
    this.model.stepUpdateEvent
      .addHandler(this.stepUpdateEventHandler.bind(this));
    this.model.valueUpdateEvent
      .addHandler(this.valueUpdateEventHandler.bind(this));

    // View events
    this.view.rootsUpdateEvent
      .addHandler(this.rootsUpdateEventHandler.bind(this));
    this.view.UIMouseActionEvent
      .addHandler(this.UIMouseActionEventHandler.bind(this));
    this.view.themeUpdateEvent
      .addHandler(this.themeUpdateEventHandler.bind(this));
    this.view.directionUpdateEvent
      .addHandler(this.directionUpdateEventHandler.bind(this));
    this.view.valueNoteDisplayUpdateEvent
      .addHandler(this.valueNoteDisplayUpdateEventHandler.bind(this));
    this.view.divisionsCountUpdateEvent
      .addHandler(this.divisionsCountUpdateEventHandler.bind(this));
    this.view.valueNoteRangeModeUpdateEvent
      .addHandler(this.valueNoteRangeModeUpdateEventHandler.bind(this));
    this.view.windowResizeEvent
      .addHandler(this.windowResizeEventHandler.bind(this));
  }

  applyUserEvents(options = {}) {
    const {
      onTypeUpdate,
      onLimitsUpdate,
      onStepUpdate,
      onValueUpdate,
      onRootsUpdate,
      onThemeUpdate,
      onDirectionUpdate,
      onDivisionsCountUpdate,
      onValueNoteDisplayUpdate,
    } = options;

    this.model.typeUpdateEvent.addHandler(onTypeUpdate);
    this.model.limitsUpdateEvent.addHandler(onLimitsUpdate);
    this.model.stepUpdateEvent.addHandler(onStepUpdate);
    this.model.valueUpdateEvent.addHandler(onValueUpdate);
    this.view.rootsUpdateEvent.addHandler(onRootsUpdate);
    this.view.themeUpdateEvent.addHandler(onThemeUpdate);
    this.view.directionUpdateEvent.addHandler(onDirectionUpdate);
    this.view.divisionsCountUpdateEvent.addHandler(onDivisionsCountUpdate);
    this.view.valueNoteDisplayUpdateEvent.addHandler(onValueNoteDisplayUpdate);
  }

  applyUserOptions(options = {}) {
    const {
      type,
      limits,
      step,
      singleValue,
      rangeValue,
      roots,
      theme,
      direction,
      divisionsCount,
      valueNoteDisplay,
    } = options;

    this.model.setType(type);
    this.model.setLimits(limits);
    this.model.setStep(step);
    this.model.setSingleValue(singleValue);
    this.model.setRangeValue(rangeValue);

    this.view.setRoots(roots);
    this.view.setTheme(theme);
    this.view.setDirection(direction);
    this.view.setDivisionsCount(divisionsCount);
    this.view.setValueNoteDisplay(valueNoteDisplay);
  }
}

export default Presenter;
