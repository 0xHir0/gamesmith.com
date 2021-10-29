/*
 * Maker actions
 */

import {
  MAKER_REQUEST,
  MAKER_SUCCESS,
  MAKER_ERROR,
  MAKER_PROFILE_REQUEST,
  CREDIT_REQUEST,
  CREDIT_SUCCESS,
  CREDIT_ERROR,
  VERIFY_CREDIT_REQUEST,
  VERIFY_CREDIT_SUCCESS,
  VERIFY_CREDIT_ERROR,
  DISPUTE_REQUEST,
  DISPUTE_SUCCESS,
  DISPUTE_ERROR,
  UNVERIFY_CREDIT_REQUEST,
  UNVERIFY_CREDIT_SUCCESS,
  UNVERIFY_CREDIT_ERROR,
  ADD_CREDIT_SUCCESS,
  EDIT_CREDIT_SUCCESS,
  DELETE_CREDIT_SUCCESS,
  UPDATE_MAKER_SEARCH_COUNT_REQUEST,
  CHANGE_AVAILABILITY,
  SAVE_CV_CDN_URL,
  SAVE_CV_SUCCESS,
  DELETE_CV_SUCCESS,
} from './constants';

// get maker action creators
export function makerRequest(id, user) {
  return {
    type: MAKER_REQUEST,
    payload: {
      id,
      user,
    },
  };
}

export function makerSuccess(data) {
  return {
    type: MAKER_SUCCESS,
    data,
  };
}

export function makerError(message) {
  return {
    type: MAKER_ERROR,
    message,
  };
}
export function makerProfileRequest(id) {
  return {
    type: MAKER_PROFILE_REQUEST,
    payload: {
      id,
    },
  };
}

// update maker search count action creators
export function updateMakerSearchCountRequest(id) {
  return {
    type: UPDATE_MAKER_SEARCH_COUNT_REQUEST,
    payload: {
      id,
    },
  };
}
// get game credit action creators
export function creditRequest(creditId) {
  return {
    type: CREDIT_REQUEST,
    payload: {
      creditId,
    },
  };
}

export function creditSuccess(data) {
  return {
    type: CREDIT_SUCCESS,
    data,
  };
}

export function creditError(message) {
  return {
    type: CREDIT_ERROR,
    message,
  };
}

// get verify action creators
export function verifyCreditRequest(decision, id, makerID, inviteToken = '') {
  return {
    type: VERIFY_CREDIT_REQUEST,
    payload: {
      decision,
      id,
      makerID,
      inviteToken,
    },
  };
}

export function verifyCreditSuccesss(data) {
  return {
    type: VERIFY_CREDIT_SUCCESS,
    data,
  };
}
export function verifyCreditError(message) {
  return {
    type: VERIFY_CREDIT_ERROR,
    message,
  };
}
export function disputeRequest(data) {
  return {
    type: DISPUTE_REQUEST,
    payload: data,
  };
}
export function disputeSuccess(message) {
  return {
    type: DISPUTE_SUCCESS,
    message,
  };
}

export function disputeError(message) {
  return {
    type: DISPUTE_ERROR,
    message,
  };
}

// get unverify action creators
export function unverifyCreditRequest(creditId, makerID) {
  return {
    type: UNVERIFY_CREDIT_REQUEST,
    payload: {
      creditId,
      makerID,
    },
  };
}

export function unverifyCreditSuccesss(data) {
  return {
    type: UNVERIFY_CREDIT_SUCCESS,
    data,
  };
}
export function unverifyCreditError(message) {
  return {
    type: UNVERIFY_CREDIT_ERROR,
    message,
  };
}

export function addMakerCreditSuccess(data) {
  return {
    type: ADD_CREDIT_SUCCESS,
    data,
  };
}

export function editMakerCreditSuccess(data) {
  return {
    type: EDIT_CREDIT_SUCCESS,
    data,
  };
}

export function deleteMakerCreditSuccess(id) {
  return {
    type: DELETE_CREDIT_SUCCESS,
    id,
  };
}

export function changeAvailaility(str, makerId) {
  return {
    type: CHANGE_AVAILABILITY,
    payload: {
      str,
      makerId,
    },
  };
}

export function saveCvCdnUrl(cdnUrl, makerId) {
  return {
    type: SAVE_CV_CDN_URL,
    payload: {
      cdnUrl,
      makerId,
    },
  };
}

export function saveCvSuccess() {
  return {
    type: SAVE_CV_SUCCESS,
  };
}
export function deleteCVSuccess() {
  return {
    type: DELETE_CV_SUCCESS,
  };
}




