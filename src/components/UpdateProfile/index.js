/*
 * Update Profile component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import CustomInput from "components/UI/CustomInput";
import Phone from "components/UI/Phone";
import UploadPhoto from "components/UI/UploadPhoto";
import AutoCompleteUniversity from "components/UI/AutoCompleteUniversity";
import validate from "./validation";
import s from "./styles.module.scss";
import MultiSelect from "components/UI/MultiSelect";

// import JobFamilyData from '../../data/jobPassions';
import searchIcon from "data/availabilityIcons/search.png";
import satellite from "data/availabilityIcons/satellite.png";
import logo from "data/availabilityIcons/GS_ID_Lockup_Horizontal.png";
import PureInput from "../UI/PureInput/index";
import CountrySelect from "components/UI/CountrySelect";
import StateSelect from "components/UI/StateSelect";
import CitySelect from "components/UI/CitySelect";
import { isEmpty, toInteger } from "lodash";
import Select from "components/UI/Select";

import SocialOptions from "data/socialOptions";
import jobFamilyData from "../../data/jobPassions";
import makerWorkCategories from "../../data/makerWorkCategories";
import markedSquare from "../PaidFiltersForm/img/markedSquare.png";
import emptySquare from "../PaidFiltersForm/img/emptySquare.png";

export const fields = [
  "image",
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "bio",
  "availability",
  "currRole",
  "currCompany",
  "skills",
  "accomplishments",
  "isLinkedInUser",
  "country",
  "state",
  "city",
  "languages",
  "jobsFamily",
  "socialLinks[].id",
  "socialLinks[].url",
  "socialLinks[].icon",
  "isStudent",
  "school",
  "major",
];

const validateLinks = (socialLinks, socialLinksError) => {
  const content = socialLinks.filter((sl) => !sl.url.value || !sl.icon.value);
  if (!isEmpty(content)) {
    socialLinksError(true);
  } else {
    socialLinksError(false);
    socialLinks.addField({ id: -1 });
  }
};

let UpdateProfile = ({
  maker: { imgUrl = "" },
  fields: {
    image,
    firstName,
    lastName,
    email,
    phoneNumber,
    bio,
    status,
    availability,
    currRole,
    currCompany,
    skills,
    accomplishments,
    country,
    state,
    city,
    languages,
    jobsFamily,
    socialLinks,
    isStudent,
    school,
    major,
  },
  workCategories,
  socialLinksError,
  cId,
  setGeoCountryId,
  sId,
  setGeoStateId,
  isLinkedInUser,
  handleSubmit,
  submitting,
  error,
  onGetSuggestions,
  onEmail,
  removeProfileContent,
  onEditLinkedInEmail,
  languageOptions,
  setSocialLinksError,
  countryOptions,
  setWorkCategories,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="step">
        <h2>1. Basic Info</h2>
        <div className="row">
          <div className="col-sm-4">
            <UploadPhoto imgUrl={imgUrl} image={image} />
            <Button
              disabled={submitting}
              type="submit"
              text="Save"
              style={{ marginTop: 0 }}
            />
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-6">
                <Input
                  className="input"
                  open
                  label="FIRST NAME"
                  type="text"
                  {...firstName}
                />
              </div>
              <div className="col-sm-6">
                <Input
                  className="input"
                  open
                  label="LAST NAME"
                  type="text"
                  {...lastName}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <CustomInput
                  className="input"
                  open
                  label="Email"
                  type="text"
                  {...email}
                  disabled
                  action={isLinkedInUser ? onEditLinkedInEmail : onEmail}
                />
              </div>
              <div className="col-sm-6 ">
                <Phone className="input" open label="Phone" {...phoneNumber} />
              </div>
              <div className="col-sm-6 ">
                <Input
                  className="input"
                  open
                  label="JOB TITLE"
                  type="text"
                  {...currRole}
                />
              </div>
              <div className="col-sm-6 ">
                <Input
                  className="input"
                  open
                  label="COMPANY"
                  type="text"
                  {...currCompany}
                />
              </div>
            </div>
            <Input
              className="input textarea"
              open
              label="ABOUT"
              type="textarea"
              {...bio}
            />
          </div>
        </div>
      </div>
      <div className="step">
        <h2>2. Open to opportunities (only studios will see this)</h2>
        <div className="row">
          {makerWorkCategories.map((p, idx) => (
            <div
              key={idx}
              className={`col-md-3 ${s.col}`}
              onClick={() => setWorkCategories(workCategories, p.id)}
            >
              <label htmlFor={p.id}>
                <img src={p.url} alt="icon" className={s.images} />
                <span className={s.font}>{p.name}</span>
              </label>
              <img
                src={
                  workCategories.indexOf(p.id) !== -1
                    ? markedSquare
                    : emptySquare
                }
                className={s.radioButton}
                alt={"check"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="step">
        <h2>3. Profile Builder</h2>
        <div className="row">
          <div className="col-sm-6">
            <MultiSelect
              className="input"
              placeholder="Select..."
              options={languageOptions}
              label="Language(s)"
              value={languages}
              {...languages}
            />
            <Select
              className="input"
              options={jobFamilyData}
              value={jobsFamily}
              placeholder="Select..."
              label="WORK CATEGORY"
              {...jobsFamily}
            />
          </div>
          <div className="col-sm-6">
            <Input
              className="input"
              open
              label="SKILLS"
              type="text"
              {...skills}
            />
            <Input
              className="input textarea"
              open
              label="WHAT I AM UP TO...."
              type="textarea"
              {...accomplishments}
            />
          </div>
        </div>
      </div>
      <div className="step">
        <h2>4. Current Location</h2>
        <div className="row">
          <div className="col-sm-6">
            <div className={`profile-country ${s.countrySelect}`}>
              <CountrySelect
                id="countryId"
                state={state}
                city={city}
                options={countryOptions}
                cId={cId}
                setGeoCountryId={setGeoCountryId}
                className="countries"
                label="Country"
                placeholder="Select Country..."
                {...country}
              />
            </div>
            <div className={`profile-city ${s.citySelect}`}>
              <CitySelect
                id="cityId"
                cId={cId}
                sId={sId}
                className="cities"
                label="City"
                placeholder="Select City..."
                {...city}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className={`profile-state ${s.stateSelect}`}>
              <StateSelect
                id="stateId"
                city={city}
                setGeoStateId={setGeoStateId}
                cId={cId}
                sId={sId}
                className="states"
                label="State"
                placeholder="Select State..."
                {...state}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="step">
        <h2>5. Showcase</h2>
        <div className={"row"}>
          <div className="col-sm-offset-3">
            <h4>Add your portfolio, demo reel or website.</h4>
          </div>
        </div>
        <div className={`row ${s.right}`}>
          <div className={`${s.addSocialLinks}`}>
            <a
              data-tip="Add Video"
              className="fa-x fa fa-plus"
              onClick={() => {
                validateLinks(socialLinks, setSocialLinksError);
              }}
            ></a>
          </div>
        </div>
        <div className="container-fluid">
          {!socialLinks.length && <div>No Showcase Links</div>}
          <div className="row">
            {socialLinks.map((content, index) => (
              <div key={index} className={`col-sm-6 ${s.links} ${s.padding}`}>
                <div className="col-xs-3">
                  <Select
                    className="social-links input "
                    options={SocialOptions}
                    placeholder="Icon.."
                    label=""
                    {...content.icon}
                  />
                </div>
                <div className="col-xs-9 multi-input">
                  <Input
                    type="text"
                    className="input spl"
                    open
                    label=""
                    {...content.url}
                  />
                </div>
                <div className={` ${s.removeSocialLinks}`}>
                  <a
                    data-tip="Remove Link"
                    className="fa fa-remove"
                    onClick={() => {
                      removeProfileContent(socialLinks, index);
                    }}
                  ></a>
                </div>
              </div>
            ))}
          </div>
          {socialLinksError && <div className="error">{socialLinksError}</div>}
        </div>
      </div>
      {isStudent.value && (
        <div className="step">
          <h2>6. Education</h2>
          <div className="row">
            <div className="col-sm-6">
              <div>
                <AutoCompleteUniversity
                  {...school}
                  label="SCHOOL"
                  loadOptions={(query, cb) => {
                    onGetSuggestions({ url: "universities", query, cb });
                  }}
                />
              </div>
              <div>
                <Input
                  ignoreCase
                  className="input"
                  open
                  label="FIELD OF STUDY"
                  type="text"
                  {...major}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <Button disabled={submitting} type="submit" text="Save" />
    </form>
  );
};

UpdateProfile.propTypes = {
  error: PropTypes.string,
  address: PropTypes.object,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  languageOptions: PropTypes.array.isRequired,
  onEditLinkedInEmail: PropTypes.func.isRequired,
  removeProfileContent: PropTypes.func.isRequired,
  countryOptions: PropTypes.array.isRequired,
};

export default UpdateProfile = reduxForm({
  form: "profile",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(UpdateProfile);
