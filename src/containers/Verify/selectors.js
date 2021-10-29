/*
 * Verify selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the verify state domain
const selectVerifyDomain = () => state => state.get('verify');

// Default selector used by Verify
const selectVerify = () => createSelector(
  selectVerifyDomain(),
  substate => substate.toJS()
);

export default selectVerify;
