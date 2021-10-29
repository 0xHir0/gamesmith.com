/*
 * Education form validation
 */

import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  school: [required],
  major: [required],
});

export default validate;
