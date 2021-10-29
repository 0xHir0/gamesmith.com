/*
 * Settings form validation
 */

import { createValidator, minLength, match, notMatch } from 'utils/validation';

const validate = createValidator({
  oldPassword: [minLength(6)],
  newPassword: [minLength(6), notMatch('oldPassword', 'current password')],
  confirmPassword: [minLength(6), match('newPassword', 'new password')],
});

export default validate;
