/*
 * Verify sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { push, replace } from 'react-router-redux';

import {
  makeRequest,
  checkAuthToken,
  getAuthToken,
  removeAuthToken,
  getUserData,
  removeUserData,
} from 'utils';

import {
  VERIFY_REQUEST,
} from './constants';

import {
  verifySuccess,
  verifyError,
} from './actions';
import { openMessage } from 'containers/Modals/actions';

// watcher for maker verify requests
function* verifyRequestWatcher() {
  while (true) {
    const { payload: { id, decision } } = yield take(VERIFY_REQUEST);
    try {
      if (checkAuthToken()) {
        const { id: makerId } = yield call(getUserData);
        const { token } = yield call(getAuthToken);
        // verify game credit
        yield call(makeRequest, 'POST', {}, `gamecredit/verify/${decision}/${id}`, {
          'X-Auth-Token': token,
        });
        // if decision is no, delete credit
        if (decision === 'no') {
          yield call(makeRequest, 'POST', {}, `gamecredit/delete/${makerId}/${id}`, {
            'X-Auth-Token': token,
          });
        }
        yield put(verifySuccess(`Game ${id} verified`));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(verifyError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      if (window.opener) {
        window.opener.location = '/?error';
        window.close();
      } else {
        yield put(openMessage('Error', 'There was an error in processing your request.'));
        yield put(push('/'));
      }
    }
  }
}

export default [
  verifyRequestWatcher,
];
