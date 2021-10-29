/*
 * Employer form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import Phone from "components/UI/Phone";
import crystalImg from "./img/crystal.png";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = ["company", "first_name", "last_name", "email", "phone"];

let EmployerForm = ({
  fields: { company, first_name, last_name, email, phone },
  handleSubmit,
}) => {
  return (
    <div>
      <div className={s.padding}>
        <h2 style={{ color: "yellow" }}>Let's get you set up</h2>
        <h2>Simply apply and we will get you onboarded.</h2>
        <p>
          90% of game professionals are interested in hearing about new
          opportunities.
        </p>
      </div>
      {/*<div className={s.padding}>*/}
      {/*<img src={crystalImg} alt="crystal-img" width={100}/>*/}
      {/*<h2>Ready to find your next great hire?</h2>*/}
      {/*<p>90% of game professionals are interested in hearing about new opportunities.</p>*/}
      {/*</div>*/}
      <div style={{ backgroundColor: "#3c3c3c" }}>
        <div className={`col-sm-8 col-sm-offset-2`}>
          <form className={s.root} onSubmit={handleSubmit}>
            <Input label="First Name" className={s.first} {...first_name} />
            <Input label="Last Name" className={s.last} {...last_name} />
            <Input label="Email" className={s.first} type="email" {...email} />
            <Phone label="Phone" className={s.last} {...phone} />
            <Input label="Company" {...company} />
            <Button type="submit" className={s.btn} text="Apply" />
          </form>
        </div>
      </div>
    </div>
  );
};

EmployerForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EmployerForm = reduxForm({
  form: "employerForm",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(EmployerForm);
