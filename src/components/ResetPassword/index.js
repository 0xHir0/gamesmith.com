/*
 * Reset Password component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

export const fields = ["newPassword", "confirmPassword"];

let ResetPassword = ({
  fields: { newPassword, confirmPassword },
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Input label="New Password" type="password" {...newPassword} />
    <Input label="Confirm Password" type="password" {...confirmPassword} />
    <Button type="submit" text="Reset Password" />
  </form>
);

ResetPassword.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ResetPassword = reduxForm({
  form: "auth",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(ResetPassword);
