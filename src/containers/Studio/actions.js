/*
 * Studio actions
 */

import {
  STUDIO_REQUEST,
  STUDIO_SUCCESS,
  STUDIO_ERROR,
  EDIT_STUDIO_JOB_REQUEST,
  EDIT_STUDIO_JOB_SUCCESS,
  EDIT_STUDIO_JOB_ERROR,
  APPLY_STUDIO_JOB_REQUEST,
  APPLY_STUDIO_JOB_SUCCESS,
  APPLY_STUDIO_JOB_ERROR,
  SCROLL_TO_JOBS,
  GET_STUDIO_RECRUITER_REQUEST,
  GET_STUDIO_RECRUITER_SUCCESS,
  GET_STUDIO_RECRUITER_ERROR,
} from './constants';

export function studioRequest(slug) {
  return {
    type: STUDIO_REQUEST,
    payload: {
      slug,
    },
  };
}

export function studioSuccess(data) {
  return {
    type: STUDIO_SUCCESS,
    data,
  };
}

export function studioError(message) {
  return {
    type: STUDIO_ERROR,
    message,
  };
}

export function editStudioJobRequest(data) {
  return {
    type: EDIT_STUDIO_JOB_REQUEST,
    payload: data,
  };
}

export function editStudioJobSuccess(data) {
  return {
    type: EDIT_STUDIO_JOB_SUCCESS,
    data,
  };
}

export function editStudioJobError(message) {
  return {
    type: EDIT_STUDIO_JOB_ERROR,
    message,
  };
}

export function applyStudioJobRequest(id, studioId) {
  return {
    type: APPLY_STUDIO_JOB_REQUEST,
    payload: {
      id,
      studioId,
    },
  };
}

export function applyStudioJobSuccess(data) {
  return {
    type: APPLY_STUDIO_JOB_SUCCESS,
    data,
  };
}

export function applyStudioJobError(message) {
  return {
    type: APPLY_STUDIO_JOB_ERROR,
    message,
  };
}

export function scrollToJobsSection() {
  return {
    type: SCROLL_TO_JOBS,
  };
}

export function getStudioRecruiterRequest(companyId) {
  return {
    type: GET_STUDIO_RECRUITER_REQUEST,
    companyId
  };
}

export function getStudioRecruiterSuccess(data) {
  return {
    type: GET_STUDIO_RECRUITER_SUCCESS,
    data
  };
}

export function getStudioRecruiterError(message) {
  return {
    type: GET_STUDIO_RECRUITER_ERROR,
    message
  };
}

