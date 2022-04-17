import { takeLatest, all } from 'redux-saga/effects';

// 1. import saga本身
import * as SuperUserSaga from './SuperUserSaga';

// 2. import action的type
import { SuperUserTypes } from '../Stores/SuperUser/Actions';

export default function* root() {
  yield all([
    takeLatest(SuperUserTypes.GET_SUPER_USER_LIST, SuperUserSaga.getSuperUserList),
    takeLatest(SuperUserTypes.CREATE_SUPER_USER, SuperUserSaga.createSuperUser),
    takeLatest(SuperUserTypes.UPDATE_SUPER_USER, SuperUserSaga.updateSuperUser),
    takeLatest(SuperUserTypes.DELETE_SUPER_USER, SuperUserSaga.deleteSuperUser),

  ]);
};