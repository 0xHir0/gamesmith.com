/*
 * Passion form validation
 */

import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  jobFamily: [required],
});

export default validate;