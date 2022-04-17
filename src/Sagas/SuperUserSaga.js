import { put, call, select } from 'redux-saga/effects';

import {
     SuperUserActions,
} from 'src/Stores';
import { Handler, SuperUser } from 'src/apis';
import { showMessage } from 'src/utils/message';

// 讀取
export function* getSuperUserList({ callback, paging = {now_page: 1}, search = '', }) {
    try {
        const token = yield select((state) => state.user.Token);

        // yield是來自redux，常用的是yield.call, yield.put
        // 定義資料為res(result)。
        const { data: res } = yield call(
            // call會傳入兩個值：
            // 1. api的method(以及帶入會用到的參數，常用的ex:data, token, ContentType)
            Handler.get({ Authorization: token }),
            // 2. api的路徑(url)
            SuperUser.getSuperUserList(paging, search),
        );
        // 寫判斷是看res的status是否為200或success是否為true，是則為成功。
        if (res.success === true) {
            // 將action的function的data寫回reducer存入。
            // 做成功的那個action，拿到需要的後端資料。
            // 因為後端回傳是data裡的list，所以用data.list。
            yield put(SuperUserActions.getSuperUserListSuccess(res.data.list, res.paging));
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}

// 新增
export function* createSuperUser({ payload, callback, paging = {now_page: 1} , search = ''}) {
    try {
        const token = yield select((state) => state.user.Token);

        // yield是來自redux，常用的是yield.call, yield.put
        // 定義資料為res(result)。
        const { data: res } = yield call(
            // call會傳入兩個值：
            // 1. api的method(以及帶入會用到的參數，常用的ex:data, token, ContentType)
            Handler.post({ data: payload, Authorization: token }),
            // 2. api的路徑(url)
            SuperUser.createSuperUser(paging, search),
        );
        // 寫判斷是看res的status是否為200或success是否為true，是則為成功。
        if (res.success === true) {
            showMessage({ content: '新增成功' });
            // 將action的function的data寫回reducer存入。
            yield put(SuperUserActions.getSuperUserList());
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}

// 修改（更新）
export function* updateSuperUser({ payload, callback, paging = {now_page: 1} , search = ''}) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token }),
            SuperUser.updateSuperUser(),
        );
        if (res.success === true) {
            showMessage({ content: '更新成功' });
            yield put(SuperUserActions.getSuperUserList(callback, paging, search));
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}

// 刪除
export function* deleteSuperUser({ id, callback, paging = {now_page: 1} }) {
    try {
        const token = yield select((state) => state.user.Token);

        // yield是來自redux，常用的是yield.call, yield.put
        // 定義資料為res(result)。
        const { data: res } = yield call(
            // call會傳入兩個值：
            // 1. api的method(以及帶入會用到的參數，常用的ex:data, token, ContentType)
            Handler.delete({ data: id, Authorization: token }),
            // 2. api的路徑(url)
            SuperUser.deleteSuperUser(id),
        );
        // 寫判斷是看res的status是否為200或success是否為true，是則為成功。
        if (res.success === true) {
            showMessage({ content: '刪除成功' });
            // 將action的function的data寫回reducer存入。
            yield put(SuperUserActions.getSuperUserList(callback, paging));
        }
    } catch (err) {
        console.log('err', err);
    } finally {
        if (callback) { callback() }
    }
}