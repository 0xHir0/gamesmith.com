/*
 * Auth form validation
 */

import { createValidator, minLength, required, email } from 'utils/validation';

const validate = createValidator({
  oldemail: [email, required],
  newemail: [email, required],
  password: [minLength(8), required],
});

export default validate;
