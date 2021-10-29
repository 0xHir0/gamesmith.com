/*
 * OnBoarding selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the onBoarding state domain
const selectOnBoardingDomain = () => state => state.get('onBoarding');

// Default selector used by OnBoarding
const selectOnBoarding = () => createSelector(
  selectOnBoardingDomain(),
  substate => substate.toJS()
);

export default selectOnBoarding;
