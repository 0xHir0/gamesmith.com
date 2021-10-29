import React from "react";
import PropTypes from "prop-types";
import studioPlatforms from "data/jobPlatforms";

import s from "./styles.module.scss";

function StudioTags({
  label,
  platforms,
  className,
  setPlatforms,
  toggleTab,
  onOpenUpgradePrompt,
  license,
}) {
  const selectedPlatforms = platforms.map((p2) => p2.id.value);
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      {studioPlatforms.map((p, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            id={`studio-platform-${p.id}`}
            className={s.checkbox}
            value={p.id}
            checked={selectedPlatforms.indexOf(p.id) !== -1}
            onChange={
              license === "basic"
                ? () => onOpenUpgradePrompt(toggleTab, "plan")
                : (e) => setPlatforms(platforms, e, selectedPlatforms)
            }
          />
          <label
            htmlFor={`studio-platform-${p.id}`}
            className={`${s.tag} ${
              selectedPlatforms.indexOf(p.id) !== -1 ? s.active : ""
            }`}
          >
            <img src={p.url} className={s.studioPlatformIcons} />
          </label>
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
