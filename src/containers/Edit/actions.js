/*
 * Update profile actions
 */

import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  UPDATE_EMAIL_REQUEST,
  UPDATE_LINKEDIN_EMAIL_REQUEST,
} from './constants';

// update profile action creators
export function updateProfileRequest(data) {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: data,
  };
}
export function updateProfileSuccess(message) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    message,
  };
}
export function updateProfileError(message) {
  return {
    type: UPDATE_PROFILE_ERROR,
    message,
  };
}
export function updateEmailRequest(data) {
  return {
    type: UPDATE_EMAIL_REQUEST,
    payload: data,
  };
}
export function updateLinkedInEmailRequest(data) {
  return {
    type: UPDATE_LINKEDIN_EMAIL_REQUEST,
    payload: data,
  };
}
