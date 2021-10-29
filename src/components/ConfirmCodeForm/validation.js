/*
 * Apply sms form validation
 */

import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  code: [required],
});

export default validate;
