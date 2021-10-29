/*
 * Sign up actions
 */

import {
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_ERROR,
  SAVE_CV_URL,
  DELETE_CV_URL,
} from './constants';


export function createAccountRequest(data) {
  return {
    type: CREATE_ACCOUNT_REQUEST,
    payload: data,
  };
}
export function createAccountSuccess(message) {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    message,
  };
}
export function createAccountError(message) {
  return {
    type: CREATE_ACCOUNT_ERROR,
    message,
  };
}
export function checkEmailRequest(email, resolve, reject) {
  return {
    type: CHECK_EMAIL_REQUEST,
    payload: { email, resolve, reject,
    },
  };
}
export function checkEmailSuccess(message) {
  return {
    type: CHECK_EMAIL_SUCCESS,
    message,
  };
}
export function checkEmailError(message) {
  return {
    type: CHECK_EMAIL_ERROR,
    message,
  };
}

export function saveCvCdnUrl(data) {
  return {
    type: SAVE_CV_URL,
    data,
  };
}

export function deleteCvCdnUrl() {
  return {
    type: DELETE_CV_URL,
  };
}

