// /**
//  * Reducers specify how the application's state changes in response to actions sent to the store.
//  *
//  * @see https://redux.js.org/basics/reducers
//  */
import { INITIAL_STATE } from './InitialState';
import { createReducer } from 'reduxsauce';
import { SuperUserTypes } from './Actions';

export const setToken = (state, { token }) => ({
  ...state,
  Token: token,
});

export const getSuperUserListSuccess = (state, { payload, paging }) => {
  let temp = [];
  payload.map((item) => {
    if( item.role_id !== 'M001' ) {
      temp.push(item);
    }else{
      temp.push(item);
    }
  })

  // 將回傳的頁碼總數 改以整理過的資料長度呈現
  let currentPaging = {
    ...paging,
    total: temp.length,
  };


  return {
    ...state,
    list: temp,
    paging: currentPaging,
  }
};

export const reducer = createReducer(INITIAL_STATE, {
  [SuperUserTypes.SET_TOKEN]: setToken,
  [SuperUserTypes.GET_SUPER_USER_LIST_SUCCESS]: getSuperUserListSuccess,
});
