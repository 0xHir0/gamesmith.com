/*
 * RecruiterPeople selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the recruiter state domain
const selectRecruiterPeopleDomain = () => state => state.get('recruiterPeople');

// Default selector used by Recruiter
const selectContactDetailCount = () => createSelector(
  selectRecruiterPeopleDomain(),
  state => state.get('contactDetailCount')
);

export {
  selectContactDetailCount,
};
