/*
 * AutoComplete component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Creatable from 'react-select/creatable';

//import "react-select/dist/react-select.css";

import { startCase, upperFirst } from "lodash";

import s from "../Select/styles.module.scss";

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
    nextProps.inputName === "game"
      ? this.setState({
          inputValue: {
            name: nextProps.value,
            value: nextProps.value,
          },
        })
      : this.setState({
          inputValue: {
            name: startCase(upperFirst(nextProps.value)),
            value: startCase(upperFirst(nextProps.value)),
          },
        });
  }

  renderValue(val, inputName) {
    inputName === "game"
      ? this.setState({
          inputValue: {
            name: val,
            value: val,
          },
        })
      : this.setState({
          inputValue: {
            name: startCase(upperFirst(val)),
            value: startCase(upperFirst(val)),
          },
        });
    return val;
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
      inputName,
    } = this.props;
    const selector = this.props.name;
    return (
      <div
        className={`${s.root} ${value ? s.filled : ""} ${
          this.props.name || ""
        } ${className || ""} input`}
      >
        {label && (
          <label className={touched && error ? "error" : ""}>{label}</label>
        )}
        <Creatable

          {...this.props}
          labelKey="name"
          value={this.state.inputValue}
          placeholder=""
          autoload={!!this.state.inputValue.value}
          searchPromptText="Type to get suggestions"
          promptTextCreator={(l) => l}
          onClose={() => {
            onBlur(
              selector
                ? document.querySelector("." + selector).childNodes[1]
                    .childNodes[1].childNodes[0].childNodes[0].childNodes[0]
                    .value
                : ""
            );
          }}
          onBlurResetsInput={false}
          onBlur={() => {
            onBlur(
              selector
                ? document.querySelector("." + selector).childNodes[1]
                    .childNodes[1].childNodes[0].childNodes[0].childNodes[0]
                    .value
                : ""
            );
          }}
          onChange={(val) => {
            onChange(this.renderValue(val.name ? val.name : null), inputName);
          }}
          isLoading={false}
          ignoreCase={ignoreCase ? !ignoreCase : true}
          clearable={false}
          cache={false}
        />
        <span className={`${s.line} ${touched && error ? "error" : ""}`} />
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
  inputName: PropTypes.string,
  ignoreCase: PropTypes.bool,
};

export default AutoComplete;
