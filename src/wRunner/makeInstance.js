import ModelModule from './model/model';
import ViewModule from './view/view';
import PresenterModule from './presenter/presenter';

function makeInstance(userOptions = {}) {
  const model = new ModelModule();
  const view = new ViewModule();
  const presenter = new PresenterModule({ model, view, userOptions });

  return presenter.getPublicMethods();
}

export default makeInstance;
