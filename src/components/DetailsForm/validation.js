/*
 * Details form validation
 */

import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
  currRole: [required],
  currCompany: [required],
  email: [email, required],
});

export default validate;
