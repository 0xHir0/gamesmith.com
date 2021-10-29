/*
 * Invite form validation
 */

import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  email: [email, required],
  firstName: [required],
  lastName: [required],
});

export default validate;
