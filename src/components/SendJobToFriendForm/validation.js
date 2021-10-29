import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({

  // jobTitle: [required],
  email: [required, email],
  // subject: [required],
  name: [required],
});

export default validate;