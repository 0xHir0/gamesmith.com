/*
 * Edit Linked users Email
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

export const fields = ["oldemail", "newemail", "password"];

let EditLinkedInEmailForm = ({
  fields: { oldemail, newemail, password },
  handleSubmit,
  error,
}) => (
  <form onSubmit={handleSubmit}>
    <Input label="Old Email" {...oldemail} />
    <Input label="New Email" {...newemail} />
    <Input label="New Password" type="password" {...password} />
    {error && <div className="error">{error}</div>}
    <Button type="submit" text="Save" />
  </form>
);

EditLinkedInEmailForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EditLinkedInEmailForm = reduxForm({
  form: "editlinkedinemail",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(EditLinkedInEmailForm);
