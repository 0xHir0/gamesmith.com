/*
 * AutoComplete component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Creatable from 'react-select/creatable';

//import "react-select/dist/react-select.css";

import { startCase, upperFirst } from "lodash";

import s from "./styles.module.scss";

class AutoComplete extends Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {
        name: this.props.value || this.props.initialValue || "",
        value: this.props.value || this.props.initialValue || "",
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inputValue: {
        name: startCase(upperFirst(nextProps.value)),
        value: startCase(upperFirst(nextProps.value)),
      },
    });
  }

  renderValue(val) {
    this.setState({
      inputValue: {
        name: startCase(upperFirst(val)),
        value: startCase(upperFirst(val)),
      },
    });
    return startCase(upperFirst(val));
  }

  render() {
    const {
      initialValue,
      label,
      value,
      touched,
      error,
      className,
      onChange,
      onBlur,
      ignoreCase,
      placeholder,
      isWhite = false,
    } = this.props;
    const selector = this.props.name;
    return (
      <div
        className={`${s.paidFilterRoot} ${value ? s.filled : ""} ${
          this.props.name || ""
        } ${className || ""} input`}
      >
        {label && (
          <label className={touched && error ? "error" : ""}>{label}</label>
        )}
        <div
          id="paid"
          className={` ${s.paidFilter} ${isWhite ? s.langFilter : ""}`}
        >
          <span className={s.icon}>
            <i className="fa fa-search"></i>
          </span>
          <Creatable

            {...this.props}
            labelKey="name"
            value={this.state.inputValue}
            // placeholder={placeholder}
            autoload={!!this.state.inputValue.value}
            searchPromptText="Type to get suggestions"
            promptTextCreator={(l) => l}
            onClose={() => {
              onBlur(
                selector
                  ? document.querySelector("." + selector).childNodes[1]
                      .childNodes[1].childNodes[1].childNodes[0].childNodes[0]
                      .childNodes[0].value
                  : ""
              );
            }}
            onBlurResetsInput={false}
            onBlur={() => {
              onBlur(
                selector
                  ? document.querySelector("." + selector).childNodes[1]
                      .childNodes[1].childNodes[1].childNodes[0].childNodes[0]
                      .childNodes[0].value
                  : ""
              );
            }}
            onChange={(val) => {
              onChange(this.renderValue(val.name ? val.name : null));
            }}
            isLoading={false}
            ignoreCase={ignoreCase ? !ignoreCase : true}
            clearable={false}
            cache={false}
          />
          <span className={`${s.line} ${touched && error ? "error" : ""}`} />
        </div>
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  value: PropTypes.string,
  initialValue: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default AutoComplete;
