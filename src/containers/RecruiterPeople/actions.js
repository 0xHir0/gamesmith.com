/*
  Recruiter People action
 */

import {
  CONTACT_DETAIL_COUNT_REQUEST,
  CONTACT_DETAIL_COUNT_SUCCESS,
} from './constants';

export function getContactDetailCountRequest(resolve, reject) {
  return {
    type: CONTACT_DETAIL_COUNT_REQUEST,
    payload: { resolve, reject },
  };
}

export function getContactDetailCountSuccess(data) {
  return {
    type: CONTACT_DETAIL_COUNT_SUCCESS,
    data,
  };
}
