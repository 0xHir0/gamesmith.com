import React from "react";
import PropTypes from "prop-types";
import jobPlatforms from "data/jobPlatforms";
import ReactTooltip from "react-tooltip";

import s from "./styles.module.scss";

function JobTags({ label, platforms, className, setPlatforms }) {
  const selectedPlatforms = platforms.map((p2) => p2.id.value);
  return (
    <div className={`${s.root} ${className || ""}`}>
      {label && <label>{label}</label>}
      {jobPlatforms.map((p, idx) => (
        <div key={idx}>
          <input
            type="checkbox"
            id={`job-platform-${p.id}`}
            className={s.checkbox}
            value={p.id}
            checked={selectedPlatforms.indexOf(p.id) !== -1}
            onChange={(e) => setPlatforms(platforms, e, selectedPlatforms)}
          />
          <label
            id={`job-platform-label${p.id}`}
            htmlFor={`job-platform-${p.id}`}
            data-tip={p.name}
            className={`${s.tag} ${
              selectedPlatforms.indexOf(p.id) !== -1 ? s.active : ""
            }`}
          >
            <img src={p.url} style={{ height: "1.4rem" }} />
          </label>
          <ReactTooltip place="top" type="light" effect="float" />
        </div>
      ))}
    </div>
  );
}

JobTags.propTypes = {
  label: PropTypes.string,
  platforms: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
  className: PropTypes.string,
  setPlatforms: PropTypes.func.isRequired,
};

export default JobTags;
