import React from "react";
import PropTypes from "prop-types";
import gamePlatforms from "data/platforms";
import s from "./styles.module.scss";

function GameTags({ label, platforms, className, gameIndex, setPlatforms }) {
  const selectedPlatforms = platforms.map((p2) => p2.id.value);
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      {gamePlatforms.map((p, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            id={`gameplatform-${gameIndex}-${p.id}`}
            className={s.checkbox}
            value={p.id}
            checked={selectedPlatforms.indexOf(p.id) !== -1}
            onChange={(e) => setPlatforms(platforms, e, selectedPlatforms)}
          />
          <label
            htmlFor={`gameplatform-${gameIndex}-${p.id}`}
            className={`${s.tag} ${
              selectedPlatforms.indexOf(p.id) !== -1 ? s.active : ""
            }`}
          >
            {p.name}
          </label>
        </div>
      ))}
    </div>
  );
}

GameTags.propTypes = {
  label: PropTypes.string,
  gameIndex: PropTypes.number.isRequired,
  platforms: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  className: PropTypes.string,
  setPlatforms: PropTypes.func.isRequired,
};

export default GameTags;
