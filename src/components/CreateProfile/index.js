/*
 * Create Profile component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "../UI/Input";
import CountrySelect from "components/UI/CountrySelect";
import StateSelect from "components/UI/StateSelect";
import CitySelect from "components/UI/CitySelect";
import AutoCompleteUniversity from "components/UI/AutoCompleteUniversity";
import s from "./styles.module.scss";
import Switch from "react-switch";
import Button from "../UI/Button";
import { reduxForm, change, untouch } from "redux-form";

export const fields = [
  "firstName",
  "lastName",
  "email",
  "password",
  "currCompany",
  "currRole",
  "country",
  "state",
  "city",
  "degree",
  "university",
];

const uncheckedIcon = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 11,
      color: "white",
      paddingRight: 2.5,
      paddingTop: 1,
    }}
  >
    NO
  </div>
);
const checkedIcon = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 11,
      fontWeight: 400,
      color: "black",
      paddingRight: 2.5,
      paddingLeft: 2.5,
      paddingTop: 1,
    }}
  >
    YES
  </div>
);

let toggleStudent = false;
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or more";
  }
  if (!values.currCompany) {
    errors.currCompany = "Required";
  }
  if (!values.currRole) {
    errors.currRole = "Required";
  }
  if (!values.country) {
    errors.country = "Required";
  }
  if (!values.state) {
    errors.state = "Required";
  }
  if (!values.city) {
    errors.city = "Required";
  }
  if (!values.university && toggleStudent) {
    errors.university = "Required";
  }
  if (!values.degree && toggleStudent) {
    errors.degree = "Required";
  }
  return errors;
};

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudentFields: false,
    };
  }
  componentDidMount() {
    this.setState({ showStudentFields: this.props.student });
  }

  handleIsStudent = () => {
    this.setState({ showStudentFields: !this.state.showStudentFields }, () => {
      this.props.handleStudent(this.state.showStudentFields);
      toggleStudent = !toggleStudent;
      this.props.dispatch(change("CreateProfile", "degree", ""));
      this.props.dispatch(change("CreateProfile", "university", ""));
      this.props.dispatch(untouch("CreateProfile", "degree"));
      this.props.dispatch(untouch("CreateProfile", "university"));
    });
  };
  render() {
    const {
      fields: {
        firstName,
        lastName,
        email,
        password,
        currCompany,
        currRole,
        country,
        state,
        city,
        degree,
        university,
      },
      student,
      handleStudent,
      countryOptions,
      cId,
      sId,
      setGeoStateId,
      setGeoCountryId,
      onGetSuggestions,
      onCompleteForm,
      handleSubmit,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className={s.root}>
          <div className={s.formName}>
            <h3>Create Profile</h3>
            <div className={s.dots}>
              <span className={s.enableCount}>0</span>
              <span className={s.disableCount}>0</span>
              <span className={s.disableCount}>0</span>
            </div>
          </div>
          <h3>Welcome! Tell us a little bit about you.</h3>
          <p className={s.subheading}>
            This will help your colleagues recognize you in Gamesmith.
          </p>
          <div className={s.row}>
            <div className={s.col}>
              <Input
                className="input"
                open
                label="First Name"
                type="text"
                {...firstName}
              />
            </div>
            <div className={s.col}>
              <Input
                className="input"
                open
                label="Last Name"
                type="text"
                {...lastName}
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={s.col}>
              <Input
                className="input"
                open
                label="Email address"
                type="email"
                {...email}
              />
            </div>
            <div className={s.col}>
              <Input
                className="input"
                open
                label="password"
                type="password"
                {...password}
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={s.col}>
              <Input
                className="input"
                open
                label="Job Title"
                type="text"
                {...currRole}
              />
            </div>
            <div className={s.col}>
              <Input
                className="input"
                open
                label="Employer"
                type="text"
                {...currCompany}
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={s.col}>
              <label>Where are you located?</label>
              <CountrySelect
                id="countryId"
                state={state}
                city={city}
                options={countryOptions}
                cId={cId}
                setGeoCountryId={setGeoCountryId}
                className="countries"
                label="Country"
                placeholder="Country"
                {...country}
              />
            </div>
            <div className={s.col}>
              <label className={s.invisible}>State</label>
              <StateSelect
                id="stateId"
                city={city}
                setGeoStateId={setGeoStateId}
                cId={cId}
                sId={sId}
                className="states"
                label="State"
                placeholder="State"
                {...state}
              />
            </div>
            <div className={s.col}>
              <label className={s.invisible}>city</label>
              <CitySelect
                id="cityId"
                cId={cId}
                sId={sId}
                className="cities"
                label="City"
                placeholder="City"
                {...city}
              />
            </div>
          </div>
          <div className={"row"}>
            <div className={s.col}>
              <label>Are you a student?</label>
            </div>
          </div>
          <div className={s.row}>
            <div className={s.col}>
              <Switch
                checked={student}
                onChange={this.handleIsStudent}
                offColor="#323232"
                onColor="#FFFF00"
                id="normal-switch"
                offHandleColor="#1c1c1c"
                onHandleColor="#191919"
                uncheckedIcon={uncheckedIcon}
                checkedIcon={checkedIcon}
                height={22}
                width={45}
                handleDiameter={20}
                className={s.gtSwitch}
              />
            </div>
          </div>
          {this.state.showStudentFields && (
            <div className={s.row}>
              <div className={s.col}>
                <label>What are you studying?</label>
                <Input
                  ignoreCase
                  className="input"
                  open
                  label="Field of study"
                  type="text"
                  {...degree}
                />
              </div>
              <div className={s.col}>
                <label>Where are you studying?</label>
                <AutoCompleteUniversity
                  {...university}
                  label="School Name"
                  loadOptions={(query, cb) => {
                    onGetSuggestions({ url: "universities", query, cb });
                  }}
                />
              </div>
            </div>
          )}
          <div>
            <Button
              text="Continue"
              className={s.continueButton}
              type="submit"
            />
          </div>
          <div className={s.term}>
            <label>
              By creating an account, you agree to our{" "}
              <a href="https://gamesmith.com/terms">
                Terms, Conditions and Privacy Policy
              </a>
            </label>
          </div>
        </div>
      </form>
    );
  }
}

CreateProfile.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleStudent: PropTypes.func.isRequired,
  student: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
};

export default reduxForm({
  form: "CreateProfile",
  fields,
  destroyOnUnmount: false,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(CreateProfile);
