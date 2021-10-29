/*
 * AutoCompleteFilter component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Creatable from 'react-select/creatable';

//import "react-select/dist/react-select.css";

import { startCase, upperFirst } from "lodash";

import s from "../AutoCompleteFilter/styles.module.scss";

class AutoCompleteFilter extends Component {
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
      icon,
      onChange,
      onBlur,
      placeholder,
    } = this.props;
    const selector = this.props.name;
    return (
      <div
        className={`${s.root}  ${value ? s.filled : ""} ${
          this.props.name || ""
        } ${className || ""} input`}
      >
        <div id="fontAdjust" className={s.fontAdjust}>
          {icon && <i className={`${icon} faa-2x`}></i>}
        </div>
        <div
          id="auto"
          className={` ${s.inputAdjust} ${
            className ? (s.jobField, s.rightPadding) : ""
          } ${this.props.name ? "auto" + this.props.name : ""}`}
        >
          {label && (
            <label className={s.adjustLabel} style={{ paddingLeft: 0 }}>
              {label}
            </label>
          )}
          <div className={s.complete}>
            <Creatable

              {...this.props}
              labelKey="name"
              value={this.state.inputValue}
              placeholder={placeholder}
              autoload={!!this.state.inputValue.value}
              searchPromptText=""
              promptTextCreator={(l) => l}
              onBlurResetsInput={false}
              onClose={() => {
                onBlur(
                  selector
                    ? document.querySelector(".auto" + selector).childNodes[1]
                        .childNodes[0].childNodes[1].childNodes[0].childNodes[0]
                        .childNodes[0].value
                    : ""
                );
              }}
              onBlur={() => {
                onBlur(
                  selector
                    ? document.querySelector(".auto" + selector).childNodes[1]
                        .childNodes[0].childNodes[1].childNodes[0].childNodes[0]
                        .childNodes[0].value
                    : ""
                );
              }}
              onChange={(val) => {
                onChange(this.renderValue(val.name ? val.name : null));
              }}
              isLoading={false}
              ignoreCase={false}
              cache={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

AutoCompleteFilter.propTypes = {
  value: PropTypes.string,
  initialValue: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AutoCompleteFilter;
