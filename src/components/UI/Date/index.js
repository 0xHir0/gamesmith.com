/*
 * Date input component
 */

import React from "react";
import PropTypes from "prop-types";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";


import moment from "moment";
//import "react-dates/lib/css/_datepicker.css";

import s from "./styles.module.scss";

const Date = ({
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
    {/* <DatePicker
      className={(open || touched) && s.touched}
      value={value}
      type={type}
      selected={value ? (value === "Present" ? moment() : moment(value)) : null}
      dateFormat={
        showPresent && moment(value, "MMMM YYYY").isSame(moment(), "d")
          ? "[Present]"
          : "MMMM YYYY"
      }
     
      onFocus={onFocus}
      todayButton={showPresent && "Present"}
      showYearDropdown
      onChange={onChange}
    /> */}
    {/* <DateRangePicker
      minDate={noPast && moment()}
      maxDate={noFuture && moment()}
      startDateId="start-date-1" // PropTypes.string.isRequired,
      endDate={this.state.endDate} // momentPropTypes.momentObj or null,
      endDateId="end-date-1" // PropTypes.string.isRequired,
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

Date.propTypes = {
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

export default Date;
