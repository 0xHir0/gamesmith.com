/*
 * SubscriberInput component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

const SubscriberInput = ({
  open,
  disabled,
  label,
  placeholder = "Your Email",
  type = "text",
  value,
  touched,
  error,
  onBlur,
  onChange,
  onFocus,
  className,
  name,
  field,
}) => (
  <div
    className={`${s.root} ${value ? s.filled : ""} ${
      disabled ? s.disabled : ""
    } ${className || ""}`}
  >
    {type === "textarea" ? (
      <textarea
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        name={name}
        {...field}
      />
    ) : (
      <input
        className={open || touched ? s.touched : ""}
        value={value}
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        disabled={disabled}
        placeholder="  Your Email"
        name={name}
        {...field}
        style={{ color: "black", paddingLeft: "1rem" }}
      />
    )}
    {label && (
      <label className={touched && error ? "error" : ""}>{label}</label>
    )}
    {/*<span className={`${s.line} ${touched && error ? 'error' : ''}`}></span>*/}
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

SubscriberInput.propTypes = {
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.object,
};

export default SubscriberInput;
