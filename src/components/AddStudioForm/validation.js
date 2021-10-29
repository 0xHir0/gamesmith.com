import { createValidator, required, email, requiredYoutubeLink } from 'utils/validation';

const validate = createValidator({
  email: [email, required],
  name: [required],
  location: [required],
  description: [required],
  // employeeCountId: [required],
  // logo: [required],
  // heroUrl: [required],
  // bannerUrl: [required],
  // games: [required],
  // studioContent: [requiredYoutubeLink],
});

export default validate;