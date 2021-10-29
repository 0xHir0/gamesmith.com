/*
 * Auth form validation
 */

import { createValidator, minLength, required, email } from 'utils/validation';

const validate = createValidator({
  email: [email, required],
  password: [minLength(6), required],
});

export default validate;
