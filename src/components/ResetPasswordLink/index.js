/*
 * Reset Password Link component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

export const fields = ["email"];

let ResetPasswordLink = ({ fields: { email }, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Input label="Email" {...email} />
    <Button type="submit" text="Request Password" />
  </form>
);

ResetPasswordLink.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordLink = reduxForm({
  form: "auth",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(ResetPasswordLink);
