/*
 * Auth form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

export const fields = ["email", "password"];

let AuthForm = ({ fields: { email, password }, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Input label="Email" {...email} />
    <Input label="Password" type="password" {...password} />
    <Button type="submit" text="Sign In" />
  </form>
);

AuthForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AuthForm = reduxForm({
  form: "auth",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AuthForm);
