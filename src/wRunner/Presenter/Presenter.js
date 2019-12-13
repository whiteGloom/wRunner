import { boundMethod } from 'autobind-decorator';

class Presenter {
  constructor({
    userOptions,
    model,
    modelDefaults,
    view,
  }) {
    const combinedOptions = { ...modelDefaults.getOptionsPresets(), ...userOptions };

    this.model = model;
    this.view = view;

    this._applyDefaultEvents();
    this._applyUserEvents(combinedOptions);
    this._applyUserOptions(combinedOptions);
  }

  getPublicMethods() {
    return {
      setType: this.model.setType,
      setLimits: this.model.setLimits,
      setStep: this.model.setStep,
      setSingleValue: this.model.setSingleValue,
      setRangeValues: this.model.setRangeValues,
      setNearestValue: this.model.setNearestValue,
      setRoots: this.model.setRoots,
      setTheme: this.model.setTheme,
      setDirection: this.model.setDirection,
      setValueNotesDisplay: this.model.setValueNotesDisplay,
      setScaleDivisionsCount: this.model.setScaleDivisionsCount,

      getType: this.model.getType,
      getLimits: this.model.getLimits,
      getStep: this.model.getStep,
      getValues: this.model.getValues,
      getRoots: this.model.getRoots,
      getTheme: this.model.getTheme,
      getDirection: this.model.getDirection,
      getValueNotesDisplay: this.model.getValueNotesDisplay,
      getScaleDivisionsCount: this.model.getScaleDivisionsCount,

      onThemeUpdate: this.model.themeUpdateEvent.addHandler,
      onDirectionUpdate: this.model.directionUpdateEvent.addHandler,
      onValueNotesDisplayUpdate: this.model.valueNotesDisplayUpdateEvent.addHandler,
      onRootsUpdate: this.model.rootsUpdateEvent.addHandler,
      onScaleDivisionsCountUpdate: this.model.scaleDivisionsCountUpdateEvent.addHandler,
      onValueUpdate: this.model.valueUpdateEvent.addHandler,
      onStepUpdate: this.model.stepUpdateEvent.addHandler,
      onLimitsUpdate: this.model.limitsUpdateEvent.addHandler,
      onTypeUpdate: this.model.typeUpdateEvent.addHandler,
    };
  }

  @boundMethod
  _typeUpdateEventHandler() {
    this.view.updateDOM(this.model.getType());
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
    this.model.recalculateValue();
  }

  @boundMethod
  _limitsUpdateEventHandler() {
    this.model.recalculateValue();
  }

  @boundMethod
  _stepUpdateEventHandler() {
    this.model.setLimits();
    this.model.recalculateValue();
  }

  @boundMethod
  _valueUpdateEventHandler() {
    this.view.setPositions(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  _rootsUpdateEventHandler() {
    this.view.append(this.model.roots);
    this.view.setPositions(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  _themeUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.setPositions(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  _directionUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.setPositions(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  _valueNotesDisplayUpdateEventHandler() {
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
    this.view.setPositions(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  _scaleDivisionsCountUpdateEventHandler() {
    this.view.updateScaleDivisions(this.model.getScaleDivisionsCount());
    this.view.applyStyles([this.model.theme, this.model.direction]);
  }

  @boundMethod
  _windowResizeEventHandler() {
    this.view.setPositions(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  _trackMousedownEventHandler(event) {
    this.view.handleMouseAction(event, this.model.getDirection());
  }

  @boundMethod
  _actionPositionCalculatedHandler(data) {
    this.model.setNearestValue(data);
  }

  @boundMethod
  _valueNoteModeUpdateEventHandler(value) {
    this.model.setValueNotesMode(value);
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
  }

  _applyDefaultEvents() {
    this.model.typeUpdateEvent
      .addHandler(this._typeUpdateEventHandler);
    this.model.limitsUpdateEvent
      .addHandler(this._limitsUpdateEventHandler);
    this.model.stepUpdateEvent
      .addHandler(this._stepUpdateEventHandler);
    this.model.valueUpdateEvent
      .addHandler(this._valueUpdateEventHandler);
    this.model.rootsUpdateEvent
      .addHandler(this._rootsUpdateEventHandler);
    this.model.themeUpdateEvent
      .addHandler(this._themeUpdateEventHandler);
    this.model.directionUpdateEvent
      .addHandler(this._directionUpdateEventHandler);
    this.model.valueNotesDisplayUpdateEvent
      .addHandler(this._valueNotesDisplayUpdateEventHandler);
    this.model.scaleDivisionsCountUpdateEvent
      .addHandler(this._scaleDivisionsCountUpdateEventHandler);

    this.view.valueNoteModeUpdateEvent
      .addHandler(this._valueNoteModeUpdateEventHandler);
    this.view.windowResizeEvent
      .addHandler(this._windowResizeEventHandler);
    this.view.trackMousedownEvent
      .addHandler(this._trackMousedownEventHandler);
    this.view.actionPositionCalculatedEvent
      .addHandler(this._actionPositionCalculatedHandler);
  }

  _applyUserEvents(options = {}) {
    const {
      onTypeUpdate,
      onLimitsUpdate,
      onStepUpdate,
      onValueUpdate,
      onRootsUpdate,
      onThemeUpdate,
      onDirectionUpdate,
      onScaleDivisionsCountUpdate,
      onValueNotesDisplayUpdate,
    } = options;

    this.model.typeUpdateEvent.addHandler(onTypeUpdate);
    this.model.limitsUpdateEvent.addHandler(onLimitsUpdate);
    this.model.stepUpdateEvent.addHandler(onStepUpdate);
    this.model.valueUpdateEvent.addHandler(onValueUpdate);
    this.model.rootsUpdateEvent.addHandler(onRootsUpdate);
    this.model.themeUpdateEvent.addHandler(onThemeUpdate);
    this.model.directionUpdateEvent.addHandler(onDirectionUpdate);
    this.model.scaleDivisionsCountUpdateEvent.addHandler(onScaleDivisionsCountUpdate);
    this.model.valueNotesDisplayUpdateEvent.addHandler(onValueNotesDisplayUpdate);
  }

  _applyUserOptions(options = {}) {
    const {
      type,
      limits,
      step,
      singleValue,
      rangeValues,
      roots,
      theme,
      direction,
      scaleDivisionsCount,
      valueNotesDisplay,
    } = options;

    this.model.setRoots(roots);
    this.model.setValueNotesDisplay(valueNotesDisplay);
    this.model.setScaleDivisionsCount(scaleDivisionsCount);
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
