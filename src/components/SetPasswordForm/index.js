/*
 * set Password Form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";

import validate from "./validation";

export const fields = ["password"];
const ismobile = window.innerWidth <= 1150;

let SetPassword = ({ fields: { password }, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Input label="Password" type="password" {...password} />
    <Button
      style={
        ismobile
          ? { width: "219px", marginTop: "30px", marginBottom: "10px" }
          : {}
      }
      type="submit"
      text="Done"
    />
    <div style={{ marginTop: "30px", marginBottom: "40px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="109"
        height="10"
        viewBox="0 0 109 10"
      >
        <g id="Progress" transform="translate(-154 -512)">
          <rect
            id="Yellow"
            width="21"
            height="10"
            rx="5"
            transform="translate(242 512)"
            fill="#fd0"
          />
          <rect
            id="_2"
            data-name="2"
            width="11"
            height="10"
            rx="5"
            transform="translate(154 512)"
            fill="#1c1c1c"
          />
          <rect
            id="_3"
            data-name="3"
            width="11"
            height="10"
            rx="5"
            transform="translate(176 512)"
            fill="#1c1c1c"
          />
          <rect
            id="_4"
            data-name="4"
            width="11"
            height="10"
            rx="5"
            transform="translate(197 512)"
            fill="#1c1c1c"
          />
          <rect
            id="_5"
            data-name="5"
            width="11"
            height="10"
            rx="5"
            transform="translate(220 512)"
            fill="#1c1c1c"
          />
        </g>
      </svg>
    </div>
  </form>
);

SetPassword.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SetPassword = reduxForm({
  form: "auth",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SetPassword);
