/*
 * Passion form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import FamilySelect from "components/UI/Select";
import JobFamilyData from "../../data/jobPassions";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = ["jobFamily"];

let PassionForm = ({ fields: { jobFamily }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <FamilySelect
      label="Select Passion(s)"
      open
      options={JobFamilyData}
      {...jobFamily}
      multi
    />
    <Button type="submit" text="Next" />
  </form>
);

PassionForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PassionForm = reduxForm({
  form: "passion",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(PassionForm);
