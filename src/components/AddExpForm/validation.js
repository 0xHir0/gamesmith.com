/*
 * Add experience form validation
 */

import { createValidator, required, startYearRequired, endYearValidate } from 'utils/validation';

const validate = createValidator({
  currRole: [required],
  currGame: [required],
  company: [required],
  // startYear: [required],
  // endYear: [endYearValidate],
  // location: [required],
  // accomplishments: [required],
  // softwareUsed: [required],
});

export default validate;
