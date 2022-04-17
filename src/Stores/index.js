import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas';

import { reducer as SuperUserReducer } from './SuperUser/Reducers';

export { default as SuperUserActions } from './SuperUser/Actions';


export default () => {
  const rootReducer = combineReducers({
    superUser: SuperUserReducer, 
  });
  return configureStore(rootReducer, rootSaga);
};