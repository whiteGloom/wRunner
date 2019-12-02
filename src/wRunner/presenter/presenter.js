import ModelDefaults from '../model/model.defaults';

class Presenter {
  constructor(options = {}) {
    const { userOptions, model, view } = options;

    const modelDefaults = new ModelDefaults();
    const combinedOptions = { ...modelDefaults.getOptionsPresets(), ...userOptions };

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
      setRangeValues: this.model.setRangeValues.bind(this.model),
      setNearestValue: this.model.setNearestValue.bind(this.model),
      setRoots: this.model.setRoots.bind(this.model),
      setTheme: this.model.setTheme.bind(this.model),
      setDirection: this.model.setDirection.bind(this.model),
      setValueNotesDisplay: this.model.setValueNotesDisplay.bind(this.model),
      setDivisionsCount: this.model.setDivisionsCount.bind(this.model),
      
      getType: this.model.getType.bind(this.model),
      getLimits: this.model.getLimits.bind(this.model),
      getStep: this.model.getStep.bind(this.model),
      getValues: this.model.getValues.bind(this.model),
      getRoots: this.model.getRoots.bind(this.model),
      getTheme: this.model.getTheme.bind(this.model),
      getDirection: this.model.getDirection.bind(this.model),
      getValueNotesDisplay: this.model.getValueNotesDisplay.bind(this.model),
      getDivisionsCount: this.model.getDivisionsCount.bind(this.model),

      onThemeUpdate: this.model.themeUpdateEvent.addHandler,
      onDirectionUpdate: this.model.directionUpdateEvent.addHandler,
      onValueNotesDisplayUpdate: this.model.valueNotesDisplayUpdateEvent.addHandler,
      onRootsUpdate: this.model.rootsUpdateEvent.addHandler,
      onDivisionsCountUpdate: this.model.divisionsCountUpdateEvent.addHandler,
      onValueUpdate: this.model.valueUpdateEvent.addHandler,
      onStepUpdate: this.model.stepUpdateEvent.addHandler,
      onLimitsUpdate: this.model.limitsUpdateEvent.addHandler,
      onTypeUpdate: this.model.typeUpdateEvent.addHandler,
    };
  }

  typeUpdateEventHandler() {
    this.view.updateDOM(this.model.getType());
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(), this.model.getValueNotesMode());
    this.model.recalculateValue();
  }

  limitsUpdateEventHandler() {
    this.model.recalculateValue();
  }

  stepUpdateEventHandler() {
    this.model.recalculateValue();
  }

  valueUpdateEventHandler() {
    this.view.drawValue(this.model.getValues(), this.model.getLimits(), this.model.getDirection(), this.model.getType(), this.model.getValueNotesMode());
  }

  rootsUpdateEventHandler() {
    this.view.append(this.model.roots);
    this.view.drawValue(this.model.getValues(), this.model.getLimits(), this.model.getDirection(), this.model.getType(), this.model.getValueNotesMode());
  }

  themeUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.drawValue(this.model.getValues(), this.model.getLimits(), this.model.getDirection(), this.model.getType(), this.model.getValueNotesMode());
  }

  directionUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.drawValue(this.model.getValues(), this.model.getLimits(), this.model.getDirection(), this.model.getType(), this.model.getValueNotesMode());
  }

  valueNotesDisplayUpdateEventHandler() {
    this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(), this.model.getValueNotesMode());
    this.view.drawValue(this.model.getValues(), this.model.getLimits(), this.model.getDirection(), this.model.getType(), this.model.getValueNotesMode());
  }

  divisionsCountUpdateEventHandler() {
    this.view.generateDivisions(this.model.getDivisionsCount());
    this.view.applyStyles([this.model.theme, this.model.direction]);
  }

  windowResizeEventHandler() {
    this.view.drawValue(this.model.getValues(), this.model.getLimits(), this.model.getDirection(), this.model.getType(), this.model.getValueNotesMode());
  }

  UIActionMouseDownHandler(event) {
    this.view.handlerMouseDownAction(event, this.model.getDirection());
  }

  UIValueActionHandler(data) {
    this.model.setNearestValue(data);
  }

  valueNoteModeUpdateEventHandler(value) {
    this.model.setValueNotesMode(value);
    this.view.applyValueNotesDisplay(this.model.getValueNotesDisplay(), this.model.getValueNotesMode());
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
    this.model.rootsUpdateEvent
      .addHandler(this.rootsUpdateEventHandler.bind(this));
    this.model.themeUpdateEvent
      .addHandler(this.themeUpdateEventHandler.bind(this));
    this.model.directionUpdateEvent
      .addHandler(this.directionUpdateEventHandler.bind(this));
    this.model.valueNotesDisplayUpdateEvent
      .addHandler(this.valueNotesDisplayUpdateEventHandler.bind(this));
    this.model.divisionsCountUpdateEvent
      .addHandler(this.divisionsCountUpdateEventHandler.bind(this));

    this.view.valueNoteModeUpdateEvent
      .addHandler(this.valueNoteModeUpdateEventHandler.bind(this));
    this.view.windowResizeEvent
      .addHandler(this.windowResizeEventHandler.bind(this));
    this.view.UIActionMouseDown
      .addHandler(this.UIActionMouseDownHandler.bind(this));
    this.view.UIValueAction
      .addHandler(this.UIValueActionHandler.bind(this));
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
      onValueNotesDisplayUpdate,
    } = options;

    this.model.typeUpdateEvent.addHandler(onTypeUpdate);
    this.model.limitsUpdateEvent.addHandler(onLimitsUpdate);
    this.model.stepUpdateEvent.addHandler(onStepUpdate);
    this.model.valueUpdateEvent.addHandler(onValueUpdate);
    this.model.rootsUpdateEvent.addHandler(onRootsUpdate);
    this.model.themeUpdateEvent.addHandler(onThemeUpdate);
    this.model.directionUpdateEvent.addHandler(onDirectionUpdate);
    this.model.divisionsCountUpdateEvent.addHandler(onDivisionsCountUpdate);
    this.model.valueNotesDisplayUpdateEvent.addHandler(onValueNotesDisplayUpdate);
  }

  applyUserOptions(options = {}) {
    const {
      type,
      limits,
      step,
      singleValue,
      rangeValues,
      roots,
      theme,
      direction,
      divisionsCount,
      valueNotesDisplay,
    } = options;

    this.model.setRoots(roots);
    this.model.setValueNotesDisplay(valueNotesDisplay);
    this.model.setDivisionsCount(divisionsCount);
    this.model.setTheme(theme);
    this.model.setDirection(direction);
    this.model.setLimits(limits);
    this.model.setStep(step);
    this.model.setType(type);
    this.model.setSingleValue(singleValue);
    this.model.setRangeValues(rangeValues);
  }
}

export default Presenter;
