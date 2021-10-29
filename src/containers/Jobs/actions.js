/*
 * Jobs actions
 */

import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_ERROR,
  TOGGLE_SEARCH,
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_SUCCESS,
  SEARCH_JOBS_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CLEAR_SEARCH_PEOPLE,
  GEO_LOCATION_REQUEST,
  GEO_LOCATION_SUCCESS,
  GEO_LOCATION_ERROR,
  GET_JOBS_DATA_TYPE_REQUEST,
  GET_JOBS_DATA_TYPE_SUCCESS,
  JOBS_SORTER_REQUEST,
  SEARCH_JOBS_FILTER,
} from './constants';

export function jobsRequest() {
  return {
    type: JOBS_REQUEST,
  };
}

export function jobsSuccess(data) {
  return {
    type: JOBS_SUCCESS,
    data,
  };
}

export function jobsError(message) {
  return {
    type: JOBS_ERROR,
    message,
  };
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function searchJobsRequest(query) {
  return {
    type: SEARCH_JOBS_REQUEST,
    payload: {
      query,
    },
  };
}

export function searchJobsSuccess(data) {
  return {
    type: SEARCH_JOBS_SUCCESS,
    data,
  };
}

export function searchJobsError(message) {
  return {
    type: SEARCH_JOBS_ERROR,
    message,
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

export function clearSearchPeople() {
  return {
    type: CLEAR_SEARCH_PEOPLE,
  };
}

export function geoLocationRequest() {
  return {
    type: GEO_LOCATION_REQUEST,
  };
}

export function geoLocationSuccess(data) {
  return {
    type: GEO_LOCATION_SUCCESS,
    data,
  };
}

export function geoLocationError(message) {
  return {
    type: GEO_LOCATION_ERROR,
    message,
  };
}

export function getJobsDataTypeRequest() {
  return {
    type: GET_JOBS_DATA_TYPE_REQUEST,
  };
}

export function getJobsDataTypeSuccess(data) {
  return {
    type: GET_JOBS_DATA_TYPE_SUCCESS,
    data,
  };
}
export function jobsSorter(data, sorter, type, isSearching) {
  return {
    type: JOBS_SORTER_REQUEST,
    payload: {
      data,
      sorter,
      type,
      isSearch: isSearching,
    },
  };
}
export function searchJobFilters(familyList, locationList, employmentList) {
  return {
    type: SEARCH_JOBS_FILTER,
    payload: {
      familyList,
      locationList,
      employmentList,
    },
  };
}
