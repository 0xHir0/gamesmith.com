/*
 * Recruiter People sagas
 */


import { take, call, put } from 'redux-saga/effects';

import {
  getAuthToken,
  checkAuthToken,
  makeRequest,
} from 'utils';

import {
  CONTACT_DETAIL_COUNT_REQUEST,
} from './constants';

import {
  getContactDetailCountSuccess,
} from './actions';

import { openExceedRecruiterSearchLimit } from '../Modals/actions';
import { CREATE_ACCOUNT_REQUEST } from '../SignUp/constants';
import { STUDIO_HUB_REQUEST } from '../App/constants';

function* getContactDetailCountRequestWatcher() {
  while (true) {
    const { payload: { resolve, reject } } = yield take(CONTACT_DETAIL_COUNT_REQUEST);
    if (checkAuthToken()) {
      const { token } = yield call(getAuthToken);
      try {
        const req = yield call(makeRequest, 'GET',
          {},
          'getContactDetailView',
          { 'X-Auth-Token': token, Pragma: 'no-cache' });
        yield call(resolve);
        if (req.data.status === 'ok') {
          yield put(getContactDetailCountSuccess(req.data.success));
        } else {
          yield put(getContactDetailCountSuccess(req.data.success));
          // yield put(openExceedRecruiterSearchLimit({ message: "Let's look at a plan that suits your business needs." }));
        }
      } catch (e) {

      }
    }
  }
}

export default [
  getContactDetailCountRequestWatcher,
];
