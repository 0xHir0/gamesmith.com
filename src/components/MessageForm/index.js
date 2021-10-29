/*
 * Message form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import s from "./styles.module.scss";

export const fields = ["subject", "message"];

let MessageForm = ({ fields: { subject, message }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="Subject" open {...subject} />
    <Input label="Message" type="textarea" {...message} />
    <Button type="submit" text="Send" />
  </form>
);

MessageForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MessageForm = reduxForm({
  form: "messaging",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(MessageForm);
