/*
 * StudioHubForm component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = [
  "studioName",
  "firstName",
  "lastName",
  "jobTitle",
  "email",
  "phone",
];

let StudioHubForm = ({
  fields: { studioName, firstName, lastName, jobTitle, email, phone },
  handleSubmit,
}) => (
  <div className={s.container}>
    <form className={s.root} onSubmit={handleSubmit}>
      <Input label="Studio Name" {...studioName} />
      <Input label="First Name" {...firstName} />
      <Input label="Last Name" {...lastName} />
      <Input label="Job Title" {...jobTitle} />
      <Input label="E-mail" {...email} />
      <Input label="Phone" {...phone} />
      <Button type="submit" text="Claim your free Studio Page" />
    </form>
  </div>
);

StudioHubForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default StudioHubForm = reduxForm({
  form: "studiohubform",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(StudioHubForm);
