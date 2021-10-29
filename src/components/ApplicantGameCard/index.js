import React from "react";
import PropTypes from "prop-types";
import { uniq } from "lodash";
import s from "./styles.module.scss";
import moment from "moment";

const getIcon = (icon) => {
  switch (icon) {
    case "PS3":
    case "PS4":
    case "PSP":
      return "playstation";
    case "Xbox 360":
    case "Xbox One":
      return "xbox";
    case "iOS":
      return "apple";
    case "Browser":
      return "web";
    case "PC":
      return "windows";
    case "Android":
    case "AR":
    case "VR":
    case "DS":
      return icon.toLowerCase();
    default:
      return "controller";
  }
};

const ApplicantGameCard = ({
  title,
  location,
  role,
  platforms,
  startDate,
  endDate,
}) => {
  const platformList = uniq(platforms.map((p) => getIcon(p.displayName)));
  return (
    <div className={s.root}>
      <div className={s.divWidth}>{title}</div>
      <div className={s.divWidth}>{role}</div>
      {platforms && (
        <div className={s.platforms}>
          {" "}
          {platformList.map((p, idx) => (
            <i key={idx} style={{ marginLeft: 5 }} className={`icon-${p}`} />
          ))}{" "}
        </div>
      )}
      <div className={s.divWidth}>
        {startDate && (
          <p>
            {moment(`${startDate.month}, ${startDate.year}`, "MM, YYYY").format(
              "MMMM, YYYY"
            )}
          </p>
        )}
        {endDate && (
          <p>
            {moment(`${endDate.month}, ${endDate.year}`, "MM, YYYY").format(
              "MMMM, YYYY"
            )}
          </p>
        )}
      </div>
      <div className={s.divWidth}>{location}</div>
    </div>
  );
};

ApplicantGameCard.propTypes = {
  location: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  platforms: PropTypes.array,
};

export default ApplicantGameCard;
