/*
 * Unsubscribe selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the unsubscribe state domain
const selectUnsubscribeDomain = () => state => state.get('unsubscribe');

// Default selector used by Unsubscribe
const selectUnsubscribe = () => createSelector(
  selectUnsubscribeDomain(),
  substate => substate.toJS()
);

export default selectUnsubscribe;
