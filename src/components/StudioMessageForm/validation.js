import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  name: [required],
  jobTitle: [required],
  email: [required, email],
  telephone: [required],
  message: [required],
});

export default validate;