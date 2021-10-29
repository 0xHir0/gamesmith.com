/*
 * Country Select Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Select from "react-select";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getStatesRequest,
  getCitiesRequest,
  getCountriesRequest,
} from "containers/App/actions";
import { selectIsFetchingCountries } from "containers/App/selectors";

const colourStyles = {
  control: (styles) => ({
    ...styles,
    color: "white",
    backgroundColor: "transparent",
    border: "0px",
    '&:after':{
      borderBottom: '1px solid yellow',
      content: '""',
      position: 'absolute',
      width: '100%',
      bottom: '0'
    },
    '&:focus':{
      border: '0px'
    }
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
  input: (styles) => ({ ...styles, border: "0px"}),
   placeholder: (styles) => ({ ...styles, color: "white" }),
singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
};

class CountrySelect extends Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      country: this.props.value,
    };
   // console.log(this.props);
  }

  componentDidMount() {
    const { value, cId, onGetStates } = this.props;
    if (value != "") {
      if (cId == "WLS" || cId == "SCT" || cId == "ENG" || cId == "NIR") {
        onGetStates(cId, false);
      } else {
        onGetStates(cId, true);
      }
    }
  }

  renderValue(val) {
    const { state, city, onGetStates, onGetCities, setGeoCountryId } =
      this.props;
    this.setState({
      country: val,
    });
    onGetStates(val.key, val.hasState);
    setGeoCountryId(val.key);
    return val;
  }

  render() {
    const {
      id,
      name,
      label,
      value,
      touched,
      error,
      className,
      onChange,
      options,
      onBlur,
      placeholder,
    } = this.props;
    return (
      <div className={`${s.root} ${value ? s.filled : ""}`}>
        {/*{label && <label className={touched && error ? 'error' : ''}>{label}</label>}*/}
        <Select
          clearable={false}
          name={name}
          placeholder={placeholder}
          id={id}
          options={options}
          value={this.state.country}
          onChange={(val) => onChange(this.renderValue(val))}
          styles={colourStyles}

        />
        <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

CountrySelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  initialValue: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onGetStates: PropTypes.func.isRequired,
  onGetCities: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onGetStates: (countryKey, hasState) =>
    dispatch(getStatesRequest(countryKey, hasState)),
  onGetCities: (countryKey, stateKey) =>
    dispatch(getCitiesRequest(countryKey, stateKey)),
}))(CountrySelect);
