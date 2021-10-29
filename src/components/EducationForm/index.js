/*
 * Education form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import validate from "./validation";
import s from "./styles.module.scss";
import AutoCompleteUniversity from "components/UI/AutoCompleteUniversity";
export const fields = ["school", "major"];
const ismobile = window.innerWidth <= 1150;
let EducationForm = ({
  fields: { school, major },
  onGetSuggestions,
  handleSubmit,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p className={s.sub_heading}>Tell us a bit about your studies.</p>
    <Input label="What are you studying?" ignoreCase open {...major} />
    <AutoCompleteUniversity
      {...school}
      label="Where are you studying?"
      loadOptions={(query, cb) => {
        onGetSuggestions({ url: "universities", query, cb });
      }}
    />
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
      width="104"
      height="10"
      viewBox="0 0 104 10"
    >
      <g id="Progress" transform="translate(-155 -730)">
        <rect
          id="Yellow"
          width="21"
          height="10"
          rx="5"
          transform="translate(175 730)"
          fill="#fd0"
        />
        <rect
          id="_2"
          data-name="2"
          width="11"
          height="10"
          rx="5"
          transform="translate(155 730)"
          fill="#1c1c1c"
        />
        <rect
          id="_3"
          data-name="3"
          width="11"
          height="10"
          rx="5"
          transform="translate(205 730)"
          fill="#1c1c1c"
        />
        <rect
          id="_4"
          data-name="4"
          width="11"
          height="10"
          rx="5"
          transform="translate(227 730)"
          fill="#1c1c1c"
        />
        <rect
          id="_5"
          data-name="5"
          width="11"
          height="10"
          rx="5"
          transform="translate(248 730)"
          fill="#1c1c1c"
        />
      </g>
    </svg>
  </form>
);

EducationForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default EducationForm = reduxForm({
  form: "availability",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(EducationForm);
