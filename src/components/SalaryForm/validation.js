/*
 * salary form validation
 */

import { createValidator, required, amount } from 'utils/validation';

const validate = createValidator({
  salary: [required, amount],
});

export default validate;
