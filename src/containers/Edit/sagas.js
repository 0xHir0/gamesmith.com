/*
 * Update profile sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { push, replace } from 'react-router-redux';
import { reset } from 'redux-form';
import { isEmpty, trim } from 'lodash';
import moment from 'moment';

import {
  makeRequest,
  getUserData,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  makeRailApiRequest,
} from 'utils';
import {
  closeModal,
  openMessage,
} from 'containers/Modals/actions';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_EMAIL_REQUEST,
  UPDATE_LINKEDIN_EMAIL_REQUEST,
} from './constants';

import {
  rejectError,
} from 'containers/App/actions';

import {
  updateProfileSuccess,
  updateProfileError,
} from './actions';

import { makerSuccess } from 'containers/Maker/actions';

import { userRequest, logoutRequest } from 'containers/App/actions';

function* updateEmailRequestWatcher() {
  while (true) {
    const { payload: { values: { oldemail, newemail, password }, resolve, reject } } = yield take(UPDATE_EMAIL_REQUEST);
    let request;
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id, email } = yield call(getUserData);
        if (oldemail == email && oldemail != newemail)
        {
          request = yield call(makeRequest, 'POST', {
            oldpassword: password,
            oldemail,
            newemail,
          }, 'updateemail', {
            'X-Auth-Token': token,
          });

          yield put(closeModal());
          yield put(openMessage('Successfully Update Email', 'You are logged out from Gamesmith because you have changed your email. Please login with new email to continue'));
          yield put(logoutRequest());
        } else {
          yield put(closeModal());
          yield put(openMessage('Email is is incorrect', oldemail != email ? oldemail == newemail ? '' : 'Old email does not match with existing email' : 'Both Emails are Same'));
        }
      }
    } catch (e) {
      yield call(reject, e.response.data.error ? { newemail: e.response.data.error } : { password: 'Password is Incorrect' });
    }
  }
}

function* updateLinkedInEmailRequestWatcher() {
  while (true) {
    const { payload: { values: { oldemail, newemail, password }, resolve, reject } } = yield take(UPDATE_LINKEDIN_EMAIL_REQUEST);
    let request;
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id, email } = yield call(getUserData);
        if (oldemail == email && oldemail != newemail) {
          request = yield call(makeRequest, 'POST', {
            oldpassword: password,
            oldemail,
            newemail,
          }, 'updatelinkedinemail', {
            'X-Auth-Token': token,
          });

          yield put(closeModal());
          yield put(openMessage('Successfully Update Email', 'You are logged out from Gamesmith because you have changed your email. Please login with new email to continue'));
          yield put(logoutRequest());
        } else {
          yield put(closeModal());
          yield put(openMessage('Email is is incorrect', oldemail != email ? oldemail == newemail ? '' : 'Old email does not match with existing email' : 'Both Emails are Same'));
        }
      }
    } catch (e) {
      yield call(reject, e.response.data.error ? { newemail: e.response.data.error } : { password: 'Password is Incorrect' });
    }
  }
}

// watcher for profile update requests
function* updateProfileRequestWatcher() {
  while (true) {
    const { payload: { values: { image, firstName, lastName, email, password, currRole, currCompany, currGame, availability, availDay, availMonth, availYear, bio, skills, accomplishments, phoneNumber, isLinkedInUser, country, state, city, languages, jobsFamily, socialLinks, school, major  }, countryId, stateId, addressId, resolve, reject, connections, credits, imgUrl, workCategories} } = yield take(UPDATE_PROFILE_REQUEST);
    // const workIds = workCategories.length > 0 && workCategories.map(jf => jf.id);
    // console.log(wk, 'Values Wk');
    try {
      if (!isEmpty(socialLinks.filter(sl => !sl.url || !sl.icon))) {
        yield call(reject, { _error: "Social Links can't be blank" });
      } else if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // update jobs family
        const req1 = yield call(makeRequest, 'POST', {
          makerId: id,
          jobFamily: jobsFamily,
        }, 'updateJobPassion', {
          'X-Auth-Token': token,
          Pragma: 'no-cache',
        });
          // request the profile update api
        const req = yield call(makeRequest, 'POST', {
          id,
          firstName: trim(firstName),
          lastName: trim(lastName),
          currRole: trim(currRole),
          currCompany: trim(currCompany),
          currGame: '',
          phoneNumber,
          bio: trim(bio),
          availability,
          imgUrl,
          skills: trim(skills),
          accomplishments: trim(accomplishments),
          workCategories,
          school,
          major: trim(major),
          additionalInfo: [
            {
                // loginCount: 0,
                // invitationCount: 0,
              timesVerified: 0,
              language: isEmpty(languages) ? '' : languages.map((v) => { return v.value; }).join(', '),

              availableAt: availability ? availability === 'Open at Future Date' ? (availDay && availMonth && availYear) ? moment(`${availYear}-${availMonth}-${availDay}`).format('YYYY-MM-DD') : null : null : null,
              latestGameId: 0,
              loginCount: 0,
              invitationCount: 0,
              address: {
                id: addressId,
                country,
                city,
                state,
                  // area: area,
                countryId,
                stateId,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              socialProfileLink: socialLinks,
            },
          ],
        }, `profile/edit/${id}`, {
          'X-Auth-Token': token,
          Pragma: 'no-cache',
        });
          // check if there is an image to update
        if (image) {
            // add image file to form data
          const data = new FormData();
          data.append('picture', image);
            // request the update profile image api
          yield call(makeRequest, 'POST', data, `profile/updatepicture/${id}`, {
            'X-Auth-Token': token,
          });

          yield call(makeRailApiRequest, 'POST', data, `accounts/update_picture?id=${id}`, {});
        }
          // if successful resolve the form and show confirmation
        yield call(resolve);
        // yield put(makerSuccess(req.data.maker));
        yield put(updateProfileSuccess('Successfully updated profile!'));
        yield put(openMessage('Successfully updated profile!', 'blank'));
        yield put(push('/maker/me'));
          // refresh user data (pass true to redirect to profile instead of People)
        yield put(userRequest(true, ''));
          // flash a page refresh to get rid of cached image
        yield put(reset('profile'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateProfileError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: 'Error updating profile.' });
      yield put(updateProfileError(e));
    }
  }
}

export default [
  updateProfileRequestWatcher,
  updateEmailRequestWatcher,
  updateLinkedInEmailRequestWatcher,
];
