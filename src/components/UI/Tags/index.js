import React from "react";
import PropTypes from "prop-types";
import gamePlatforms from "data/platforms";
import ReactTooltip from "react-tooltip";

import s from "./styles.module.scss";

function StudioTags({ label, platforms, className, setPlatforms }) {
  const selectedPlatforms = platforms.map((p2) => p2.id.value);
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      {gamePlatforms.map((p, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            id={`game-platform-${p.id}`}
            className={s.checkbox}
            value={p.id}
            checked={selectedPlatforms.indexOf(p.id) !== -1}
            onChange={(e) => setPlatforms(platforms, e, selectedPlatforms)}
          />
          <label
            htmlFor={`game-platform-${p.id}`}
            data-tip={p.name}
            className={`${s.tag} ${
              selectedPlatforms.indexOf(p.id) !== -1 ? s.active : ""
            }`}
          >
            {p.name}
          </label>
          <ReactTooltip place="top" type="light" effect="float" />
        </div>
      ))}
    </div>
  );
}

StudioTags.propTypes = {
  label: PropTypes.string,
  platforms: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  className: PropTypes.string,
  setPlatforms: PropTypes.func.isRequired,
};

export default StudioTags;
