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

import s from "./styles.module.scss";

export const fields = ["name", "filterBy", "currCompany", "pastCompany"];

const clearAll = () => {
  window.location.replace("/makers");
};

let FreeFiltersForm = ({
  fields: { name, filterBy, currCompany, pastCompany },
  resetForm,
  handleSubmit,
  onGetSuggestions,
}) => {
  return (
    <form className={s.root} onSubmit={handleSubmit}>
      <div className={s.searchFilters} id="filters">
        <div className={s.input}>
          <Input className="input" label="Maker" open {...name} />
        </div>
        <div id="filterBy" className={s.input}>
          <Select
            className="input"
            value="verified"
            options={searchMakerFilters}
            label="Filter By"
            {...filterBy}
          />
        </div>
        <div className={s.input} id="currCompany">
          {browser && browser.msie ? (
            <Input label="Current Company" open {...currCompany} />
          ) : (
            <AutoComplete
              {...currCompany}
              label="Current Company"
              loadOptions={(query, cb) => {
                onGetSuggestions({ url: "currCompany", query, cb });
              }}
            />
          )}
        </div>
        <div className={s.input} id="pastCompany">
          {browser && browser.msie ? (
            <Input label="Past Company" open {...pastCompany} />
          ) : (
            <AutoComplete
              {...pastCompany}
              label="Past Company"
              loadOptions={(query, cb) => {
                onGetSuggestions({ url: "pastCompany", query, cb });
              }}
            />
          )}
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

FreeFiltersForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // onClearFields: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default FreeFiltersForm = reduxForm({
  form: "freeFilters",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(FreeFiltersForm);
