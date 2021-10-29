/*
 * CustomRadioButton component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

const CustomRadioButton = ({
  label,
  onChange,
  checked,
  val,
  field,
  type,
  name,
}) => (
  <div>
    <label className={s.container}>
      {label}
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={val}
        checked={checked}
        {...field}
      />
      <span className={s.checkmark}></span>
    </label>
  </div>
);

CustomRadioButton.propTypes = {
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  val: PropTypes.string,
  touched: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  field: PropTypes.object,
};

export default CustomRadioButton;
