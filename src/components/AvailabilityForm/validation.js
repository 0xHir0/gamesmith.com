/*
 * Availability validation
 */

import { createValidator, required, selectAvailablity } from 'utils/validation';

const validate = createValidator({
  availability: [required],
});

export default validate;
