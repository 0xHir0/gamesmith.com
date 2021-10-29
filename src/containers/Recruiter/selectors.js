/*
 * Recruiter selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the recruiter state domain
const selectRecruiterDomain = () => state => state.get('recruiter');

// Default selector used by Recruiter
const selectRecruiter = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('recruiter').toJS()
);

const selectJobs = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('jobs').toJS()
);

const selectJobApplicants = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('jobApplicants').toJS()
);

const selectGlobalApplicants = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('globalApplicants').toJS()
);

const selectIsFetching = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('isFetching')
);

const selectIsGlobalFetching = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('isGlobalFetching')
);

const selectIsGlobalView = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('isGlobalView')
);

const selectIsJobApplicantFetching = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('isJobApplicantFetching')
);

// Default selector used by Studio
const selectStudio = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('studio').toJS()
);

const selectIsLastPage = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('isLastPage')
);

const selectIsStudioPaying = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('isStudioPaying')
);

export {
  selectRecruiter,
  selectJobs,
  selectJobApplicants,
  selectGlobalApplicants,
  selectStudio,
  selectIsFetching,
  selectIsGlobalFetching,
  selectIsJobApplicantFetching,
  selectIsGlobalView,
  selectIsLastPage,
  selectIsStudioPaying,
};
