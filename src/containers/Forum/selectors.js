/*
 * Forum selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the forum state domain
const selectForumDomain = () => state => state.get('forum');

// Default selector used by Forum
// const selectForum = () => createSelector(
//   selectForumDomain(),
//   substate => substate.toJS()
// );

// Default selector used by Jobs
const selectData = () => createSelector(
  selectForumDomain(),
  state => state.get('data')
);

export default selectData;
