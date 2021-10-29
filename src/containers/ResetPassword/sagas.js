/*
 * Reset Password Sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { push } from 'react-router-redux';

import {
  makeRequest,
  getUserData,
  setUserData,
  setAuthToken,
  getAuthToken,
} from 'utils';

import {
  RESET_PASSWORD_REQUEST,
} from './constants';

import { openMessage, openResetPassword } from 'containers/Modals/actions';

// watcher for reset password requests
function* resetPasswordRequestWatcher() {
  while (true) {
    const { payload: { email, code, setPassword } } = yield take(RESET_PASSWORD_REQUEST);
    try {

      // login user
      const req = yield call(makeRequest, 'POST', {
        identifier: email,
        password: code,
      }, 'login');

      yield call(setAuthToken, req.data);

      const { token } = yield call(getAuthToken);

      // get user data from api
      const user = yield call(makeRequest, 'GET', {}, 'me', {
        'X-Auth-Token': token,
      });
      localStorage.setItem('resetpassword', 'true');
      // set user data to local storage
      yield call(setUserData, user.data);

      yield put(openResetPassword(setPassword));
      yield put(push('/'));

    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      yield put(openMessage('Error', 'Please click on the link provided in the email. If that does not work, try requesting another reset link.'));
      yield put(push('/'));
    }
  }
}

export default [
  resetPasswordRequestWatcher,
];
