/*
 * Studio Message form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import validate from "./validation";
import Button from "components/UI/Button";
import Input from "components/UI/Input";

import s from "./styles.module.scss";

export const fields = [
  "name",
  "jobTitle",
  "email",
  "telephone",
  "studioId",
  "message",
];

let StudioMessageForm = ({
  fields: { name, jobTitle, email, telephone, message },
  handleSubmit,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <h5 className={s.setColor}>Thank you for your interest in our Studio</h5>
    <p>We'll be in touch shortly with more information</p>
    <Input label="Name" open {...name} />
    <Input label="Your Job Title" open {...jobTitle} />
    <Input label="Email" open {...email} />
    <Input label="Telephone" open {...telephone} />
    <Input label="Message" type="textarea" open {...message} />
    <Button type="submit" text="Send" />
  </form>
);

StudioMessageForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default StudioMessageForm = reduxForm({
  form: "studio-message",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(StudioMessageForm);
