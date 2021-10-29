/*
 * Message form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import validate from "./validation";
import s from "./styles.module.scss";

export const fields = ["message", "applicantId", "jobId"];

let ApplicantMessageForm = ({
  fields: { message, applicantId, jobId },
  maker,
  handleSubmit,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p className={s.align}>
      <p>
        <b>Candidate</b>
      </p>
      {`${maker.firstName} ${maker.lastName}`}
    </p>
    <p className={s.align}>
      <p>
        <b>Location</b>
      </p>{" "}
      {`${maker.location}`}
    </p>
    <p className={s.align}>
      <p>
        <b>Role</b>
      </p>{" "}
      {`${maker.currRole}`}
    </p>
    <Input label="Message" type="textarea" open {...message} />
    <Button type="submit" text="Send" />
  </form>
);

ApplicantMessageForm.propTypes = {
  fields: PropTypes.object.isRequired,
  maker: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  handleSubmit: PropTypes.func.isRequired,
};

export default ApplicantMessageForm = reduxForm({
  form: "applicant-message",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(ApplicantMessageForm);
