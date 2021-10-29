/*
 * Unsubscribe sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { push } from 'react-router-redux';

import {
  makeRequest,
  FRONTEND_URI,
} from 'utils';

import {
  UNSUBSCRIBE_REQUEST,
} from './constants';

import { openMessage, closeModal } from 'containers/Modals/actions';

// watcher for Unsubscribe requests
function* unsubscribeRequestWatcher() {
  while (true) {
    const { payload: { code } } = yield take(UNSUBSCRIBE_REQUEST);
    try {
      const req = yield call(makeRequest, 'GET', {}, `unsubscribe/${code}`);
      // close modal
      yield put(closeModal());
      // open success message
      yield put(openMessage('Success', 'Successfully unsubscribe emails from gamesmith.'));
      yield put(push('/'));
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      yield put(openMessage('Error', 'Can not found account associated with this link'));
      yield put(push('/'));
    }
  }
}

export default [
  unsubscribeRequestWatcher,
];
