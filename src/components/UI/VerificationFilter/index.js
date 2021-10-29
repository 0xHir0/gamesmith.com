/**
 * Created by engintech2 on 2/16/18.
 */

import React from "react";
import PropTypes from "prop-types";
import PureInput from "components/UI/PureInput";
import ReactTooltip from "react-tooltip";
import verificationCount from "data/verificationCount";

import s from "./styles.module.scss";

const VerificationFilter = ({ label, className, verificationCountId }) => {
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      {verificationCount.map((ec, idx) => (
        <div key={idx}>
          <PureInput
            type="radio"
            id={`count-${ec.id}`}
            checked={verificationCountId.value == ec.id}
            className={s.radio}
            value={ec.id}
            onBlur={verificationCountId.onBlur}
            onFocus={verificationCountId.onFocus}
            onChange={verificationCountId.onChange}
          />
          <label
            htmlFor={`count-${ec.id}`}
            data-tip={ec.name}
            className={`${s.tag} ${
              verificationCountId.value == ec.id ? s.active : ""
            }`}
          >
            {ec.name}
          </label>
          <ReactTooltip place="top" type="light" effect="float" />
        </div>
      ))}
    </div>
  );
};

VerificationFilter.propTypes = {
  label: PropTypes.string.isRequired,
  verificationCountId: PropTypes.object,
  className: PropTypes.string,
};

export default VerificationFilter;
