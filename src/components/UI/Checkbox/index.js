/*
 * Checkbox component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

const Checkbox = ({
  name,
  children,
  value,
  touched,
  error,
  className,
  onBlur,
  onFocus,
  onChange,
}) => (
  <label className={`${s.root} ${className || ""}`}>
    <input
      value={value}
      id={name}
      checked={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      type="checkbox"
    />
    {children}
    {touched && error && <span className={s.error}>{error}</span>}
  </label>
);

Checkbox.propTypes = {
  children: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  touched: PropTypes.bool,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
};

export default Checkbox;
