/*
 * Side nav selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the side nav state domain
const selectNavDomain = () => state => state.get('sideNav');

// Default selector used by SideNav
const selectNav = () => createSelector(
  selectNavDomain(),
  substate => substate.toJS()
);

const selectShowNav = () => createSelector(
  selectNavDomain(),
  state => state.get('showNav')
);

export default selectNav;
export {
  selectShowNav,
};
