import { boundMethod } from 'autobind-decorator';

class Presenter {
  constructor({
    userOptions,
    model,
    modelConfigDefaults,
    view,
  }) {
    const combinedOptions = { ...modelConfigDefaults.getOptionsPresets(), ...userOptions };

    this.model = model;
    this.view = view;

    this._init(combinedOptions);
  }

  getPublicMethods() {
    return this.model.getPublicMethods();
  }

  _updatePositions() {
    this.view.setPositions({
      values: this.model.getValues(),
      limits: this.model.getLimits(),
      direction: this.model.getDirection(),
      type: this.model.getType(),
      valueNotesMode: this.model.getValueNotesMode(),
    });
  }

  @boundMethod
  _valueUpdateEventHandler() {
    this._updatePositions();
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
  _rootsUpdateEventHandler() {
    this.view.append(this.model.roots);
    this._updatePositions();
  }

  @boundMethod
  _themeUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this._updatePositions();
  }

  @boundMethod
  _directionUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this._updatePositions();
  }

  @boundMethod
  _valueNotesDisplayUpdateEventHandler() {
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
    this._updatePositions();
  }

  @boundMethod
  _scaleDivisionsCountUpdateEventHandler() {
    this.view.updateScaleDivisions(this.model.getScaleDivisionsCount());
    this.view.applyStyles([this.model.theme, this.model.direction]);
  }

  @boundMethod
  _windowResizeEventHandler() {
    this._updatePositions();
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
  _valueNotesModeUpdateEventHandler(value) {
    this.model.setValueNotesMode(value);
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
  }

  _applyDefaultEventHandlers() {
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

    this.view.valueNotesModeUpdateEvent
      .addHandler(this._valueNotesModeUpdateEventHandler);
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
      isValueNotesDisplayed,
    } = options;

    this.model.setRoots(roots);
    this.model.setValueNotesDisplay(isValueNotesDisplayed);
    this.model.setScaleDivisionsCount(scaleDivisionsCount);
    this.model.setTheme(theme);
    this.model.setDirection(direction);
    this.model.setLimits(limits);
    this.model.setStep(step);
    this.model.setType(type);
    this.model.setSingleValue(singleValue);
    this.model.setRangeValues(rangeValues);
  }

  _init(options) {
    this._applyDefaultEventHandlers();
    this._applyUserEvents(options);
    this._applyUserOptions(options);
  }
}

export default Presenter;
