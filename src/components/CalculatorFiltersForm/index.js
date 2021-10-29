/*
 * Calculator Filters form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import browser from "bowser";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import Select from "components/UI/Select";
import searchSexFilters from "data/searchSexFilters";
import searchLevelFilters from "data/searchLevelFilters";
import AutoComplete from "components/UI/AutoCompleteJobTitle";

import validate from "./validation";

import s from "./styles.module.scss";
import { checkAuthToken } from "../../utils";

export const fields = ["title", "age", "sex", "level"];

const clearAll = () => {
  window.location.replace("/salarycalculator");
};

let CalculatorFiltersForm = ({
  fields: { title, age, sex, level },
  handleSubmit,
  onGetSuggestions,
}) => {
  return (
    <form className={s.root} onSubmit={handleSubmit}>
      <div className={s.searchFilters} id="filters">
        <div className={s.input}>
          {!browser && !browser.msie ? (
            <Input label="Your job Title" open {...title} />
          ) : (
            <AutoComplete
              {...title}
              label="Your job Title"
              ignoreCase
              loadOptions={(query, cb) => {
                onGetSuggestions({ url: "postTitle", query, cb });
              }}
            />
          )}
        </div>
        <div id="filterBy" className={s.input}>
          <Input value="30" label="Your age" open {...age} />
        </div>
        <div className={s.input} id="sex">
          <Select
            className="input"
            value="male"
            options={searchSexFilters}
            label="Sex"
            {...sex}
          />
        </div>
        <div className={s.input} id="level">
          <Select
            className="input"
            value="junior"
            options={searchLevelFilters}
            label="Level"
            {...level}
          />
        </div>
        <div className={s.btnDiv}>
          <div className={s.submitBtn}>
            <Button type="submit" text="Compare" className={s.searchBtn} />
          </div>
          <a
            className={s.clearBtn}
            onClick={checkAuthToken() ? () => clearAll() : ""}
          >
            {/* <i className="fa fa-times"></i> */}
            <p style={{color: '#F8E81C', fontWeight: "bold", fontSize: '1rem', marginTop: '18px', marginRight:'5px'}}>×</p>Clear All
          </a>
        </div>
      </div>
    </form>
  );
};

CalculatorFiltersForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // onClearFields: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func,
};

export default CalculatorFiltersForm = reduxForm({
  form: "freeFilters",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(CalculatorFiltersForm);
