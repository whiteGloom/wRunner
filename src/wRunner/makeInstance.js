import Model from './Model/Model/Model';
import ModelConfigDefaults from './Model/ConfigDefaults/ConfigDefaults';
import View from './View/MainView/MainView';
import Presenter from './Presenter/Presenter';

function makeInstance(userOptions = {}) {
  const model = new Model();
  const modelConfigDefaults = new ModelConfigDefaults();

  const view = new View();
  const presenter = new Presenter({ model, modelConfigDefaults, view, userOptions });

  return presenter.getPublicMethods();
}

export default makeInstance;
