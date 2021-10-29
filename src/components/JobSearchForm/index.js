/*
 * Add experience form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import SelectFilter from "components/UI/SelectFilter";
import AutoCompleteFilter from "components/UI/AutoCompleteFilter";
import s from "./styles.module.scss";
import SelectPlatforms from "data/SelectJobPlatforms";

export const fields = ["currRole", "platforms", "country", "city", "state"];

let JobSearchForm = ({
  fields: { currRole, platforms, country, city, state },
  handleSubmit,
  onGetSuggestions,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <div className={s.autoMargin}>
      <div className={`${s.bg}`}>
        <AutoCompleteFilter
          {...currRole}
          label="Job Title"
          icon="fa fa-briefcase"
          placeholder="All"
          className="jobField"
          loadOptions={(query, cb) => {
            onGetSuggestions({ url: "roles", query, cb });
          }}
        />
      </div>
      <div className={` ${s.bg} `}>
        <SelectFilter
          className="input"
          label="PLATFORM"
          options={SelectPlatforms}
          placeholder="ALL"
          icon="fa fa-gamepad"
          {...platforms}
        />
      </div>
    </div>
    <div className={s.autoMargin}>
      <div className={`${s.bg}`}>
        <AutoCompleteFilter
          {...country}
          label="Country"
          className="input"
          icon="fa fa-map-marker"
          placeholder="Select Country..."
          loadOptions={(query, cb) => {
            onGetSuggestions({ url: "country", query, cb });
          }}
        />
      </div>
      <div className={`${s.bg}`}>
        <AutoCompleteFilter
          {...state}
          label="State"
          className="State"
          icon="fa fa-map-marker"
          placeholder="Select State..."
          loadOptions={(query, cb) => {
            onGetSuggestions({ url: "state", query, cb });
          }}
        />
      </div>
      <div className={`${s.bg}`}>
        <AutoCompleteFilter
          {...city}
          label="City"
          className="input"
          icon="fa fa-map-marker"
          placeholder="Select City..."
          loadOptions={(query, cb) => {
            onGetSuggestions({ url: "city", query, cb });
          }}
        />
      </div>
    </div>
    <div className={s.autoMargin}>
      <div className={s.subMargin}>
        <Button text="Search " className={s.searchBtn}>
          {" "}
        </Button>
      </div>
    </div>
  </form>
);

JobSearchForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default JobSearchForm = reduxForm({
  form: "search",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(JobSearchForm);
