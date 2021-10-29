/*
 * Join sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { push } from 'react-router-redux';

import {
  makeRequest,
  FRONTEND_URI,
} from 'utils';

import {
  MAKER_JOIN_REQUEST,
} from './constants';

import { openMessage } from 'containers/Modals/actions';

// watcher for maker join requests
function* makerJoinRequestWatcher() {
  while (true) {
    const { payload: { email, code } } = yield take(MAKER_JOIN_REQUEST);
    try {
      // request the login api for auth token
      const loginReq = yield call(makeRequest, 'POST', {
        identifier: email,
        password: code,
      }, 'login');
      // convert auth token object to a string
      const authToken = encodeURIComponent(JSON.stringify(loginReq.data));
      // request the linkdin api for auth code -> linkedinCode
      localStorage.setItem('onboardingProcess', true);
      window.location = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=75d5ul44bm0rac&redirect_uri=${FRONTEND_URI}%2Flinkedin&state=${authToken}&scope=r_basicprofile%20r_emailaddress`;
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
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
  makerJoinRequestWatcher,
];
