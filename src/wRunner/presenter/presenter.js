import { boundMethod } from 'autobind-decorator';
import ModelDefaults from '../model/modelDefaults/modelDefaults';

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
  typeUpdateEventHandler() {
    this.view.updateDOM(this.model.getType());
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
    this.model.recalculateValue();
  }

  @boundMethod
  limitsUpdateEventHandler() {
    this.model.recalculateValue();
  }

  @boundMethod
  stepUpdateEventHandler() {
    this.model.recalculateValue();
  }

  @boundMethod
  valueUpdateEventHandler() {
    this.view.drawValue(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  rootsUpdateEventHandler() {
    this.view.append(this.model.roots);
    this.view.drawValue(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  themeUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.drawValue(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  directionUpdateEventHandler() {
    this.view.applyStyles([this.model.theme, this.model.direction]);
    this.view.drawValue(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  valueNotesDisplayUpdateEventHandler() {
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
    this.view.drawValue(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  scaleDivisionsCountUpdateEventHandler() {
    this.view.generateScaleDivisions(this.model.getScaleDivisionsCount());
    this.view.applyStyles([this.model.theme, this.model.direction]);
  }

  @boundMethod
  windowResizeEventHandler() {
    this.view.drawValue(
      this.model.getValues(),
      this.model.getLimits(),
      this.model.getDirection(),
      this.model.getType(),
      this.model.getValueNotesMode(),
    );
  }

  @boundMethod
  UIActionMouseDownHandler(event) {
    this.view.handlerMouseDownAction(event, this.model.getDirection());
  }

  @boundMethod
  UIValueActionHandler(data) {
    this.model.setNearestValue(data);
  }

  @boundMethod
  valueNoteModeUpdateEventHandler(value) {
    this.model.setValueNotesMode(value);
    this.view.applyValueNotesDisplay(
      this.model.getValueNotesDisplay(),
      this.model.getValueNotesMode(),
    );
  }

  applyDefaultEvents() {
    // Model events
    this.model.typeUpdateEvent
      .addHandler(this.typeUpdateEventHandler);
    this.model.limitsUpdateEvent
      .addHandler(this.limitsUpdateEventHandler);
    this.model.stepUpdateEvent
      .addHandler(this.stepUpdateEventHandler);
    this.model.valueUpdateEvent
      .addHandler(this.valueUpdateEventHandler);
    this.model.rootsUpdateEvent
      .addHandler(this.rootsUpdateEventHandler);
    this.model.themeUpdateEvent
      .addHandler(this.themeUpdateEventHandler);
    this.model.directionUpdateEvent
      .addHandler(this.directionUpdateEventHandler);
    this.model.valueNotesDisplayUpdateEvent
      .addHandler(this.valueNotesDisplayUpdateEventHandler);
    this.model.scaleDivisionsCountUpdateEvent
      .addHandler(this.scaleDivisionsCountUpdateEventHandler);

    this.view.valueNoteModeUpdateEvent
      .addHandler(this.valueNoteModeUpdateEventHandler);
    this.view.windowResizeEvent
      .addHandler(this.windowResizeEventHandler);
    this.view.UIActionMouseDown
      .addHandler(this.UIActionMouseDownHandler);
    this.view.UIValueAction
      .addHandler(this.UIValueActionHandler);
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
