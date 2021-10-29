/*
 * Studio selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the studio state domain
const selectStudioDomain = () => state => state.get('studio');

// Default selector used by Studio
const selectStudio = () => createSelector(
  selectStudioDomain(),
  state => state.get('studio').toJS()
);

// Default selector used by Studio Jobs
const selectStudioJobs = () => createSelector(
  selectStudioDomain(),
  state => state.get('jobs').toJS()
);

const selectIsFetching = () => createSelector(
  selectStudioDomain(),
  state => state.get('isFetching')
);

const selectIsJobsNumberClicked = () => createSelector(
  selectStudioDomain(),
  state => state.get('isNumberOfJobsclicked')
);

const selectRecruiter = () => createSelector(
  selectStudioDomain(),
  state => state.get('recruiter')
);


export default selectStudio;

export {
  selectStudioJobs,
  selectIsFetching,
  selectIsJobsNumberClicked,
  selectRecruiter,
};
