/*
 * Select component
 */

import React from "react";
import PropTypes from "prop-types";

import ReactSelect from "react-select";
//import 'react-select/dist/react-select.css';

import s from "./styles.module.scss";
const colourStyles = {
  control: (styles) => ({
    ...styles,
    color: "white",
    backgroundColor: "transparent",
    border: "0px",
    "&:after": {
      borderBottom: "1px solid yellow",
      content: '""',
      position: "absolute",
      width: "100%",
      bottom: "0",
    },
    "&:focus": {
      border: "0px",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      cursor: "pointer",
      color: "white",
      backgroundColor: isSelected || isFocused ? "#1e1e1e" : "#323232",
      ":active": {
        backgroundColor: "transparent",
      },
    };
  },
  input: (styles) => ({ ...styles, border: "0px" }),
   placeholder: (styles) => ({ ...styles, color: "white" }),
singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
};
const Select = ({
  options,
  label,
  value = "",
  touched,
  error,
  onBlur,
  onChange,
  className,
  placeholder,
  name,
  multi = false,
}) => (
  <div className={`${s.root} ${value ? s.filled : ""} ${className || ""}`}>
    {label && (
      <label className={touched && error ? "error" : ""}>{label}</label>
    )}
    <ReactSelect
      placeholder={placeholder}
      name={name}
      options={options}
      value={value}
      onChange={(v) => onChange(v)}
      onBlur={() => onBlur()}
      multi={multi}
      styles={colourStyles}
    />
    <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  multi: PropTypes.bool,
};

export default Select;
