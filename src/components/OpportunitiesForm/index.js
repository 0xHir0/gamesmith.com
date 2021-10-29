/*
 * Education form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import s from "./styles.module.scss";
import makerWorkCategories from "../../data/workCategories";
import markedSquare from "../PaidFiltersForm/img/markedSquare.png";
import emptySquare from "../PaidFiltersForm/img/emptySquare.png";

export const fields = ["workCategories[]"];
const ismobile = window.innerWidth <= 1150;
let OpportunitiesForm = ({
  handleSubmit,
  workCategories,
  setWorkCategories,
}) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p>What type of opportunities shall people contact you about?</p>
    <div className={`row ${s.row}`}>
      {makerWorkCategories.map((p, idx) => (
        <div
          key={idx}
          className={`col-md-4 col-sm-4 ${s.col}`}
          onClick={() => setWorkCategories(workCategories, p.id)}
        >
          <img
            src={
              workCategories.indexOf(p.id) !== -1 ? markedSquare : emptySquare
            }
            className={s.radioButton}
            alt={"check"}
          />
          <label htmlFor={p.id}>
            <span className={s.font}>{p.label}</span>
          </label>
        </div>
      ))}
    </div>
    <Button
      style={
        ismobile
          ? {
              lineHeight: "44px",
              backgroundColor: "#f8e81c",
              width: "219px",
              marginBottom: "20px",
            }
          : null
      }
      type="submit"
      text="Next"
    />
    <br />
    <br />
    {localStorage.getItem("isStudent") === "true" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="106"
        height="10"
        viewBox="0 0 106 10"
      >
        <g id="Progress" transform="translate(-154 -746)">
          <rect
            id="Yellow"
            width="21"
            height="10"
            rx="5"
            transform="translate(218 746)"
            fill="#fd0"
          />
          <rect
            id="_2"
            data-name="2"
            width="11"
            height="10"
            rx="5"
            transform="translate(154 746)"
            fill="#1c1c1c"
          />
          <rect
            id="_3"
            data-name="3"
            width="11"
            height="10"
            rx="5"
            transform="translate(176 746)"
            fill="#1c1c1c"
          />
          <rect
            id="_4"
            data-name="4"
            width="11"
            height="10"
            rx="5"
            transform="translate(197 746)"
            fill="#1c1c1c"
          />
          <rect
            id="_5"
            data-name="5"
            width="11"
            height="10"
            rx="5"
            transform="translate(249 746)"
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
    )}
  </form>
);

OpportunitiesForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  workCategories: PropTypes.array.isRequired,
  setWorkCategories: PropTypes.func.isRequired,
};

export default OpportunitiesForm = reduxForm({
  form: "opportunities",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(OpportunitiesForm);
