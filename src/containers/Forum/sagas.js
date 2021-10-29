/*
 * Forum sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import request from 'axios';

import {
  makeRequest,
  getAuthToken,
  checkAuthToken,
  BASE_FORUM_URL,
  checkUrlAvailabilty,
} from 'utils';

import {
  FORUM_REQUEST,
} from './constants';

import {
  closeModal,
  openMessage,
} from 'containers/Modals/actions';

import {
  forumSuccess,
  forumError
} from './actions';

const forumURL = BASE_FORUM_URL ? BASE_FORUM_URL : 'http://forum.gamesmith.com';

function* forumRequestWatcher() {
  while (true) {
    try {
      const { payload: { query } } = yield take(FORUM_REQUEST);
      if(checkUrlAvailabilty(forumURL)){
        if(checkAuthToken()) {
          window.location = forumURL + '/login';
        } else {
          console.log('Not Authenticated');
          window.location = forumURL;
        }
      }else{
        yield put(openMessage('Unavailable', 'Forum is currently not available. You can still use Gamesmith.'));
        yield put(push('/'));
      }
    } catch (e) {
      console.log(e);
      window.location = forumURL;

      // if(checkUrlAvailabilty(forumURL)){
      //   window.location = forumURL;
      // }else{
      //   yield put(openMessage('Unavailable', 'Forum is currently not available. You can still use Gamesmith.'));
      //   yield put(push('/'));
      // }
    }
  }
}

export default [
  forumRequestWatcher,
];
