/*
 * Salary Calculator filter form validation
 */

import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  title: [required],
});

export default validate;
