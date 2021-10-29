import React from "react";
import s from "./styles.module.scss";
import stock from "./img/stock.png";
import meal from "./img/meal.png";
import leave from "./img/Leave.png";

const StudioBenefits = () => (
  <section>
    <div className={s.root}>
      <div className={s.heading}>
        <h3>Why should you work with us?</h3>
      </div>
      <div className={s.cards}>
        <div className={s.container}>
          <img src={stock} alt={"Retirement"} />
          <p>Retirement and Stock Option Benefits</p>
        </div>
        <div className={s.container}>
          <img src={meal} alt={"Daily Meals"} />
          <p>Free Daily Meals</p>
        </div>
        <div className={s.container}>
          <img src={leave} alt={"Medical Leave"} />
          <p>Family Medical Leave</p>
        </div>
      </div>
    </div>
  </section>
);

export default StudioBenefits;
