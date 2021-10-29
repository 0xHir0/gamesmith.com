/*
 * Ecosystem actions
 */

import {
  STUDIO_REQUEST,
  STUDIO_SUCCESS,
  STUDIO_ERROR,
  SEARCH_STUDIO_REQUEST,
  SEARCH_STUDIO_SUCCESS,
  SEARCH_STUDIO_ERROR,
  TOGGLE_SEARCH,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  START_SPINNER,
  CHECK_PARTNER,
  UPDATE_PARTNERS,
  PARTNER_REQUEST,
  TOGGLE_PARTNER,
} from './constants';
// import {TOGGLE_PARTNER} from "../Games/constants";

export function studiosRequest() {
  return {
    type: STUDIO_REQUEST,
  };
}

export function studiosSuccess(data) {
  return {
    type: STUDIO_SUCCESS,
    data,
  };
}

export function studiosError(message) {
  return {
    type: STUDIO_ERROR,
    message,
  };
}

export function studioSearch(query) {
  return {
    type: SEARCH_STUDIO_REQUEST,
    payload: {
      query,
    },
  };
}

export function studioSearchSuccess(data) {
  return {
    type: SEARCH_STUDIO_SUCCESS,
    data,
  };
}

export function studioSearchError(message) {
  return {
    type: SEARCH_STUDIO_ERROR,
    message,
  };
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function nextPageRequest(url, offset, query) {
  return {
    type: NEXT_PAGE_REQUEST,
    payload: {
      url,
      offset,
      query,
    },
  };
}

export function nextPageSuccess(data) {
  return {
    type: NEXT_PAGE_SUCCESS,
    data,
  };
}

export function nextPageError(message) {
  return {
    type: NEXT_PAGE_ERROR,
    message,
  };
}


export function startSpinner() {
  return {
    type: START_SPINNER,
  };
}

export function getPartnerRequest(partnerName) {
  return {
    type: PARTNER_REQUEST,
    payload: {
      partnerName,
    },
  };
}

export function checkPartner() {
  return {
    type: CHECK_PARTNER,

  };
}

export function updatePartners(data) {
  return {
    type: UPDATE_PARTNERS,
    payload: data,
  };
}

export function togglePartner() {
  return {
    type: TOGGLE_PARTNER,
  };
}