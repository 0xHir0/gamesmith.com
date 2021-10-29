/*
 * Job sagas
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
  openMessage,
} from 'containers/Modals/actions';

import {
  JOB_REQUEST,
  APPLY_JOB_REQUEST,
} from './constants';

import {
  jobSuccess,
  jobError,
  applyJobSuccess,
  applyJobError,
} from './actions';


// watcher for jobcard requests
function* jobRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(JOB_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, `jobcard/${id}`, {
          'X-Auth-Token': token,
        });
        req.data.workCategories = req.data.workCategories.map(i => ({ id: i, value: id.toString() }));
        req.data.expiredAt = req.data.jobCardDetails.expiredAt;
        yield put(jobSuccess(req.data));
      } else {
        const req = yield call(makeRequest, 'GET', {}, `jobcard/${id}`, {});
        req.data.workCategories = req.data.workCategories.map(i => ({ id: i, value: id.toString() }));
        req.data.expiredAt = req.data.jobCardDetails.expiredAt;

        yield put(jobSuccess(req.data));
        // if expired remove token and user data
        // yield call(removeAuthToken);
        // yield call(removeUserData);
        // // redirect user to Home and show the unauthorized message
        // yield put(jobError('Login credentials have expired'));
        // yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(jobError(e));
      yield put(replace('/error'));
    }
  }
}

// watcher for apply to job requests
function* applyJobRequestWatcher() {
  while (true) {
    const { payload: { id, studioId } } = yield take(APPLY_JOB_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'POST', {}, `jobcard/apply/${id}/studio/${studioId}`, {
          'X-Auth-Token': token,
        });
        yield put(applyJobSuccess(req.data));
        yield put(openMessage('Thank You!', 'Your interest has been noted and contact details sent to the studio.'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(jobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(applyJobError(e));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}


export default [
  jobRequestWatcher,
  applyJobRequestWatcher,
];
