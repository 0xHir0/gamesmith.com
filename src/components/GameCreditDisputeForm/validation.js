import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  comment: [required],
  disputeType: [required],
});

export default validate;
