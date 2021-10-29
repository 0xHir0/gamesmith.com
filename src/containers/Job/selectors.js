/*
 * Job selectors
 */

import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

import { selectUser } from 'containers/App/selectors';

// Direct selector to the job state domain
const selectJobDomain = () => state => state.get('job');

// Default selector used by Job
const selectJob = () => createSelector(
  selectJobDomain(),
  job => job.toJS()
);

const selectPhoneValidated = () => createSelector(
  selectUser(),
  user => (!isEmpty(user) ? (user.maker ? user.maker.phoneNumberValidated : user.recruiter.phoneNumberValidated) : false)
);

export default selectJob;

export {
  selectPhoneValidated,
};
