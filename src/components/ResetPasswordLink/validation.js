/*
 * Reset Password Link validation
 */

import { createValidator, minLength, required, email } from 'utils/validation';

const validate = createValidator({
  email: [email, required],
});

export default validate;
