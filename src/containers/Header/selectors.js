/*
 * Header selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the header state domain
const selectHeaderDomain = () => state => state.get('header');

// Default selector used by Header
const selectHeader = () => createSelector(
  selectHeaderDomain(),
  substate => substate.toJS()
);

const selectIsOpen = () => createSelector(
  selectHeaderDomain(),
  state => state.get('isOpen')
);


export default selectHeader;
export {
  selectIsOpen,
};
