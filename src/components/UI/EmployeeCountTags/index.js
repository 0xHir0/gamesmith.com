import React from "react";
import PropTypes from "prop-types";
import PureInput from "components/UI/PureInput";
import employeeCount from "data/employeeCount";

import s from "./styles.module.scss";

const EmployeeCountTags = ({
  label,
  className,
  employeeCountId,
  toggleTab,
  onOpenUpgradePrompt,
  license,
}) => {
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      {employeeCount.map((ec, idx) => (
        <div key={idx}>
          <PureInput
            type="radio"
            id={`count-${ec.id}`}
            {...employeeCountId}
            checked={employeeCountId.value == ec.id}
            className={s.radio}
            value={ec.id}
            onBlur={employeeCountId.onBlur}
            onFocus={employeeCountId.onFocus}
            onChange={
              license === "basic"
                ? () => onOpenUpgradePrompt(toggleTab, "plan")
                : employeeCountId.onChange
            }
          />
          <label
            htmlFor={`count-${ec.id}`}
            className={`${s.tag} ${
              employeeCountId.value == ec.id ? s.active : ""
            }`}
          >
            {ec.name}
          </label>
        </div>
      ))}
    </div>
  );
};

EmployeeCountTags.propTypes = {
  label: PropTypes.string.isRequired,
  employeeCountId: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default EmployeeCountTags;
