/*
 * Employer form validation
 */

import { createValidator, minLength, required, email } from 'utils/validation';

const validate = createValidator({
  company: [required],
  first_name: [required],
  last_name: [required],
  email: [email, required],
  phone: [required, minLength(9)],
});

export default validate;
