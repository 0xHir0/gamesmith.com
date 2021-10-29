/*
 * Reset Password selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the reset password state domain
const selectResetPasswordDomain = () => state => state.get('resetpassword');

// Default selector used by reset password
const selectResetPassword = () => createSelector(
  selectResetPasswordDomain(),
  substate => substate.toJS()
);

export default selectResetPassword;
