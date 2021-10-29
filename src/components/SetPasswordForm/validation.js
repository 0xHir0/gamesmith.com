/*
 * Set Password validation
 */

import { createValidator, minLength, required } from 'utils/validation';

const validate = createValidator({
  password: [minLength(8), required],
});

export default validate;
