/*
 * Phone input component
 */

import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import s from "./styles.module.scss";

const Phone = ({
  open,
  label,
  type = "text",
  value,
  touched,
  error,
  onBlur,
  onChange,
  onFocus,
  className,
}) => (
  <div className={`${s.root} ${value ? s.filled : ""} ${className || ""}`}>
    {label && (
      <label className={touched && error ? "error" : ""}>{label}</label>
    )}

    <PhoneInput
      className={(open || touched) && s.touched}
      value={value}
      type={type}
      onBlur={onBlur}
      country={"us"}
      onFocus={onFocus}
      onChange={onChange}
    />
    <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

Phone.propTypes = {
  open: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
};

export default Phone;
