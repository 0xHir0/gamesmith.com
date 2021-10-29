/*
 * Funding selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the funding state domain
const selectFundingDomain = () => state => state.get('funding');

// Default selector used by Funding
const selectFunding = () => createSelector(
  selectFundingDomain(),
  substate => substate.toJS()
);

export default selectFunding;
