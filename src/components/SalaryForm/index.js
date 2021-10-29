/*
 * salary form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = ["salary"];

let SalaryForm = ({ fields: { salary }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="Current Salary Per Year" open {...salary} placeholder="$" />
    <Button type="submit" text="Compare Salary" />
  </form>
);

SalaryForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SalaryForm = reduxForm({
  form: "salaryform",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SalaryForm);
