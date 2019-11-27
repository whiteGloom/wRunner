import ModelModule from './model/model';
import ViewModule from './view/view';
import PresenterModule from './presenter/presenter';

import { ModelPublicks } from './model/model.defaults';
import { ViewPublicks } from './view/view.defaults';

function makeInstance(userOptions = {}) {
  const modelPublicks = new ModelPublicks();
  const viewPublicks = new ViewPublicks();
  const options = { ...modelPublicks, ...viewPublicks, ...userOptions };

  const model = new ModelModule();
  const view = new ViewModule();
  const presenter = new PresenterModule({ model, view, userOptions: options });

  return presenter.getPublicMethods();
}

export default makeInstance;
