/*
 * Location validation
 */

import { createValidator, required, selectAvailablity } from 'utils/validation';

const validate = createValidator({
  country:[required],
  // state:[required],
  city:[required],
});

export default validate;
