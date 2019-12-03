import ModelModule from './Model/ModelMain/ModelMain';
import ModelDefaults from './Model/ModelDefaults/ModelDefaults';
import ViewModule from './View/View';
import PresenterModule from './Presenter/Presenter';

function makeInstance(userOptions = {}) {
  const model = new ModelModule();
  const modelDefaults = new ModelDefaults();
  const view = new ViewModule();
  const presenter = new PresenterModule({ model, modelDefaults, view, userOptions });

  return presenter.getPublicMethods();
}

export default makeInstance;
