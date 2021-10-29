/*
 * Availability form component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import Switch from "react-switch";

import Button from "components/UI/Button";
// import PureInput from "../UI/PureInput/index";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = ["availability"];

class AvailabilityForm extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, isAvailable: false };
  }
  handleChange = () => {
    const {
      fields: { availability },
    } = this.props;
    const ismobile = window.innerWidth <= 1150;
    this.setState({ isAvailable: !this.state.isAvailable });
    this.state.isAvailable
      ? availability.onChange("available")
      : availability.onChange("not available");
  };
  render() {
    const {
      fields: { availability },
      handleSubmit,
    } = this.props;
    const ismobile = window.innerWidth <= 1150;
    const uncheckedIcon = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "white",
          paddingRight: 2.5,
          paddingTop: 1,
        }}
      >
        Off
      </div>
    );
    const checkedIcon = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          fontWeight: 400,
          color: "black",
          paddingRight: 2.5,
          paddingLeft: 2.5,
          paddingTop: 1,
        }}
      >
        On
      </div>
    );
    return (
      <form className={s.root} onSubmit={handleSubmit}>
        <p className={s.top}>
          {ismobile
            ? "New Projects"
            : "Let game studios know you are open to new opportunities?"}
        </p>
        <p className={s.bottom}>
          {ismobile &&
            "Are you interested in hearing about new projects as soon as they appear?"}
        </p>
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <label htmlFor="normal-switch">
            <Switch
              onChange={this.handleChange}
              // checked={availability.value === 'available'}
              checked={true}
              offColor="#191919"
              onColor="#FFFF00"
              id="normal-switch"
              offHandleColor="#1c1c1c"
              onHandleColor="#191919"
              uncheckedIcon={uncheckedIcon}
              checkedIcon={checkedIcon}
              height={26}
              width={55}
              handleDiameter={23}
            />
          </label>
        </div>
        {!ismobile ? (
          <p className={s.bottom}>
            {" "}
            You can always change your availability on your profile!
          </p>
        ) : (
          <p className={s.bottom}>
            {" "}
            You can always change your availability through your profile
            settings.
          </p>
        )}
        {ismobile ? (
          <Button
            style={
              ismobile && {
                width: "219px",
                marginTop: "40px",
                marginBottom: "30px",
                background: "#f8e81c",
              }
            }
            type="submit"
            text="Next"
          />
        ) : (
          <Button type="submit" text="Next" />
        )}
        <div style={ismobile ? { marginBottom: "30px" } : { display: "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="104"
            height="10"
            viewBox="0 0 104 10"
          >
            <g
              id="Progress_"
              data-name="Progress "
              transform="translate(-155 -746)"
            >
              <rect
                id="Yellow"
                width="21"
                height="10"
                rx="5"
                transform="translate(197 746)"
                fill="#fd0"
              />
              <rect
                id="_2"
                data-name="2"
                width="11"
                height="10"
                rx="5"
                transform="translate(155 746)"
                fill="#1c1c1c"
              />
              <rect
                id="_3"
                data-name="3"
                width="11"
                height="10"
                rx="5"
                transform="translate(177 746)"
                fill="#1c1c1c"
              />
              <rect
                id="_4"
                data-name="4"
                width="11"
                height="10"
                rx="5"
                transform="translate(227 746)"
                fill="#1c1c1c"
              />
              <rect
                id="_5"
                data-name="5"
                width="11"
                height="10"
                rx="5"
                transform="translate(248 746)"
                fill="#1c1c1c"
              />
            </g>
          </svg>
        </div>
      </form>
    );
  }
}

AvailabilityForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AvailabilityForm = reduxForm({
  form: "availability",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AvailabilityForm);
