import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

const MakerEmailRadioButton = ({ label, className, email, makerEmails }) => {
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label className={s.labelText}>{label}</label>}
      {makerEmails.map((ec, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              onChange={email.onChange}
              value={ec.value}
              checked={email.value === ec.value}
            />{" "}
            {ec.value}
          </label>
        </div>
      ))}
    </div>
  );
};

MakerEmailRadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  makerEmails: PropTypes.array,
  email: PropTypes.object,
};

export default MakerEmailRadioButton;
