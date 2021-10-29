/*
 * Education Details card
 */

import React from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";

function EducationCard(props) {
  const { school, major, image } = props;
  return (
    <div>
      <div className={s.root}>
        <div className={s.content} style={{ backgroundImage: `url(${image})` }}>
          <div className={`${s.title}`}>
            <h1>{school}</h1>
            <br />
          </div>
          <p style={{ fontSize: "1rem" }}>{major}</p>
          <div className={s.buttonsContainer}></div>
        </div>
      </div>
    </div>
  );
}

EducationCard.propTypes = {
  school: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
};

export default EducationCard;
