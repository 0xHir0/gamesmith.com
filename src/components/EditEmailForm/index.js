/*
 * Auth form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

export const fields = ["oldemail", "newemail", "password"];

let EditEmailForm = ({
  fields: { oldemail, newemail, password },
  handleSubmit,
  error,
}) => (
  <form onSubmit={handleSubmit}>
    <Input label="Old Email" {...oldemail} />
    <Input label="New Email" {...newemail} />
    <Input label="Password" type="password" {...password} />
    {error && <div className="error">{error}</div>}
    <Button type="submit" text="Save" />
  </form>
);

EditEmailForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditEmailForm = reduxForm({
  form: "editemail",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(EditEmailForm);
