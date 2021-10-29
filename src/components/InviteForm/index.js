/*
 * Invite form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = ["email"];

let InviteForm = ({ fields: { email }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="Email" open {...email} />
    <Button type="submit" text="Send" />
  </form>
);

InviteForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default InviteForm = reduxForm({
  form: "invite",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(InviteForm);
