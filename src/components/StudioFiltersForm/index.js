/*
 * Free Filters form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import browser from "bowser";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import Select from "components/UI/Select";
import searchMakerFilters from "data/searchMakerFilters";
import AutoComplete from "components/UI/AutoComplete";
import employeeCount from "../../data/employeeCountV2";
import platformsList from "../../data/studioPlatforms";
import studioCountriesList from "../../data/studioCountriesList";

import s from "./styles.module.scss";

export const fields = ["studioName", "country", "platform", "size"];

// const defualtValues = { name : '', currCompany : '', pastCompany : '', filterBy: 'verified', isFree: true}

const clearAll = () => {
  window.location.replace("/studios");
};

let StudioFiltersForm = ({
  fields: { studioName, country, platform, size },
  resetForm,
  handleSubmit,
  onGetSuggestions,
}) => {
  return (
    <form className={s.root} onSubmit={handleSubmit}>
      <div className={s.searchFilters} id="filters">
        <div className={s.input}>
          <Input className="input" label="Studio Name" open {...studioName}/>
        </div>
        <div id="country" className={s.input}>
          <Select
            className="input"
            label="Country"
            {...country}
            options={studioCountriesList}
          />
        </div>
        <div id="platform" className={s.input}>
          <Select
            className="input"
            label="Platform"
            {...platform}
            options={platformsList}
            multi
          />
        </div>
        <div id="size" className={s.input}>
          <Select
            className="input"
            label="Size"
            {...size}
            options={employeeCount}
            {...size}
          />
        </div>
        <div className={s.btnDiv}>
          <div className={s.submitBtn}>
            <Button type="submit" text="Search" className={s.searchBtn} />
          </div>
          <a className={s.clearBtn} onClick={() => clearAll()}>
            {/* <i className="fa fa-times"></i> */}
            <p style={{color: '#F8E81C', fontWeight: "bold", fontSize: '1rem', marginTop: '18px', marginRight:'5px'}}>×</p>Clear All
          </a>
        </div>
      </div>
    </form>
  );
};

StudioFiltersForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // onClearFields: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default StudioFiltersForm = reduxForm({
  form: "studioFiltersForm",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(StudioFiltersForm);
