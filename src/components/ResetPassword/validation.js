/*
 * Reset Password validation
 */

import { createValidator, match, notMatch, minLength, required, email } from 'utils/validation';

const validate = createValidator({
  newPassword: [minLength(6), required],
  confirmPassword: [minLength(6), match('newPassword', 'new password'), required]
});

export default validate;
