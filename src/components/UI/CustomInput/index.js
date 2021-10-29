/*
 * Input component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

const CustomInput = ({
  open,
  disabled,
  label,
  type = "text",
  value,
  touched,
  error,
  onBlur,
  onChange,
  onFocus,
  action,
  className,
  name,
}) => (
  <div
    className={`${s.root} ${value ? s.filled : ""} ${
      disabled ? s.disabled : ""
    } ${className || ""}`}
    style={{ padding: 0, marginTop: 5.5 }}
  >
    <p style={{ margin: 0, fontSize: 15 }}>
      EMAIL
      <a>
        <i
          onClick={action}
          style={{ marginLeft: 10 }}
          className="fa fa-pencil"
        ></i>
      </a>
    </p>
    <input
      className={open || touched ? s.touched : ""}
      value={value}
      type={type}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      name={name}
    />
  </div>
);

CustomInput.propTypes = {
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
};

export default CustomInput;
