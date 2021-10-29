/*
 * Update profile selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the edit state domain
const selectEditDomain = () => state => state.get('profile');

// Default selector used by Edit
const selectEdit = () => createSelector(
  selectEditDomain(),
  state => state.toJS()
);

// export default selectEdit;
export {
  selectEdit,
};
