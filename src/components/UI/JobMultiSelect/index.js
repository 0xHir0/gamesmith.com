/*
 * Multi Select component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSelect, { components } from "react-select";
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
class JobMultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  render() {
    const {
      options,
      label,
      value = "",
      touched,
      error,
      onChange,
      className,
      placeholder,
    } = this.props;
    return (
      <div className={`${s.root} ${value ? s.filled : ""} ${className || ""}`}>
        {label && (
          <label className={touched && error ? "error" : s.label_color}>
            {label}
          </label>
        )}
        <ReactSelect
          options={options}
          className="react_select_container"
          classNamePrefix="react-select"
          value={value}
          onChange={(v) => onChange(v)}
          multi={true}
          placeholder={placeholder}
          searchable={false}
          removeSelected={false}
          arrowRenderer={arrowRenderer}
          styles={colourStyles}
        />
        <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

function arrowRenderer() {
  return (
    <span>
      <i className="fa fa-long-arrow-down"></i>
    </span>
  );
}

JobMultiSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default JobMultiSelect;
