/*
 * Add Studio form validation
 */

import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
  company: [required],
  email: [required, email],
});

export default validate;
