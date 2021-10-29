/*
 * CompanyEmployees actions
 */

import {
  GET_COMPANY_EMPLOYEES_REQUEST,
  GET_COMPANY_EMPLOYEES_SUCCESS,
  GET_COMPANY_EMPLOYEES_ERROR,
} from './constants';

export function getCompanyMakersRequest(companyName, offset = 0) {
  return {
    type: GET_COMPANY_EMPLOYEES_REQUEST,
    payload: { companyName, offset },
  };
}

export function getCompanyMakersSuccess(data) {
  return {
    type: GET_COMPANY_EMPLOYEES_SUCCESS,
    payload: { data },
  };
}

export function getCompanyMakersError(message) {
  return {
    type: GET_COMPANY_EMPLOYEES_ERROR,
    payload: { message },
  };
}
