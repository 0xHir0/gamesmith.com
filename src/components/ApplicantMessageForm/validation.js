import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  message: [required],
});

export default validate;