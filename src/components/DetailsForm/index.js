/*
 * Details form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import markedSquare from "../PaidFiltersForm/img/markedSquare.png";
import emptySquare from "../PaidFiltersForm/img/emptySquare.png";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = [
  "firstName",
  "lastName",
  "email",
  "currRole",
  "currCompany",
  "language",
];
const ismobile = window.innerWidth <= 1150;
let DetailsForm = ({
  fields: {
    firstName,
    lastName,
    email,
    currRole = isStudent ? "Student" : "unset",
    currCompany,
    language,
  },
  makerEmails,
  isDirectRequest,
  handleSubmit,
  languageOptions,
  checkStudent,
  isStudent,
}) => (
  <form onSubmit={handleSubmit}>
    <Input label="First Name" {...firstName} />
    <Input label="Last Name" {...lastName} />
    <Input
      label="Email address"
      {...email}
      className={s.bginput}
      style={{ backgroundColor: "#404040" }}
      disabled
    />
    {/* {!isDirectRequest && <Input label="Email" {...email} disabled />}*/}
    {/* {isDirectRequest && makerEmails.length === 1 && <Input label="Email" {...email} disabled />}*/}
    {/* {isDirectRequest && makerEmails.length !== 1 && <MakerEmailRadionButton label="Select Primary Email" makerEmails={makerEmails} email={email}/>}*/}
    <Input label="Most Recent Job Title" {...currRole} />
    <Input label="Most Recent Employer" {...currCompany} />
    {/* <div style={ismobile ? {display: 'none'} : null}>*/}
    {/* <MultiSelect className="input" placeholder="Select Language..." options={languageOptions} label="Languages Spoken"  {...language} />*/}
    {/* <div className={s.terms}>*/}
    {/*  <span>By joining, you agree to the&nbsp;</span>*/}
    {/*  <a className={s.termsandpolicy} href="/terms" target="_blank">Terms & Privacy Policy</a>*/}
    {/* </div>*/}
    {/* </div>*/}
    <div className={s.studentBox}>
      <p>If you are a student, please check the box.</p>
      <p onClick={() => checkStudent()}>
        <img
          className={s.radioButton}
          alt={"check"}
          src={isStudent ? markedSquare : emptySquare}
        />
        I am a student
      </p>
    </div>
    <Button
      style={
        ismobile
          ? {
              lineHeight: "44px",
              backgroundColor: "#f8e81c",
              width: "219px",
              marginBottom: "10px",
            }
          : null
      }
      type="submit"
      text="Next"
    />
    <br />
    <br />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="110"
      height="10"
      viewBox="0 0 104 10"
    >
      <g id="Progress" transform="translate(-155 -806)">
        <rect
          id="Yellow"
          width="21"
          height="10"
          rx="5"
          transform="translate(155 806)"
          fill="#fd0"
        />
        <rect
          id="_2"
          data-name="2"
          width="11"
          height="10"
          rx="5"
          transform="translate(185 806)"
          fill="#1c1c1c"
        />
        <rect
          id="_3"
          data-name="3"
          width="11"
          height="10"
          rx="5"
          transform="translate(206 806)"
          fill="#1c1c1c"
        />
        <rect
          id="_4"
          data-name="4"
          width="11"
          height="10"
          rx="5"
          transform="translate(228 806)"
          fill="#1c1c1c"
        />
        <rect
          id="_5"
          data-name="5"
          width="11"
          height="10"
          rx="5"
          transform="translate(249 806)"
          fill="#1c1c1c"
        />
        {/*<rect id="_6" data-name="6" width="11" height="10" rx="5" transform="translate(271 806)" fill="#1c1c1c"/>*/}
      </g>
    </svg>
  </form>
);

DetailsForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  languageOptions: PropTypes.array.isRequired,
  makerEmails: PropTypes.array,
  isDirectRequest: PropTypes.bool,
  checkStudent: PropTypes.func.isRequired,
  isStudent: PropTypes.bool.isRequired,
};

export default DetailsForm = reduxForm({
  form: "details",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(DetailsForm);
