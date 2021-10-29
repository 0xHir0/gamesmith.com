/*
 * Auth form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";
import s from "./styles.module.scss";
const ismobile = window.innerWidth <= 1150;

export const fields = [
  "firstName",
  "lastName",
  "email",
  "currCompany",
  "password",
  "currGame",
  "currRole",
];

let SignUpForm = ({
  fields: {
    firstName,
    lastName,
    email,
    password,
    currCompany,
    currGame,
    currRole,
  },
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Input label="First Name" className={s.first} {...firstName} />
    <Input label="Last Name" className={s.last} {...lastName} />
    <Input label="Email" {...email} />
    {/* <Input label="Password" type="password" {...password} />*/}
    {/* <div style={ ismobile ? {display: 'none'} : {display: 'block'}}>*/}
    <Input label="Most Recent Job Title" {...currRole} />
    <Input label="Most Recent Employer" {...currCompany} />
    {/* </div>*/}
    <Button
      type="submit"
      style={ismobile ? { background: "#f8e81c", lineHeight: "42px" } : {}}
      text="OK"
    />
  </form>
);

SignUpForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SignUpForm = reduxForm({
  initialValues: {
    currCompany: "",
    currRole: "",
  },
  form: "signup",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SignUpForm);
