/*
 * Update Profile validation
 */

import { createValidator, required, selectAvailablity } from 'utils/validation';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
  availability: [required],
  country: [required],
  jobsFamily: [required]
});

export default validate;
