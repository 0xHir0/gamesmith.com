/*
 * Studio people card
 */

import React from "react";
import { Link } from "react-router";
import Avatar from "../UI/Avatar";
import s from "./styles.module.scss";
import loc from "./img/location.png";
import suitcase from "./img/suitcase.png";

const StudioPeopleCardNew = ({
  id,
  firstName,
  lastName,
  imgUrl,
  role,
  location,
}) => {
  return (
    <div className={`${s.cards}`}>
      <div className={s.container}>
        <Link to={`/maker/${id}`}>
          <Avatar
            firstName={firstName}
            lastName={lastName}
            image={imgUrl}
            className={s.logo}
          />
          <h3 className={s.title}>
            {firstName} {lastName}
          </h3>
        </Link>
        <div className={s.content}>
          <img src={loc} alt={"Location"} className={s.icon} />
          <p className={s.info}>{location}</p>
        </div>
        <div className={s.content}>
          <img src={suitcase} alt={"Suitcase"} className={s.icon} />
          <p className={s.info}>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default StudioPeopleCardNew;
