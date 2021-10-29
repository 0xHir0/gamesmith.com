/*
 * City Select Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { geoLocationCity } from "utils";
import { connect } from "react-redux";
import ReactSelect from "react-select";
import { createStructuredSelector } from "reselect";
import { isEqual } from "lodash";
import s from "./styles.module.scss";
import { selectCities } from "containers/App/selectors";
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
class CitySelect extends Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      city: this.props.value,
    };
  }

  // componentWillMount(){
  //   const { value, cId, sId } = this.props;
  //   if(value != '') {
  //     const url = `https://geodata.solutions/api/api.php?type=getCities&countryId=${cId}&stateId=${sId}`;
  //     geoLocationCity('POST', url, this.props.value);
  //   }
  // }
  //
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.cityOptions, this.props.cityOptions)) {
      this.state = {
        city: null,
      };
    }
  }

  renderValue(val) {
    this.setState({
      city: val,
    });
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
      onBlur,
      placeholder,
      cityOptions,
    } = this.props;
    return (
      <div className={`${s.root} ${value ? s.filled : ""}`}>
        {/*{label && <label className={touched && error ? 'error' : ''}>{label}</label>}*/}
        <ReactSelect
          clearable={false}
          name={name}
          placeholder={placeholder}
          id={id}
          options={cityOptions}
          value={this.props.value ? this.props.value : this.state.city}
          onChange={(val) => onChange(this.renderValue(val))}
          styles={colourStyles}
        />
        <span className={`${s.line} ${touched && error ? "error" : ""}`}></span>
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

CitySelect.propTypes = {
  id: PropTypes.string,
  cId: PropTypes.string,
  sId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  initialValue: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  cityOptions: PropTypes.array,
};

export default connect(
  createStructuredSelector({
    cityOptions: selectCities(),
  }),
  (dispatch) => ({
    dispatch,
  })
)(CitySelect);
