/*
 * Studio actions
 */

import {
  VFX_REQUEST,
  VFX_SUCCESS,
  VFX_ERROR,
  SEARCH_VFX_REQUEST,
  SEARCH_VFX_SUCCESS,
  SEARCH_VFX_ERROR,
  TOGGLE_SEARCH,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  START_SPINNER,
  ADD_STUDIO_REQUEST,
  GET_RECRUITER_STUDIO_REQUEST,
  GET_RECRUITER_STUDIO_SUCCESS,
} from './constants';

export function vfxRequest() {
  return {
    type: VFX_REQUEST,
  };
}

export function vfxSuccess(data) {
  return {
    type: VFX_SUCCESS,
    data,
  };
}

export function vfxError(message) {
  return {
    type: VFX_ERROR,
    message,
  };
}

export function studioSearch(query) {
  return {
    type: SEARCH_VFX_REQUEST,
    payload: {
      query,
    },
  };
}

export function studioSearchSuccess(data) {
  return {
    type: SEARCH_VFX_SUCCESS,
    data,
  };
}

export function studioSearchError(message) {
  return {
    type: SEARCH_VFX_ERROR,
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

export function addStudioRequest(values, label, resolve, reject) {
  return {
    type: ADD_STUDIO_REQUEST,
    payload: { values, label, resolve, reject },
  };
}

export function getRecruiterStudioRequest(companyId) {
  return {
    type: GET_RECRUITER_STUDIO_REQUEST,
    payload: { companyId },
  };
}

export function getRecruiterStudioSuccess(data) {
  return {
    type: GET_RECRUITER_STUDIO_SUCCESS,
    payload: { data },
  };
}
