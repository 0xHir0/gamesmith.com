/*
 * Recruiter actions
 */

import {
  RECRUITER_REQUEST,
  RECRUITER_SUCCESS,
  RECRUITER_ERROR,
  RECRUITER_CONNECTIONS_REQUEST,
  RECRUITER_CONNECTIONS_SUCCESS,
  RECRUITER_CONNECTIONS_ERROR,
  POSTED_JOBS_REQUEST,
  POSTED_JOBS_SUCCESS,
  POSTED_JOBS_ERROR,
  ADD_JOBS_REQUEST,
  ADD_JOBS_SUCCESS,
  ADD_JOBS_ERROR,
  EDIT_JOBS_REQUEST,
  EDIT_JOBS_SUCCESS,
  EDIT_JOBS_ERROR,
  DELETE_JOBS_REQUEST,
  DELETE_JOBS_SUCCESS,
  DELETE_JOBS_ERROR,
  JOB_APPLICANTS_REQUEST,
  JOB_APPLICANTS_SUCCESS,
  JOB_APPLICANTS_ERROR,
  GLOBAL_APPLICANTS_REQUEST,
  GLOBAL_APPLICANTS_SUCCESS,
  GLOBAL_APPLICANTS_ERROR,
  UPGRADE_TO_STUDIO_REQUEST,
  UPGRADE_TO_STUDIO_SUCCESS,
  UPGRADE_TO_STUDIO_ERROR,
  REJECT_APPLICANT_REQUEST,
  REJECT_APPLICANT_SUCCESS,
  REJECT_APPLICANT_ERROR,
  EDIT_STUDIO_REQUEST,
  EDIT_STUDIO_ERROR,
  EDIT_STUDIO_SUCCESS,
  GET_RECRUITER_STUDIO_REQUEST,
  GET_RECRUITER_STUDIO_REQUEST_ERROR,
  GET_RECRUITER_STUDIO_REQUEST_SUCCESS,
  DELETE_GAME_REQUEST,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_ERROR,
  DELETE_STUDIO_CONTENT_REQUEST,
  DELETE_STUDIO_CONTENT_SUCCESS,
  DELETE_STUDIO_CONTENT_ERROR,
  MOVE_APPLICANT_REQUEST,
  MOVE_APPLICANT_SUCCESS,
  MOVE_APPLICANT_ERROR,
  MOVE_GLOBAL_APPLICANT_REQUEST,
  MOVE_GLOBAL_APPLICANT_SUCCESS,
  MOVE_GLOBAL_APPLICANT_ERROR,
  TOGGLE_VIEW,
  NEXT_PAGE_ERROR,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_REQUEST,
  DOWNGRADE_SUBSCRIPTION,
  GT_PLUS_REQUEST,
} from './constants';

export function recruiterRequest(id) {
  return {
    type: RECRUITER_REQUEST,
    payload: {
      id,
    },
  };
}

export function recruiterSuccess(data) {
  return {
    type: RECRUITER_SUCCESS,
    data,
  };
}

export function recruiterError(message) {
  return {
    type: RECRUITER_ERROR,
    message,
  };
}

export function recruiterConnectionsRequest(id) {
  return {
    type: RECRUITER_CONNECTIONS_REQUEST,
    payload: {
      id,
    },
  };
}

export function recruiterConnectionsSuccess(data) {
  return {
    type: RECRUITER_CONNECTIONS_SUCCESS,
    data,
  };
}

export function recruiterConnectionsError(message) {
  return {
    type: RECRUITER_CONNECTIONS_ERROR,
    message,
  };
}

export function postedJobRequest(id) {
  return {
    type: POSTED_JOBS_REQUEST,
    payload: {
      id,
    },
  };
}

export function postedJobSuccess(data) {
  return {
    type: POSTED_JOBS_SUCCESS,
    data,
  };
}

export function postedJobError(message) {
  return {
    type: POSTED_JOBS_ERROR,
    message,
  };
}

export function addJobRequest(data) {
  return {
    type: ADD_JOBS_REQUEST,
    payload: data,
  };
}
export function gtPlusRequest(data) {
  return {
    type: GT_PLUS_REQUEST,
    data,
  };
}

export function addJobSuccess(job) {
  return {
    type: ADD_JOBS_SUCCESS,
    job,
  };
}

export function addJobError(message) {
  return {
    type: ADD_JOBS_ERROR,
    message,
  };
}

export function editJobRequest(data) {
  return {
    type: EDIT_JOBS_REQUEST,
    payload: data,
  };
}

export function editJobSuccess(data) {
  return {
    type: EDIT_JOBS_SUCCESS,
    data,
  };
}

export function editJobError(message) {
  return {
    type: EDIT_JOBS_ERROR,
    message,
  };
}

export function deleteJobRequest(id, domain) {
  return {
    type: DELETE_JOBS_REQUEST,
    payload: {
      id,
      domain,
    },
  };
}

export function deleteJobSuccess(data) {
  return {
    type: DELETE_JOBS_SUCCESS,
    data,
  };
}

export function deleteJobError(message) {
  return {
    type: DELETE_JOBS_ERROR,
    message,
  };
}

export function jobApplicantsRequest(id) {
  return {
    type: JOB_APPLICANTS_REQUEST,
    payload: {
      id,
    },
  };
}

export function jobApplicantsSuccess(data) {
  return {
    type: JOB_APPLICANTS_SUCCESS,
    data,
  };
}

export function jobApplicantsError(message) {
  return {
    type: JOB_APPLICANTS_ERROR,
    message,
  };
}

export function globalApplicantsRequest(id) {
  return {
    type: GLOBAL_APPLICANTS_REQUEST,
    payload: {
      id,
    },
  };
}

export function globalApplicantsSuccess(data) {
  return {
    type: GLOBAL_APPLICANTS_SUCCESS,
    data,
  };
}

export function globalApplicantsError(message) {
  return {
    type: GLOBAL_APPLICANTS_ERROR,
    message,
  };
}

export function upgradeToStudioRequest(id) {
  return {
    type: UPGRADE_TO_STUDIO_REQUEST,
    payload: {
      id,
    },
  };
}

export function upgradeToStudioSuccess(data) {
  return {
    type: UPGRADE_TO_STUDIO_SUCCESS,
    data,
  };
}

export function upgradeToStudioError(message) {
  return {
    type: UPGRADE_TO_STUDIO_ERROR,
    message,
  };
}

export function rejectApplicantRequest(applicantId, jobId) {
  return {
    type: REJECT_APPLICANT_REQUEST,
    payload: {
      applicantId,
      jobId,
    },
  };
}

export function rejectApplicantSuccess(data) {
  return {
    type: REJECT_APPLICANT_SUCCESS,
    data,
  };
}

export function rejectApplicantError(message) {
  return {
    type: REJECT_APPLICANT_ERROR,
    message,
  };
}

export function editStudioRequest(data) {
  return {
    type: EDIT_STUDIO_REQUEST,
    payload: data,
  };
}

export function editStudioSuccess(data) {
  return {
    type: EDIT_STUDIO_SUCCESS,
    data,
  };
}

export function editStudioError(message) {
  return {
    type: EDIT_STUDIO_ERROR,
    message,
  };
}

export function moveApplicantToOtherJobRequest(currentJobId, movedJobId, applicantId) {
  return {
    type: MOVE_APPLICANT_REQUEST,
    payload: {
      currentJobId,
      movedJobId,
      applicantId,
    },
  };
}

export function moveApplicantToOtherJobSuccess(data) {
  return {
    type: MOVE_APPLICANT_SUCCESS,
    data,
  };
}

export function moveApplicantToOtherJobError(message) {
  return {
    type: MOVE_APPLICANT_ERROR,
    message,
  };
}

export function moveGlobalApplicantToJobRequest(movedJobId, applicantId) {
  return {
    type: MOVE_GLOBAL_APPLICANT_REQUEST,
    payload: {
      movedJobId,
      applicantId,
    },
  };
}

export function moveGlobalApplicantToJobSuccess(data) {
  return {
    type: MOVE_GLOBAL_APPLICANT_SUCCESS,
    data,
  };
}

export function moveGlobalApplicantToJobError(message) {
  return {
    type: MOVE_GLOBAL_APPLICANT_ERROR,
    message,
  };
}

export function getRecruiterStudioRequest(id) {
  return {
    type: GET_RECRUITER_STUDIO_REQUEST,
    payload: {
      id,
    },
  };
}

export function getRecruiterStudioRequestSuccess(data) {
  return {
    type: GET_RECRUITER_STUDIO_REQUEST_SUCCESS,
    data,
  };
}

export function getRecruiterStudioRequestError(message) {
  return {
    type: GET_RECRUITER_STUDIO_REQUEST_ERROR,
    message,
  };
}


export function deleteGameRequest(id, studioId) {
  return {
    type: DELETE_GAME_REQUEST,
    payload: {
      id, studioId,
    },
  };
}

export function deleteGameSuccess(data) {
  return {
    type: DELETE_GAME_SUCCESS,
    data,
  };
}

export function deleteGameError(message) {
  return {
    type: DELETE_GAME_ERROR,
    message,
  };
}


export function deleteStudioContentRequest(id, studioId) {
  return {
    type: DELETE_STUDIO_CONTENT_REQUEST,
    payload: {
      id, studioId,
    },
  };
}

export function deleteStudioContentSuccess(data) {
  return {
    type: DELETE_STUDIO_CONTENT_SUCCESS,
    data,
  };
}

export function deleteStudioContentError(message) {
  return {
    type: DELETE_STUDIO_CONTENT_ERROR,
    message,
  };
}

export function toggleView() {
  return {
    type: TOGGLE_VIEW,
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

export function downgradeSubscriptionRequest(data) {
  return {
    type: DOWNGRADE_SUBSCRIPTION,
    data,
  };
}
