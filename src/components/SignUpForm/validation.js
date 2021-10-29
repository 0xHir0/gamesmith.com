/*
 * Auth form validation
 */

import { createValidator, minLength, required, email } from 'utils/validation';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
  email: [email, required],
  // password: [minLength(8), required],
  currCompany: [required],
  currRole: [required],
 });

export default validate;
