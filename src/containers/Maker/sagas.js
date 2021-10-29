/*
 * Maker sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { replace } from 'react-router-redux';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  getUserData,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  MAKER_REQUEST,
  MAKER_PROFILE_REQUEST,
  CREDIT_REQUEST,
  CREDIT_SUCCESS,
  CREDIT_ERROR,
  VERIFY_CREDIT_REQUEST,
  DISPUTE_REQUEST,
  DISPUTE_ERROR,
  DISPUTE_SUCCESS,
  UNVERIFY_CREDIT_REQUEST,
  UNVERIFY_CREDIT_SUCCESS,
  UNVERIFY_CREDIT_ERROR,
  UPDATE_MAKER_SEARCH_COUNT_REQUEST,
  CHANGE_AVAILABILITY,
  SAVE_CV_CDN_URL,
  GET_COMPANY_INFO,
} from './constants';

import {
  makerSuccess,
  makerError,
  creditSuccess,
  creditError,
  verifyCreditSuccesss,
  verifyCreditError,
  disputeRequest,
  disputeError,
  disputeSuccess,
  saveCvSuccess,
  makerRequest,
} from './actions';

import {
  closeModal,
  openMessage,
  openEditExp,
  // openExceedLimit,
  openOutOfClicks,
  openExceedRecruiterSearchLimit,
} from 'containers/Modals/actions';
import { verifyCreditTokenRequest } from '../App/actions';
import { getUserReceivedRequests, getUserVerificationsRequest } from '../VerificationRequests/actions';

// watcher for maker profile data requests
function* makerProfileRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(MAKER_PROFILE_REQUEST);
    try {
      // request maker data
      const req = yield call(makeRequest, 'GET', {}, `gameMakerProfile/${id}`);
      console.log(req);
      req.data.maker.workCategories = req.data.workCategories;
      req.data.maker.isStudent = req.data.isStudent;
      req.data.maker.school = req.data.education.school;
      req.data.maker.major = req.data.education.major;
      yield put(makerSuccess(req.data.maker));
    } catch (e) {
      yield put(makerError(e));
      // window.history.back();
      // TODO:40 find a way to keep the url but still display the error page
    }
  }
}

// watcher for maker data requests
function* makerRequestWatcher() {
  while (true) {
    const { payload: { id, user } } = yield take(MAKER_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, `gamemaker/${id}`, {
          'X-Auth-Token': token,
          Pragma: 'no-cache',
        });
        req.data.maker.workCategories = req.data.workCategories;
        req.data.maker.isStudent = req.data.isStudent;
        req.data.maker.school = req.data.education.school;
        req.data.maker.major = req.data.education.major;
        yield put(makerSuccess(req.data.maker));
      }
    } catch (e) {
      if (e.response.data.error === 'limitExceed') {
        if (user.recruiter) {
          yield put(openExceedRecruiterSearchLimit({ message: "Let's look at a plan that suits your business needs." }));
        } else if (user.maker) {
          // yield put(openExceedLimit({ message: 'Unfortunately you have reached your user limit.' }));
          yield put(openOutOfClicks());
        }
      } else {
        yield put(makerError(e));
      }
      window.history.back();
      // TODO:40 find a way to keep the url but still display the error page
    }
  }
}

// watcher for  update maker search countrequests
function* updateMakerSearchCountRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(UPDATE_MAKER_SEARCH_COUNT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'POST', {}, `updatesearchcount/${id}`, {
          'X-Auth-Token': token,
        });
      } else {
        const req = yield call(makeRequest, 'POST', {}, `updatesearchcount/${id}`, {});
      }
    } catch (e) {
      // console.log(e);
      yield put(makerError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

// watcher for game credit data requests
function* creditRequestWatcher() {
  while (true) {
    const { payload: { creditId } } = yield take(CREDIT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, `gamemaker/${id}/getcredit/${creditId}`, {
          'X-Auth-Token': token,
        });
        yield put(creditSuccess(req.data));
        yield put(openEditExp(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(creditError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(creditError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

// watcher for verify credit requests
function* verifyCreditWatcher() {
  while (true) {
    const { payload: { decision, id, makerID, inviteToken } } = yield take(VERIFY_CREDIT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'POST', {}, `gamecredit/verify/${decision}/${id}`, {
          'X-Auth-Token': token,
        });

        if (inviteToken) {
          yield put(verifyCreditTokenRequest(inviteToken));
        }
        const req_maker = yield call(makeRequest, 'GET', {}, `gamemaker/${makerID}?verification=true`, {
          'X-Auth-Token': token,
        });
        req_maker.data.maker.workCategories = req_maker.data.workCategories;
        yield put(makerSuccess(req_maker.data.maker));
        yield put(getUserReceivedRequests(makerID));
        yield put(getUserVerificationsRequest(makerID));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(verifyCreditError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      if (e.response.data.error === 'limitExceed') {
        // yield put(openExceedLimit({ message: 'Unfortunately you have reached your user limit.' }));
        yield put(openOutOfClicks());
      } else {
        yield put(verifyCreditError(e));
      }
      // TODO:40 find a way to keep the url but still display the error page
      window.history.back();
    }
  }
}

// watcher for verify credit requests
function* unverifyCreditWatcher() {
  while (true) {
    const { payload: { creditId, makerID } } = yield take(UNVERIFY_CREDIT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // request maker data
        const req = yield call(makeRequest, 'POST', {}, `creditverification/delete/${id}/${creditId}`, {
          'X-Auth-Token': token,
        });
        const req_maker = yield call(makeRequest, 'GET', {}, `gamemaker/${makerID}?verification=true`, {
          'X-Auth-Token': token,
        });
        req_maker.data.maker.workCategories = req_maker.data.workCategories;
        yield put(makerSuccess(req_maker.data.maker));
        yield put(getUserVerificationsRequest(makerID));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(verifyCreditError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      if (e.response.data.error === 'limitExceed') {
        // yield put(openExceedLimit({ message: 'Unfortunately you have reached your user limit.' }));
        yield put(openOutOfClicks());
      } else {
        yield put(verifyCreditError(e));
      }
      // TODO:40 find a way to keep the url but still display the error page
      window.history.back();
    }
  }
}

// watcher for dispute credit requests
function* disputeRequestWatcher() {
  while (true) {
    const { payload: { values: { disputedGame = false, disputedCompany = false, makerId, creditId, title, studio, makerName }, resolve, reject } } = yield take(DISPUTE_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        if (disputedGame || disputedCompany) {
          const req = yield call(makeRequest, 'POST',
            {
              disputedCompany: disputedGame,
              disputedGame: disputedCompany,
              disputedOther: false,
              comments: '',
            }, `gamecredit/dispute/${creditId}`, {
              'X-Auth-Token': token,
              'Content-Type': 'application/json',
            });
          const reqMaker = yield call(makeRequest, 'GET', {}, `gamemaker/${makerId}`, {
            'X-Auth-Token': token,
          });
          yield put(makerSuccess(reqMaker.data));
          yield put(closeModal());
          yield put(openMessage('Game Credit Disputed', 'Game Credit Disputed Succcessfully.'));
        } else {
          yield put(closeModal());
          yield put(openMessage('Game Credit Error', 'Please Select Atleast One Reason For Dispute.'));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(disputeError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield put(closeModal());
      yield put(openMessage('Game Credit Already Disputed', 'You have Already Disputed this Game Credit.'));
      yield call(reject, { location: 'Could not Dispute.' });
      yield put(disputeError(e));
    }
  }
}

//  watcher for Channge availibility of a user
function* changeAvailailityWatcher() {
  while (true) {
    const { payload: { str, makerId } } = yield take(CHANGE_AVAILABILITY);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'POST', { str, makerId }, 'updateAvailability', {
          'X-Auth-Token': token,
        });
        const req2 = yield call(makeRequest, 'GET', {}, `gamemaker/${makerId}`, {
          'X-Auth-Token': token,
          Pragma: 'no-cache',
        });
        yield put(makerSuccess(req2.data));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

// watcher for Saving MAKERS CV CDN url from uploadcare
function* saveCvCdnUrlWatcher() {
  while (true) {
    const { payload: { cdnUrl, makerId } } = yield take(SAVE_CV_CDN_URL);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, 'POST', { cdnUrl, makerId }, 'addMakerCvUrl', {
          'X-Auth-Token': token,
        });
        if (req.status === 200) {
          yield put(makerRequest(makerId));
          yield put(openMessage('CV Uploaded', 'You have successfully uploaded your CV.'));
          yield put(saveCvSuccess());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}


export default [
  makerProfileRequestWatcher,
  makerRequestWatcher,
  verifyCreditWatcher,
  disputeRequestWatcher,
  unverifyCreditWatcher,
  creditRequestWatcher,
  updateMakerSearchCountRequestWatcher,
  changeAvailailityWatcher,
  saveCvCdnUrlWatcher,
];
