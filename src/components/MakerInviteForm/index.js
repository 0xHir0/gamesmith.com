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

export const fields = ["firstName", "lastName", "email"];

let MakerInviteForm = ({
  fields: { firstName, lastName, email },
  handleSubmit,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="First Name" open {...firstName} />
    <Input label="Last Name" open {...lastName} />
    <Input label="Email" open {...email} />
    <Button type="submit" text="Send" />
  </form>
);

MakerInviteForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MakerInviteForm = reduxForm({
  form: "makerinvite",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(MakerInviteForm);
