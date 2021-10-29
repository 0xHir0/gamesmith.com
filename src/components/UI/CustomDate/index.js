/*
 * Date input component
 */

import React from "react";
import PropTypes from "prop-types";


import moment from "moment";


import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";



import s from "./styles.module.scss";
const modifiersStyles = {
  birthday: {
    color: "white",
    backgroundColor: "#ffc107",
  },
  thursdays: {
    color: "#ffc107",
    backgroundColor: "#fffdee",
  },
  outside: {
    backgroundColor: "#323232",
  },
};

const CustomDate = ({
  open,
  label,
  type = "text",
  value,
  touched,
  error,
  onBlur,
  onChange,
  onFocus,
  showPresent,
  noFuture,
  noPast,
  className,
}) => (
  <div className={`${s.root} ${value ? s.filled : ""} ${className || ""}`}>
    {label && (
      <label className={touched && error ? "error" : ""}>{label}</label>
    )}
    {/* <DateRangePicker
      minDate={noPast && moment()}
      maxDate={noFuture && moment()}
      onDatesChange={({ startDate, endDate }) => onChange} // PropTypes.func.isRequired,
      onFocusChange={(focusedInput) => ({})} // PropTypes.func.isRequired,
    /> */}

    <DayPickerInput
      formatDate={formatDate}
      parseDate={parseDate}
      
      onDayChange={(day) => onChange}
    />

    <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

CustomDate.propTypes = {
  open: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  touched: PropTypes.bool,
  showPresent: PropTypes.bool,
  noFuture: PropTypes.bool,
  noPast: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
};

export default CustomDate;
