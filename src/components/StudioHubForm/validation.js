/*
 * studio hub form validation
 */

import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  studioName: [required],
  firstName: [required],
  lastName: [required],
  jobTitle: [required],
  email: [required, email],
  phone: [required],
});

export default validate;
