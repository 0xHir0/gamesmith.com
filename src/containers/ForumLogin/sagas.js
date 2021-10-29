/*
 * Forum sagas
 */

import { take, call, put } from 'redux-saga/effects';
import moment from 'moment';

import Crypto from 'crypto-js';

import {
  makeRequest,
  getAuthToken,
  checkAuthToken,
  BASE_FORUM_URL,
  FORUM_URL
} from 'utils';

import {
  FORUM_LOGIN_REQUEST,
} from './constants';

import request from 'axios';

const forumURL = FORUM_URL ? FORUM_URL : 'http://forum.gamesmith.com';

// watcher for forum redirection requests
function* forumLoginRequestWatcher() {
  while (true) {
    try {
      const { payload: { query }} = yield take(FORUM_LOGIN_REQUEST);
      const sso = query.sso;
      const sig = query.sig;
      let nonce = '';
      if(sso && sso.length > 0 && sig && sig.length > 0) {
        // Base encode sso value here
        nonce = atob(sso);
        if (yield call(checkAuthToken)) {
          const { token } = yield call(getAuthToken);
          const req = yield call(makeRequest, 'GET', {}, 'me?' + nonce, {
            'X-Auth-Token': token,
          });
          let data = req.data;
          let payload = data.payload;
          let newSig = data.sig;
          const forumRedirect = forumURL + '/session/sso_login';
          window.location = forumRedirect + "?sso=" + payload + "&sig=" + newSig;
        } else {
          console.log('checkAuthToken failed');
          nonce = atob(sso);
        }
      }
    } catch (e) {
      console.log(e);
      window.location = forumURL; // replace this with forum URL
    }
  }
}

export default [
  forumLoginRequestWatcher,
];
