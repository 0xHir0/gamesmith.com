/*
 * Apply Sms form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Phone from "components/UI/Phone";

import s from "./styles.module.scss";

export const fields = ["phone", "jobId", "studioId"];

let ApplySmsForm = ({ fields: { phone }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p>Please provide your phone number, So the studio may contact you.</p>
    <Phone label="Phone" {...phone} />
    <Button type="submit" text="Continue" />
  </form>
);

ApplySmsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ApplySmsForm = reduxForm({
  form: "sms",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(ApplySmsForm);
