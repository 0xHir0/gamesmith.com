import React from "react";
import PropTypes from "prop-types";
import jobWorkCategories from "data/workCategories";
import markedSquare from "../../PaidFiltersForm/img/markedSquare.png";
import emptySquare from "../../PaidFiltersForm/img/emptySquare.png";

import s from "./styles.module.scss";

function EmploymentType({
  label,
  workCategories,
  className,
  setWorkCategories,
}) {
  const selectedCategories = workCategories.map((p2) => p2.id.value);
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      <div className={`${s.row} row`}>
        {jobWorkCategories.map((p, idx) => (
          <div key={idx} className={`col-md-4 col-sm-4 ${s.col}`}>
            <input
              type="checkbox"
              id={`work-categories-${p.id}`}
              className={s.checkbox}
              value={p.id}
              checked={selectedCategories.indexOf(p.id) !== -1}
              onChange={(e) =>
                setWorkCategories(workCategories, e, selectedCategories)
              }
            />
            <label
              id={`work-categories-label${p.id}`}
              htmlFor={`work-categories-${p.id}`}
              data-tip={p.name}
              className={`${s.tag}`}
            >
              <img
                src={
                  selectedCategories.indexOf(p.id) !== -1
                    ? markedSquare
                    : emptySquare
                }
                className={s.radioButton}
              />
              {p.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

EmploymentType.propTypes = {
  label: PropTypes.string,
  workCategories: PropTypes.array,
  className: PropTypes.string,
  setWorkCategories: PropTypes.func.isRequired,
};

export default EmploymentType;
