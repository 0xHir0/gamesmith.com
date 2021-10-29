/*
 * Select component
 */

import React from "react";
import PropTypes from "prop-types";

import ReactSelect from "react-select";
//import 'react-select/dist/react-select.css';

import s from "./styles.module.scss";
import ar from "./img/AR.svg";
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
const SelectFilter = ({
  options,
  label,
  value = "",
  touched,
  error,
  onBlur,
  onChange,
  className,
  icon,
  placeholder,
}) => (
  <div className={`${s.root} ${value ? s.filled : ""} ${className || ""}`}>
    <div className={s.fontAdjust}>
      {/*<img className="" src={ar} alt="" />*/}
      {icon && <i className={`${icon} faa-2x`}></i>}
    </div>
    <div id="selectFilter" className={s.inputAdjust}>
      <div className={s.adjustLabel}>
        {label && <label className="">{label}</label>}
      </div>
      <div className={s.select}>
        <ReactSelect
          placeholder={placeholder}
          options={options}
          value={value}
          onChange={(v) => onChange(v)}
          onBlur={() => onBlur()}
          styles={colourStyles}
        />
      </div>
    </div>
  </div>
);

SelectFilter.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SelectFilter;
