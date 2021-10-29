import React from "react";
import s from "./styles.module.scss";
const StudioGameCardNew = ({ imageUrl, name, releaseDate, genres }) => (
  <div className={s.card}>
    <div className={s.picture}>
      <img className={s.logo} src={imageUrl} alt={"logo"} />
    </div>
    <div className={s.content}>
      <h3 className={s.heading}>{name}</h3>
    </div>
    <div className={s.about}></div>
  </div>
);
export default StudioGameCardNew;
