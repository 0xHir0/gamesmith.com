/*
 * Studio sagas
 */


import { take, call, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';
import { isEmpty } from 'lodash';

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
  STUDIO_REQUEST,
  APPLY_STUDIO_JOB_REQUEST,
  GET_STUDIO_RECRUITER_REQUEST,
} from './constants';

import {
  studioSuccess,
  studioError,
  applyStudioJobSuccess,
  applyStudioJobError,
  getStudioRecruiterRequest,
  getStudioRecruiterSuccess,
  getStudioRecruiterError
} from './actions';
import workCategories from '../../data/workCategories';

// watcher for studioCard requests
function* studioRequestWatcher() {
  while (true) {
    const { payload: { slug } } = yield take(STUDIO_REQUEST);
    try {
      // check auth token for expiration
      const { token } = checkAuthToken() ? yield call(getAuthToken) : {};
      const req = yield call(makeRequest, 'GET', {}, `studio/${slug}`, isEmpty(token) ? {} : { 'X-Auth-Token': token });
      if (req.data.jobs.length > 0 && checkAuthToken()) {
        yield put(getStudioRecruiterRequest(req.data.id));
      } else {
        yield put(getStudioRecruiterSuccess([]));
      }
      req.data.jobs.map(i => i.workCategories = i.workCategories.map(j => ({ id: j, value: j.toString() })));
      yield put(studioSuccess(req.data));
      if (getAuthToken && !checkAuthToken) {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(studioError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(studioError(e));
      yield put(replace('/error'));
    }
  }
}

// watcher for apply to studio job requests
function* applyStudioJobRequestWatcher() {
  while (true) {
    const { payload: { id, studioId } } = yield take(APPLY_STUDIO_JOB_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        yield call(makeRequest, 'POST', {}, `jobcard/apply/${id}/studio/${studioId}`, {
          'X-Auth-Token': token,
        });
        yield put(applyStudioJobSuccess(id));
        yield put(openMessage('Thank You!', 'Your interest has been noted and contact details sent to the studio.'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(studioError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(applyStudioJobError(e));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

function *getStudioRecruiterRequestWatcher() {
  while (true){
    const { companyId } = yield take(GET_STUDIO_RECRUITER_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
       const  req = yield call(makeRequest, 'GET', {}, `getcompanyrecruiter/${companyId}`, {
          'X-Auth-Token': token,
        });
        yield put(getStudioRecruiterSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(studioError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(getStudioRecruiterError("No Recuriter found against this studio"));
    }
  }

}
export default [
  studioRequestWatcher,
  applyStudioJobRequestWatcher,
  getStudioRecruiterRequestWatcher
];
