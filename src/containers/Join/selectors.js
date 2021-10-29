/*
 * Join selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the join state domain
const selectJoinDomain = () => state => state.get('join');

// Default selector used by Join
const selectJoin = () => createSelector(
  selectJoinDomain(),
  substate => substate.toJS()
);

export default selectJoin;
