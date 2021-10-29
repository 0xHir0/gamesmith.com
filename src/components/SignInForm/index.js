/*
 * Sing In component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import validate from "./validation";
import s from "./styles.module.scss";
const ismobile = window.innerWidth <= 1150;

export const fields = ["email", "password"];

let SignInForm = ({
  fields: { email, password },
  onForgetPassword,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={s.root} style={{ width: "300px" }}>
      <h3>Sign In</h3>
      <Input label="Email" {...email} />
      <Input label="Password" type="password" {...password} />
      <Button
        type="submit"
        style={ismobile ? { background: "#f8e81c", lineHeight: "42px" } : {}}
        text="OK"
      />
    </div>
    <div className={s.term}>
      By using Gamesmith, I agree to the{" "}
      <a href="/terms" className="links">
        <u>Terms, Conditions and Privacy Policy</u>
      </a>
      <div className="links">
        <p>
          <a onClick={onForgetPassword}>Forgot Password?</a>
        </p>
        <p>
          New to Gamesmith?{" "}
          <a href="/signup" className="links">
            <strong>Join Now</strong>
          </a>
        </p>
      </div>
    </div>
  </form>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onForgetPassword: PropTypes.func.isRequired,
};

export default SignInForm = reduxForm({
  initialValues: {},
  validate,
  form: "signin",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SignInForm);
