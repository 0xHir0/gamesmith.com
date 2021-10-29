/*
 * Country Select Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { geoLocationState } from "utils";
import s from "./styles.module.scss";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import ReactSelect from "react-select";
import { slice, isEmpty, isEqual } from "lodash";
import { selectStates } from "containers/App/selectors";
import { getCitiesRequest, getStatesRequest } from "containers/App/actions";
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
        color: 'white'
      },
    };
  },
  input: (styles) => ({ ...styles, border: "0px" }),
   placeholder: (styles) => ({ ...styles, color: "white" }),
singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
 
};
class StateSelect extends Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      countryState: this.props.value,
    };
  }

  componentDidMount() {
    const { value, cId, sId } = this.props;
    if (value != "") {
      this.props.onGetCities(cId, sId);
    }
  }

  renderValue(val) {
    this.setState({
      countryState: val,
    });
    if (val) {
      this.props.onGetCities(val.countryKey, val.stateKey);
    }
    this.props.setGeoStateId(val.stateKey);
    return val;
  }

  render() {
    const {
      id,
      name,
      value,
      label,
      touched,
      error,
      className,
      onChange,
      onBlur,
      placeholder,
      stateOptions,
      disabled,
    } = this.props;
    return (
      <div className={`${s.root} ${value ? s.filled : ""}`}>
        {/*{label && <label className={touched && error ? 'error' : ''}>{label}</label>}*/}
        <ReactSelect
          className={`${isEmpty(stateOptions) ? s.disable : ""}`}
          clearable={false}
          name={name}
          placeholder={placeholder}
          id={id}
          disabled={isEmpty(stateOptions)}
          options={stateOptions}
          value={
            isEmpty(stateOptions)
              ? ""
              : this.props.value
              ? this.props.value
              : this.state.countryState
          }
          onChange={(val) => onChange(this.renderValue(val))}
          styles={colourStyles}
        />
        <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

StateSelect.propTypes = {
  id: PropTypes.string,
  cId: PropTypes.string,
  sId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  initialValue: PropTypes.string,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onGetCities: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  stateOptions: PropTypes.array,
};

export default connect(
  createStructuredSelector({
    stateOptions: selectStates(),
  }),
  (dispatch) => ({
    dispatch,
    onGetStates: (countryKey) => dispatch(getStatesRequest(countryKey)),
    onGetCities: (countryKey, stateKey) =>
      dispatch(getCitiesRequest(countryKey, stateKey)),
  })
)(StateSelect);
