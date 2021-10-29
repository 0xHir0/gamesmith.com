/*
 * Recruiter sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { replace, push } from 'react-router-redux';
import { merge, trim } from 'lodash';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  RECRUITER_CONNECTIONS_REQUEST,
  ADD_JOBS_REQUEST,
  POSTED_JOBS_REQUEST,
  DELETE_JOBS_REQUEST,
  EDIT_JOBS_REQUEST,
  JOB_APPLICANTS_REQUEST,
  GLOBAL_APPLICANTS_REQUEST,
  REJECT_APPLICANT_REQUEST,
  EDIT_STUDIO_REQUEST,
  GET_RECRUITER_STUDIO_REQUEST,
  DELETE_GAME_REQUEST,
  DELETE_STUDIO_CONTENT_REQUEST,
  UPGRADE_TO_STUDIO_REQUEST,
  MOVE_APPLICANT_REQUEST,
  MOVE_GLOBAL_APPLICANT_REQUEST,
  NEXT_PAGE_REQUEST,
  DOWNGRADE_SUBSCRIPTION,
  GT_PLUS_REQUEST,
} from './constants';

import {
  recruiterConnectionsSuccess,
  recruiterConnectionsError,
  postedJobSuccess,
  postedJobError,
  addJobSuccess,
  addJobError,
  editJobSuccess,
  editJobError,
  deleteJobSuccess,
  deleteJobError,
  jobApplicantsSuccess,
  jobApplicantsError,
  globalApplicantsSuccess,
  globalApplicantsError,
  upgradeToStudioSuccess,
  upgradeToStudioError,
  rejectApplicantSuccess,
  rejectApplicantError,
  getRecruiterStudioRequestSuccess,
  getRecruiterStudioRequestError,
  editStudioError,
  editStudioSuccess,
  deleteGameError,
  deleteStudioContentError,
  moveApplicantToOtherJobSuccess,
  moveApplicantToOtherJobError,
  moveGlobalApplicantToJobSuccess,
  moveGlobalApplicantToJobError,
  nextPageSuccess,
  nextPageError,
  downgradeSubscriptionSuccess, getRecruiterStudioRequest,
} from './actions';

import { jobsSuccess } from '../Jobs/actions';
import { jobSuccess } from '../Job/actions';
import { editStudioJobSuccess } from '../Studio/actions';

import {
  openMessage,
  openSubscribe,
  closeModal,
} from 'containers/Modals/actions';

// watcher for recruiter data with connections requests
function* recruiterConnectionsRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(RECRUITER_CONNECTIONS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request recruiter with connections data
        const req = yield call(makeRequest, 'GET', {}, `recruiter/${id}`, {
          'X-Auth-Token': token,
        });
        // console.log(req.data)
        // console.log(yield put(recruiterConnectionsSuccess(req.data)));
        yield put(recruiterConnectionsSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(recruiterConnectionsError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(recruiterConnectionsError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

function* postedJobsRequestWatcher() {
  while (true) {
    yield take(POSTED_JOBS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, 'jobcardsForRecruiter', {
          'X-Auth-Token': token,
        });
        yield put(postedJobSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(postedJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(postedJobError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

function* jobApplicantsRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(JOB_APPLICANTS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request job applicants data
        const req = yield call(makeRequest, 'GET', {}, `jobApplicant/${id}?`, {
          'X-Auth-Token': token,
        });
        yield put(jobApplicantsSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(jobApplicantsError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(jobApplicantsError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

function* globalApplicantsRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(GLOBAL_APPLICANTS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request job applicants data
        const req = yield call(makeRequest, 'GET', {}, `globalApplicant/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(globalApplicantsSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(globalApplicantsError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      console.log(e);
      // yield put(globalApplicantsError(e));
      // TODO:40 find a way to keep the url but still display the error page
      // yield put(replace('/error'));
    }
  }
}

function* addJobRequestWatcher() {
  while (true) {
    const { payload: { values: { role, studioId, startDate, expiredAt, jobFamily, country, state, city, platforms, description, imgUrl, youtubeVideoUrl, cvOption, gtOption, workCategories }, countryId, stateId, resolve, reject, toggle } } = yield take(ADD_JOBS_REQUEST);
    let jobIds;
    const workCategoriesIds = [];
    try {
      if (platforms.length < 1) {
        yield call(reject, { jobFamily: 'Platforms are required' });
      } else if (!jobFamily) {
        yield call(reject, { jobFamily: 'Job Families are required' });
      } else if (workCategories.length < 1) {
        yield call(reject, { jobFamily: 'Employment Type is required' });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        // jobIds = jobFamily.map(jf => ({ id: parseInt(jf.value, 10) }));
        workCategories.map(jf => workCategoriesIds.push(jf.id));
        const { token } = yield call(getAuthToken);
        // post job request
        const req = yield call(makeRequest, 'POST', {
          role,
          studioId,
          startDate: startDate ? (`${(new Date(startDate)).getFullYear()}-${(new Date(startDate)).getMonth() + 1}-${(new Date(startDate)).getDate()}`) : '',
          expiredAt: expiredAt ? (`${(new Date(expiredAt)).getFullYear()}-${(new Date(expiredAt)).getMonth() + 1}-${(new Date(expiredAt)).getDate()}`) : '',
          country,
          state,
          city,
          platforms,
          jobFamilyId: parseInt(jobFamily, 10),
          countryId,
          stateId,
          description: trim(description),
          imgUrl,
          youtubeVideoUrl,
          cvOption,
          gtOption,
          workCategories: workCategoriesIds,
        }, 'jobcard/create', {
          'X-Auth-Token': token,
        });
        yield call(resolve);
        req.data.workCategories = req.data.workCategories.map(i => ({ id: i, value: i.toString() }));
        yield put(addJobSuccess(req.data));
        yield put(closeModal());
        yield put(openMessage('Job was successfully posted!', 'blank'));
        // window.location = '/recruiter'
      } else {
        // if expired remove token and user data
        yield call(reject);
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(addJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e)
      yield call(reject, { description: 'Could not add job.' });
      yield put(addJobError(e));
    }
  }
}

function* deleteJobRequestWatcher() {
  while (true) {
    const { payload: { id, domain } } = yield take(DELETE_JOBS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'POST', {}, `jobcard/delete/${id}`, {
          'X-Auth-Token': token,
        });
        if (domain == 'recruiter') {
          yield put(deleteJobSuccess(req.data));
          yield put(openMessage('Job was Successfully deleted', 'blank'));
          yield put(replace('/recruiter'));
        } else {
          yield put(jobsSuccess(req.data));
          yield put(openMessage('Job was Successfully deleted', 'blank'));
          yield put(replace('/jobs'));
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(deleteJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(deleteJobError(e));
      yield put(replace('/?error'));
    }
  }
}

function* editJobRequestWatcher() {
  while (true) {
    const { payload: { values: { jobId, role, studioId, startDate, expiredAt, country, state, city, platforms, jobFamily, description, imgUrl, youtubeVideoUrl, cvOption, gtOption, workCategories }, domain, countryId, stateId, resolve, reject, toggle } } = yield take(EDIT_JOBS_REQUEST);
    const jobWorkCategoriesIds = [];
    try {
      if (platforms.length < 1) {
        yield call(reject, { startDate: 'Platforms are required' });
      } else if (!jobFamily) {
        yield call(reject, { jobFamily: 'Job Family is required' });
      } else if (workCategories.length < 1) {
        yield call(reject, { jobFamily: 'Employment Type is required' });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        workCategories.map(jf => jobWorkCategoriesIds.push(jf.id));
        // post job request
        const req = yield call(makeRequest, 'POST', {
          role,
          studioId,
          startDate: startDate ? (`${(new Date(startDate)).getFullYear()}-${(new Date(startDate)).getMonth() + 1}-${(new Date(startDate)).getDate()}`) : '',
          expiredAt: expiredAt ? (`${(new Date(expiredAt)).getFullYear()}-${(new Date(expiredAt)).getMonth() + 1}-${(new Date(expiredAt)).getDate()}`) : '',
          platforms,
          jobFamilyId: parseInt(jobFamily, 10),
          country,
          state,
          city,
          countryId,
          stateId,
          description: trim(description),
          imgUrl,
          youtubeVideoUrl,
          cvOption: cvOption ? cvOption : 'no',
          gtOption,
          workCategories: jobWorkCategoriesIds,
      }, `jobcard/update/${jobId}`, {
        'X-Auth-Token': token,
      });
        yield call(resolve);
        if (domain === 'job') {
          yield put(jobSuccess(req.data.filter(j => j.id == jobId)[0]));
          yield put(closeModal());
          yield put(openMessage('Job was successfully updated!', 'blank'));
          yield call(toggle);
          yield put(replace(`/job/${jobId}`));
        } else if (domain === 'recruiter') {
          req.data.map((js, i) => req.data[i].workCategories = js.workCategories.map(j => ({ id: j, value: j.toString() })));
          yield put(editJobSuccess(req.data));
          yield put(closeModal());
          yield put(openMessage('Job was successfully updated!', 'blank'));
          // yield put(replace('/recruiter'));
        } else if (domain === 'studio') {
          yield put(editStudioJobSuccess(req.data));
          yield put(closeModal());
          yield put(openMessage('Job was successfully updated!', 'blank'));
        }
      } else {
        // if expired remove token and user data
        yield call(reject);
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(editJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e)
      yield call(reject, { description: 'Could not update job.' });
      yield put(editJobError(e));
    }
  }
}

function* rejectApplicantRequestWatcher() {
  while (true) {
    const { payload: { applicantId, jobId } } = yield take(REJECT_APPLICANT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        yield call(makeRequest, 'POST', {}, `job/${jobId}/reject/applicant/${applicantId}`, {
          'X-Auth-Token': token,
        });
        yield put(rejectApplicantSuccess({ applicantId, jobId }));
        yield put(openMessage('Applicant was Successfully Rejected', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(rejectApplicantError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield put(rejectApplicantError(e));
      yield put(replace('/?error'));
    }
  }
}

function* deleteGameRequestWatcher() {
  while (true) {
    const { payload: { id, studioId } } = yield take(DELETE_GAME_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        yield call(makeRequest, 'POST', {}, `studio/${studioId}/studiogame/${id}/delete`, {
          'X-Auth-Token': token,
        });
        yield put(openMessage('Studio Game Deleted Successfully', 'blank'));
        yield put(replace('/recruiter'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(deleteGameError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(deleteGameError(e));
      yield put(replace('/?error'));
    }
  }
}

function* deleteStudioContentRequestWatcher() {
  while (true) {
    const { payload: { id, studioId } } = yield take(DELETE_STUDIO_CONTENT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        yield call(makeRequest, 'POST', {}, `studio/${studioId}/studiocontent/${id}/delete`, {
          'X-Auth-Token': token,
        });
        yield put(openMessage('Video Link Deleted Successfully', 'blank'));
        yield put(openMessage('Deleted Successfully', 'blank'));
        yield put(replace('/recruiter'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(deleteStudioContentError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(deleteStudioContentError(e));
      yield put(replace('/?error'));
    }
  }
}

function* editStudioRequestWatcher() {
  while (true) {
    const { payload: { values: { id, name, location, websiteLink, email, platforms, employeeCountId, description, logo, heroUrl, bannerUrl, games, videos, images }, resolve, reject } } = yield take(EDIT_STUDIO_REQUEST);
    try {
      const contactEmail = email;
      if (platforms.length < 1) {
        // yield call(reject, { description: 'Platforms are required' });
        yield put(openMessage('Error !', 'Platforms can not be empty.'));
      } else if (!employeeCountId) {
        yield put(openMessage('Error !', 'Employees Count can not be empty.'));
        // yield call(reject, { description: 'Employees Count is required' });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, 'POST', {
          name: trim(name),
          contactEmail,
          location,
          websiteLink,
          platforms,
          description: trim(description),
          logo,
          heroUrl,
          bannerUrl,
          employeeCountId,
        }, `studio/update/${id}`, {
          'X-Auth-Token': token,
        });
        if (games.length > 0) {
          const req2 = yield call(makeRequest, 'POST',
            JSON.stringify(games), `studio/${id}/gamesupdate`, {
              'X-Auth-Token': token, 'Content-Type': 'application/json',
            });
        }
        if (videos.length > 0 || images.length > 0) {
          const req3 = yield call(makeRequest, 'POST',
            JSON.stringify(videos.concat(images)), `studio/${id}/contentsupdate`, {
              'X-Auth-Token': token, 'Content-Type': 'application/json',
            });
        }
        const studioReq = yield call(makeRequest, 'GET', {}, `studiocard/${id}?isShow=true`, {
          'X-Auth-Token': token,
        });
        yield put(editStudioSuccess(studioReq.data));
        yield put(openMessage('Studio Updated Successfully', 'blank'));
        yield put(replace('/recruiter'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(editStudioError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield call(reject, { name: 'Could not update studio. Please Check all fields.' });
      yield put(editStudioError(e));
    }
  }
}

// watcher for studio  requests
function* getRecruiterStudioRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(GET_RECRUITER_STUDIO_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, 'GET', {}, `studiocard/${id}?isShow=true`, {
          'X-Auth-Token': token,
        });
        req.data.jobs.map((js, i) => req.data.jobs[i].workCategories = js.workCategories.map(j => ({ id: j, value: j.toString() })));
        yield put(getRecruiterStudioRequestSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(getRecruiterStudioRequestError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(getRecruiterStudioRequestError(e));
      yield put(replace('/error'));
    }
  }
}

function* studioToUpgradeRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(UPGRADE_TO_STUDIO_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'POST', {}, `upgrade/request/studio/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(openMessage('Upgrade to Studio Request Successfully Sent', 'Sit back and relax. We will reach out to your account owner.'));
        yield put(upgradeToStudioSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(upgradeToStudioError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(upgradeToStudioError(e));
      yield put(replace('/?error'));
    }
  }
}

function* moveApplicantToOtherJobRequestWatcher() {
  while (true) {
    const { payload: { currentJobId, movedJobId, applicantId } } = yield take(MOVE_APPLICANT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        yield call(makeRequest, 'POST', {}, `moveJobApplicant?currentJobId=${currentJobId}&movedJobId=${movedJobId}&applicantId=${applicantId}`, {
          'X-Auth-Token': token,
        });
        yield put(moveApplicantToOtherJobSuccess({ applicantId, currentJobId, movedJobId }));
        yield put(openMessage('Applicant Successfully Moved', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(moveApplicantToOtherJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      console.log(e);
      yield put(moveApplicantToOtherJobError(e));
      if (e.response.data.applied) {
        yield put(openMessage('Already Applied', e.response.data.applied));
      } else {
        yield put(replace('/?error'));
      }
    }
  }
}

function* moveGlobalApplicantToJobRequestWatcher() {
  while (true) {
    const { payload: { movedJobId, applicantId } } = yield take(MOVE_GLOBAL_APPLICANT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);

        const req = yield call(makeRequest, 'POST', {}, `moveGlobalApplicant?movedJobId=${movedJobId}&applicantId=${applicantId}`, {
          'X-Auth-Token': token,
        });
        const applicants = req.data;
        yield put(moveGlobalApplicantToJobSuccess({ applicants, movedJobId }));
        yield put(openMessage('Applicant Successfully Moved to Job', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(moveGlobalApplicantToJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(moveGlobalApplicantToJobError(e));
      if (e.response.data.applied) {
        yield put(openMessage('Already Applied', e.response.data.applied));
      } else {
        yield put(replace('/?error'));
      }
    }
  }
}
function* nextPageRequestWatcher() {
  while (true) {
    const { payload: { url, offset, query } } = yield take(NEXT_PAGE_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, `${url}?${query && `q=${query}&`}offset=${offset}`, {
          'X-Auth-Token': token,
        });
        yield put(nextPageSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(nextPageError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

// Watcher for downgrading studio plan

function* downgradeSubscriptionRequestWatcher() {
  while (true) {
    const { data: { id, plan } } = yield take(DOWNGRADE_SUBSCRIPTION);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, 'POST', {}, `downgradeStudio/${id}/${plan}`, { 'X-Auth-Token': token });
        if (req.status === 200) {
          yield put(openSubscribe('Plan cancelled.', 'blank', {email: 'support@gamesmith.com', startMessage: 'For any questions, you can reach out to', endMessage: 'or through live chat.' }));
          yield put(getRecruiterStudioRequest(id));
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function* gtPlusRequestWatcher() {
  while (true) {
    const { data: { id, gtOption, role } } = yield take(GT_PLUS_REQUEST);
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const req = yield call(makeRequest, 'POST', {}, `jobcard/updateGtPlus/${id}/${gtOption}/${role}`, { 'X-Auth-Token': token });
        // yield put(editJobSuccess(req.data))
        if (req.status === 200) {
          // yield put(openMessage('Success!', ` Successfully downgraded to ${plan} plan .`));
          // yield put(getRecruiterStudioRequest(studioId));
        }
        yield put(editJobSuccess(req.data));
        yield put(openMessage(`Job was successfully ${gtOption === 'yes' ? 'added to ' : 'removed from '} GT+`, 'blank'));
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default [
  recruiterConnectionsRequestWatcher,
  postedJobsRequestWatcher,
  addJobRequestWatcher,
  deleteJobRequestWatcher,
  jobApplicantsRequestWatcher,
  globalApplicantsRequestWatcher,
  rejectApplicantRequestWatcher,
  editJobRequestWatcher,
  editStudioRequestWatcher,
  getRecruiterStudioRequestWatcher,
  deleteGameRequestWatcher,
  deleteStudioContentRequestWatcher,
  studioToUpgradeRequestWatcher,
  moveApplicantToOtherJobRequestWatcher,
  moveGlobalApplicantToJobRequestWatcher,
  nextPageRequestWatcher,
  downgradeSubscriptionRequestWatcher,
  gtPlusRequestWatcher,
];
