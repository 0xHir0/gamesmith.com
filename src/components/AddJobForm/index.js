/*
 * AddJobForm component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import CustomDate from "components/UI/CustomDate";
import RichText from "components/UI/RichText";

import JobLogo from "components/UI/StudioLogo";
import EmploymentType from "components/UI/EmploymentType";
import JobTag from "components/UI/JobTags";
import CountrySelect from "components/UI/CountrySelect";
import StateSelect from "components/UI/StateSelect";
import CitySelect from "components/UI/CitySelect";
import FamilySelect from "components/UI/Select";
import JobFamilyData from "../../data/jobFamily";
import CustomRadioButton from "components/UI/CustomRadioButton";
import validate from "./validation";

import s from "./styles.module.scss";
import InfoStyle from "../StudioJobApplicationCard/styles.module.scss";
import InfoIcon from "../StudioJobApplicationCard/img/info.png";
import Select from "../UI/Select";

export const fields = [
  "jobId",
  "imgUrl",
  "role",
  "studioId",
  "startDate",
  "expiredAt",
  "jobFamily",
  "country",
  "state",
  "city",
  // 'area',
  "platforms[].id",
  "description",
  "youtubeVideoUrl",
  "cvOption",
  "gtOption",
  "workCategories[].id",
];
class AddJobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      cvOption: this.props.selectedValue,
      gtOption: this.props.gtOption,
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  handleCVOption = (e) => {
    this.setState({
      cvOption: e,
    });
    if (localStorage.getItem("selectedCVOption") === "yes") {
      localStorage.removeItem("selectedCVOption");
      localStorage.setItem("selectedCVOption", e);
    } else {
      localStorage.removeItem("selectedCVOption");
      localStorage.setItem("selectedCVOption", e);
    }
  };
  handleGTOption = (val, jobId) => {
    this.setState({ gtOption: val });
    if (localStorage.getItem(`gtOption${jobId.value}`) === "yes") {
      localStorage.removeItem(`gtOption${jobId.value}`);
      localStorage.setItem(`gtOption${jobId.value}`, val);
    } else {
      localStorage.removeItem(`gtOption${jobId.value}`);
      localStorage.setItem(`gtOption${jobId.value}`, val);
    }
  };
  componentDidMount() {
    localStorage.setItem(
      `gtOption${this.props.fields.jobId.value}`,
      this.props.gtOption
    );
  }

  render() {
    const {
      fields: {
        jobId = 0,
        role,
        studioId,
        startDate,
        expiredAt,
        jobFamily,
        country,
        state,
        city,
        platforms,
        description,
        imgUrl,
        youtubeVideoUrl,
        cvOption,
        workCategories,
      },
      countryOptions,
      cId,
      setGeoCountryId,
      sId,
      setGeoStateId,
      handleSubmit,
      isEditingJob,
      showImageUpload,
      setPlatforms,
      handleCVOption,
      selectedValue,
      setWorkCategories,
    } = this.props;
    const { gtOption } = this.state;

    return (
      <form className={s.root} onSubmit={handleSubmit}>
        <Input label="JOB TITLE" open {...role} />
        <CustomDate label="From" open {...startDate} />
        <CustomDate label="Expired At" open {...expiredAt} />

        
        <Select
          className="input"
          options={JobFamilyData}
          value={jobFamily}
          placeholder="Select..."
          label="WORK CATEGORY"
          {...jobFamily}
        />

        <EmploymentType
          label="Employment Type"
          workCategories={workCategories}
          setWorkCategories={setWorkCategories}
        />
        <JobTag
          label="Platforms"
          platforms={platforms}
          setPlatforms={setPlatforms}
        />
        <p>Location</p>
        <div className={s.locations}>
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
          <div className={s.left}>
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
          <div className={s.right}>
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
        <div className={s.margin}>
          <RichText label="Description" {...description} />
        </div>
        <div className={s.video}>
          <Input label="YouTube Video" {...youtubeVideoUrl} />
        </div>
        <div className={s.avatar}>
          <JobLogo
            description=""
            label="JOB LOGO"
            imgUrl={imgUrl}
            rootClassName={isEditingJob ? "" : s.centerLogo}
          />
        </div>
        <div className={s.cvContainer}>
          <div className={s.cvLabel}>
            Accept GT+ Resumes?
            <img
              src={InfoIcon}
              className={InfoStyle.infoIcon}
              alt="info Icon"
            />
          </div>
          <div className={s.cvOptions}>
            <div>
              <div style={{ display: "inline-block" }}>
                <CustomRadioButton
                  type="radio"
                  name="gt"
                  label="YES"
                  val="yes"
                  onChange={() => this.handleGTOption("yes", jobId)}
                  checked={gtOption === "yes"}
                />
              </div>
              <div style={{ marginLeft: "1rem", display: "inline-block" }}>
                <CustomRadioButton
                  type="radio"
                  name="gt"
                  label="NO"
                  val="no"
                  onChange={() => this.handleGTOption("no", jobId)}
                  checked={gtOption === "no"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={s.cvContainer}>
          <div className={s.cvLabel}>CV REQUIRED TO APPLY</div>
          <div className={s.cvOptions}>
            <div>
              <div style={{ display: "inline-block" }}>
                <CustomRadioButton
                  type="radio"
                  name="radio"
                  label="YES"
                  val="yes"
                  onChange={() => this.handleCVOption("yes")}
                  checked={this.state.cvOption === "yes"}
                />
              </div>
              <div style={{ marginLeft: "1rem", display: "inline-block" }}>
                <CustomRadioButton
                  type="radio"
                  name="radio"
                  label="NO"
                  val="no"
                  onChange={() => this.handleCVOption("no")}
                  checked={this.state.cvOption === "no"}
                />
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" text={isEditingJob ? "Update Job" : "Post"} />
      </form>
    );
  }
}
AddJobForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setPlatforms: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isEditingJob: PropTypes.bool,
};

export default AddJobForm = reduxForm({
  form: "addJob",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddJobForm);
