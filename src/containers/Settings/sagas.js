/*
 * Settings sagas
 */

/* eslint-disable no-unused-vars */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { replace } from 'react-router-redux';
import { reset } from 'redux-form';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  getUserData,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  GET_SETTINGS_REQUEST, GET_STUDIO_PLAN_REQUEST,
  UPDATE_SETTINGS_REQUEST,
} from './constants';

import {
  getSettingsRequest,
  getSettingsSuccess,
  getSettingsError,
  updateSettingsSuccess,
  updateSettingsError,
  getStudioPlanSuccess,
} from './actions';
import { openMessage } from 'containers/Modals/actions';

// watcher for settings requests
function* settingsRequestWatcher() {
  while (yield take(GET_SETTINGS_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request setting data
        const req = yield call(makeRequest, 'GET', {}, 'settings', {
          'X-Auth-Token': token,
        });
        yield put(getSettingsSuccess(req.data));
      }
    } catch (e) {
      yield put(getSettingsError(e));
    }
  }
}

// watcher for settings update requests
function* settingsUpdateRequestWatcher() {
  while (true) {
    const { payload: { values, values: { image, oldPassword, newPassword, memberConnections = false, memberMessaging = false, surveys = false, jobEnquiries = false, messageFallback, generalAnnounce }, resolve, reject, email, imgUrl } } = yield take(UPDATE_SETTINGS_REQUEST);
    try {
      if (newPassword && !oldPassword) {
        // Case where oldPassword hasn't been entered but newPassword has
        yield call(reject, { _error: 'Please enter your password.' });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        if (newPassword) {
          // request the reset password api
          const req1 = yield call(makeRequest, 'POST', {
            oldemail: email,
            oldpassword: oldPassword,
            newpassword: newPassword,
          }, 'updatepassword', {
            'X-Auth-Token': token,
          });
        }
        const commValue = (messageFallback && generalAnnounce) ? 1 : messageFallback ? 2 : generalAnnounce ? 3 : 0;
        // request the preference update api
        const req2 = yield call(makeRequest, 'POST', {
          memberConnections,
          memberMessaging,
          surveys,
          jobEnquiries,
          commPreferences: commValue,

        }, 'settings/update', {
          'X-Auth-Token': token,
        });
        // check if there is an image
        if (image) {
          // add image file to form data
          const data = new FormData();
          data.append('logo', image);
          // request the update profile image api
          yield call(makeRequest, 'POST', data, `recruiter/updatelogo/${id}`, {
            'X-Auth-Token': token,
          });
        }
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(reset('settings'));
        yield put(getSettingsRequest());
        yield put(updateSettingsSuccess('Successfully updated settings!'));
        yield put(openMessage('Settings Updated', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateSettingsError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: 'Error submitting form. Please check your password or Preferences.' });
      yield put(updateSettingsError(e));
    }
  }
}

function* getStudioAndPlanRequestWatcher() {
  while (true) {
    const { payload: { recruiterId, companyId } } = yield take(GET_STUDIO_PLAN_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request setting data
        const req = yield call(makeRequest, 'POST', {}, `getStudioPlanInfo/${recruiterId}/${companyId}`, {
          'X-Auth-Token': token,
        });
        const curdate = new Date();
        curdate.setTime(req.data.nextBillingDate * 1000);
        const nextBillingDate = curdate.toDateString()
        req.data.nextBillingDate = nextBillingDate;
        yield put(getStudioPlanSuccess(req.data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}
export default [
  settingsRequestWatcher,
  settingsUpdateRequestWatcher,
  getStudioAndPlanRequestWatcher,
];
