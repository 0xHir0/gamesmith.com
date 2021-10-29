/*
* SALARY CALCULATOR ACTIONS
*/


import {
  SEARCH_SALARY_REQUEST,
  SEARCH_SALARY_SUCCESS,
  SEARCH_SALARY_ERROR,
  GET_JOBTITLE_REQUEST,
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_BYNAME_REQUEST,
  SAVE_TITLES,
} from './constants';


export function searchSalaryRequest(data) {
  return {
    type: SEARCH_SALARY_REQUEST,
    payload: {
      data,
    },
  };
}

export function searchSalarySuccess(data, title, salary, flag) {
  return {
    type: SEARCH_SALARY_SUCCESS,
    payload: {
      data,
      title,
      salary,
      flag,
    },
  };
}

export function searchSalaryError(message) {
  return {
    type: SEARCH_SALARY_ERROR,
    message,
  };
}

// autocomplete action creators
export function getJobTitleRequest(data) {
  return {
    type: GET_JOBTITLE_REQUEST,
    payload: data,
  };
}

export function getJobsByNameRequest(title) {
  return {
    type: GET_JOBS_BYNAME_REQUEST,
    payload: {
      title,
    },
  };
}

export function getJobs() {
  return {
    type: GET_JOBS_REQUEST,
  }
}
export function getJobsByNameSuccess(jobs) {
  return {
    type: GET_JOBS_SUCCESS,
    jobs
  }
}

export function saveTitles(titles) {
  return {
    type: SAVE_TITLES,
    titles,
  };
}

// export function getAutocompleteSuccess(message) {
//   return {
//     type: GET_AUTOCOMPLETE_SUCCESS,
//     message,
//   };
// }
//
// export function getAutocompleteError(message) {
//   return {
//     type: GET_AUTOCOMPLETE_ERROR,
//     message,
//   };
// }