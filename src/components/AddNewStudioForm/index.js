/*
 * AddStudioForm component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import validate from "./validation";
import s from "./styles.module.scss";

export const fields = ["firstName", "lastName", "company", "email"];

let AddStudioForm = ({
  fields: { firstName, lastName, company, email },
  handleSubmit,
  label,
}) => {
  return (
    <div>
      <form className={s.root} onSubmit={handleSubmit}>
        <div>
          <div className={s.left}>
            <Input label="First Name" open {...firstName} />
          </div>
          <div className={s.right}>
            <Input label="Last name" open {...lastName} />
          </div>
        </div>
        <Input label="Company Name" open {...company} />
        <Input label="Email" open {...email} />
        <Button type="submit" text="send" />
      </form>
      <div className={s.bottomText}>
        <p>
          Once received we will email you and find a time to get you set up!
        </p>
      </div>
    </div>
  );
};

AddStudioForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default AddStudioForm = reduxForm({
  form: "add-studio",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddStudioForm);
