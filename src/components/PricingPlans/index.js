/*
 * PricingPlans component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";

const PricingPlans = () => (
  <div className={s.root}>
    <div className={s.topHeading}>
      <h1>Plans & Pricing</h1>
    </div>
    <div className={s.paymentPlan}>
      <div className={s.studioPlan}>
        <div className={s.spHeader}>
          <h2>Studio Plan</h2>
        </div>
        <div className={s.spPrice}>
          <div className={s.spPriceNumber}>
            <h1>99.00</h1>
          </div>
          <div className={s.doller}>
            <h3>$</h3>
          </div>
          <div>
            {" "}
            <p>per month</p>
          </div>
        </div>
      </div>
      <div className={s.centerDecription}></div>
      <div className={s.brandedPlan}></div>
    </div>
  </div>
);

PricingPlans.propTypes = {
  prop: PropTypes.string,
};

export default PricingPlans;
