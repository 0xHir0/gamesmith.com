/*
 * Jobs sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  EMPLOYER_APPLY_REQUEST
} from './constants';

import {
  openMessage,
} from 'containers/Modals/actions';
import {
  applyAsEmployerRequest
} from './actions';

// watcher for applying
function* applyAsEmployerRequestWatcher() {
  while (true) {
    const { payload: { values: { company, first_name, last_name, email, phone }, resolve, reject} } = yield take(EMPLOYER_APPLY_REQUEST);
    try {
        // request the message api
      const req = yield call(makeRequest, 'POST', {
        company: company,
        name: first_name + " " + last_name,
        email: email,
        phone: phone
      }, 'applyAsEmployer', {});
      // if successful resolve the form and show confirmation
      yield call(resolve);
      yield put(openMessage('Many thanks for your interest. All applications are responded to within 24 hours.', 'blank'));
    } catch (e) {
      yield call(reject, { message: 'Could not send message.' });
    }
  }
}

export default [
  applyAsEmployerRequestWatcher
];
