/* * Date input component
 */
import React from "react";
import PropTypes from "prop-types";
import Picker from "react-month-picker";
import "react-month-picker/css/month-picker.css";

import s from "./styles.module.scss";

var MonthBox = React.createClass({
  propTypes: {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onClick: React.PropTypes.func,
  },
  getInitialState(name) {
    return {
      value: this.props.value || "N/A",
      name: this.props.name,
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || "N/A",
    });
  },

  render() {
    return (
      <input
        value={this.state.value}
        name={this.state.name}
        className={`${s.monthpickerbox}`}
        onClick={this._handleClick}
        type="text"
      />
    );
  },

  _handleClick(e) {
    this.props.onClick && this.props.onClick(e);
  },
});

var MonthDate = React.createClass({
  getInitialState: function (label, name) {
    return {
      value: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
      label: this.props.label,
      name: this.props.name,
    };
  },
  handleClickMonthBox(e) {
    this.refs.pickAMonth.show();
  },
  handleAMonthChange(value, text) {
    this.refs.pickAMonth.dismiss();
  },
  handleAMonthDissmis(value) {
    this.setState({ value: value });
  },
  render: function () {
    let pickerLang = {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };

    let makeText = (m) => {
      if (m && m.year && m.month)
        return pickerLang.months[m.month - 1] + " " + m.year;
      return "?";
    };
    return (
      <div className={`edit`}>
        <label className={s.label}>{this.state.label}</label>
        <Picker
          ref="pickAMonth"
          theme="dark"
          years={[
            2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
            2011, 2012, 2014, 2015, 2016, 2017,
          ]}
          value={this.state.value}
          lang={pickerLang.months}
          onChange={this.handleAMonthChange}
          onDismiss={this.handleAMonthDissmis}
          name={this.state.label}
        >
          <MonthBox
            value={makeText(this.state.value)}
            name={this.state.name}
            onClick={this.handleClickMonthBox}
          />
        </Picker>
      </div>
    );
  },
});

export default MonthDate;
