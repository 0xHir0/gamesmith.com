import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

const GameCreditInfoCard = ({ creditId, credit, makerSkills, currRole }) => (
  <div className={`${s.moreInfo} hidden`} id={"creditId" + creditId}>
    <div className={s.outer}>
      <p className={s.jobType}>
        <b>Job Type</b>
      </p>
      <p className={s.jobTypeText}>
        {(credit.role && credit.role.name) || currRole}
      </p>
    </div>
    <div className={s.accomplishment}>
      {credit.accomplishments && (
        <div>
          <h4>Responsibilities</h4>
          <p>{credit.accomplishments}</p>
        </div>
      )}
      {(credit.softwareUsed || makerSkills) && (
        <div>
          <h4>Tools</h4>
          <p>{credit.softwareUsed || makerSkills}</p>
        </div>
      )}
    </div>
  </div>
);

GameCreditInfoCard.propTypes = {
  creditId: PropTypes.number.isRequired,
  credit: PropTypes.object.isRequired,
};

export default GameCreditInfoCard;
