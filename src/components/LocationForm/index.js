/*
 * Location form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import CountrySelect from "components/UI/CountrySelect";
import StateSelect from "components/UI/StateSelect";
import CitySelect from "components/UI/CitySelect";

import validate from "./validation";
import s from "./styles.module.scss";

// const setStateCity = (countryState, stateCity) => {
//   countryState.onChange(null);
//   stateCity.onChange(null);
// }
// const setCity = (stateCity) => {
//   stateCity.onChange(null);
// }

export const fields = ["country", "state", "city"];
const ismobile = window.innerWidth <= 1150;
let LocationForm = ({
  fields: { country, state, city },
  cId,
  setGeoCountryId,
  sId,
  setGeoStateId,
  handleSubmit,
  countryOptions,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p>
      Let's help build your professional network by making sure we have the
      correct location for you.
    </p>
    <div>
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
      {/* <CountrySelect id="countryId" state={state} city={city} setGeoCountryId={setGeoCountryId} options={countryOptions} className="countries" label="Country" placeholder="Select Country..." {...country} />*/}
      <div>
        <StateSelect
          id="stateId"
          city={city}
          setGeoStateId={setGeoStateId}
          cId={cId}
          className="states"
          label="State"
          placeholder="Select State..."
          {...state}
        />
      </div>
      <div>
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
    <Button
      style={
        ismobile
          ? {
              width: "219px",
              marginTop: "50px",
              marginBottom: "34px",
              lineHeight: "44px",
              backgroundColor: "#f8e81c",
            }
          : null
      }
      type="submit"
      text="Next"
    />

    <div style={{ marginTop: "20px", marginBottom: "40px" }}>
      {localStorage.getItem("isStudent") === "true" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="104"
          height="10"
          viewBox="0 0 104 10"
        >
          <g
            id="Progress_"
            data-name="Progress "
            transform="translate(-155 -746)"
          >
            <rect
              id="Yellow"
              width="21"
              height="10"
              rx="5"
              transform="translate(197 746)"
              fill="#fd0"
            />
            <rect
              id="_2"
              data-name="2"
              width="11"
              height="10"
              rx="5"
              transform="translate(155 746)"
              fill="#1c1c1c"
            />
            <rect
              id="_3"
              data-name="3"
              width="11"
              height="10"
              rx="5"
              transform="translate(177 746)"
              fill="#1c1c1c"
            />
            <rect
              id="_4"
              data-name="4"
              width="11"
              height="10"
              rx="5"
              transform="translate(227 746)"
              fill="#1c1c1c"
            />
            <rect
              id="_5"
              data-name="5"
              width="11"
              height="10"
              rx="5"
              transform="translate(248 746)"
              fill="#1c1c1c"
            />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="104"
          height="10"
          viewBox="0 0 104 10"
        >
          <g id="Progress" transform="translate(-155 -730)">
            <rect
              id="Yellow"
              width="21"
              height="10"
              rx="5"
              transform="translate(175 730)"
              fill="#fd0"
            />
            <rect
              id="_2"
              data-name="2"
              width="11"
              height="10"
              rx="5"
              transform="translate(155 730)"
              fill="#1c1c1c"
            />
            <rect
              id="_3"
              data-name="3"
              width="11"
              height="10"
              rx="5"
              transform="translate(205 730)"
              fill="#1c1c1c"
            />
            <rect
              id="_4"
              data-name="4"
              width="11"
              height="10"
              rx="5"
              transform="translate(227 730)"
              fill="#1c1c1c"
            />
            <rect
              id="_5"
              data-name="5"
              width="11"
              height="10"
              rx="5"
              transform="translate(248 730)"
              fill="#1c1c1c"
            />
          </g>
        </svg>
      )}
    </div>
  </form>
);

LocationForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  countryOptions: PropTypes.array.isRequired,
};

export default LocationForm = reduxForm({
  form: "availability",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(LocationForm);
