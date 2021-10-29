/*
 * AddJobForm validation
 */

import { createValidator, required, Daterequired } from 'utils/validation';

const validate = createValidator({
  role: [required],
  startDate: [Daterequired],
  expiredAt: [Daterequired],
  description: [required],
  // country:[required],
  // state:[required],
  // city:[required],
});

export default validate;
