/*
 * Partners component
 */

import React from "react";

import manmade from "./img/manmade.png";
import aqua from "./img/aqua.png";
import koolbit from "./img/koolbit.png";
import rubyseven from "./img/ruby-seven.png";

import s from "./styles.module.scss";

const Partners = () => (
  <section className={s.root}>
    <div>
      <h2>Partners</h2>
      <div className={s.scroll}>
        <img src={manmade} alt="Manmade" />
        <img src={aqua} alt="Aqua" />
        <img src={koolbit} alt="Koolbit" />
        <img src={rubyseven} alt="Ruby Seven Studios" />
      </div>
    </div>
  </section>
);

export default Partners;
