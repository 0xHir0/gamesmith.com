/*
 * Settings actions
 */

import {
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_ERROR,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_ERROR,
  GET_STUDIO_PLAN_REQUEST,
  GET_STUDIO_PLAN_SUCCESS,
} from './constants';

// get settings action creators
export function getSettingsRequest() {
  return {
    type: GET_SETTINGS_REQUEST,
  };
}
export function getSettingsSuccess(data) {
  return {
    type: GET_SETTINGS_SUCCESS,
    data,
  };
}
export function getSettingsError(message) {
  return {
    type: GET_SETTINGS_ERROR,
    message,
  };
}

// update settings action creators
export function updateSettingsRequest(data) {
  return {
    type: UPDATE_SETTINGS_REQUEST,
    payload: data,
  };
}
export function updateSettingsSuccess(message) {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
    message,
  };
}
export function updateSettingsError(message) {
  return {
    type: UPDATE_SETTINGS_ERROR,
    message,
  };
}

export function getStudioAndPlanRequest(recruiterId, companyId) {
  return {
    type: GET_STUDIO_PLAN_REQUEST,
    payload: {
      recruiterId, companyId,
    },
  };
}

export function getStudioPlanSuccess(data) {
  return {
    type: GET_STUDIO_PLAN_SUCCESS,
    data,
  };
}

