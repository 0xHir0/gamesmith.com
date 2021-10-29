/*
 * plan card
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "../UI/Button";

import s from "./styles.module.scss";

const PlanCard = ({
  id,
  name,
  planName,
  price,
  plan,
  isPaidPlan,
  basicPlan = false,
  license,
  onOpenUpgrade,
  customClass,
  doc,
}) => {
  const features = plan.map((f, ids) => (
    <p key={ids} className={isPaidPlan && ids === 3 ? s.colorClass : ""}>
      {f}
    </p>
  ));
  const globalPlanfeatures = plan.map((f, ids) => (
    <p key={ids} className={isPaidPlan && ids === 3 ? s.colorClassButton : ""}>
      {f}
    </p>
  ));
  return (
    <div className={isPaidPlan ? `${s.paidMain}` : `${s.planCardMain}`}>
      <div className={s.header}>
        <label>{`${planName}`} PLAN</label>
        <label> ${`${price}`}/mo</label>
      </div>
      <div
        className={
          planName === "BRANDED" ? `${s.cardBody} ${s.brandedCard}` : s.cardBody
        }
      >
        {isPaidPlan && (
          <div>
            <p>Includes Branded Plan</p>
            <i
              className="fa-1x fa fa-plus-circle"
              style={{ color: "yellow" }}
            />
            <p>Search Filters</p>
          </div>
        )}
        {planName === "GLOBAL" ? globalPlanfeatures : features}
      </div>
      {planName !== "BRANDED" && (
        <div
          className={planName !== "GLOBAL" ? customClass : s.globalcardButton}
        >
          <Button
            onClick={() => onOpenUpgrade(planName, price, id, name, license)}
            disabled={license.toUpperCase() === planName}
            text={
              license.toUpperCase() === planName
                ? "Current Plan"
                : "Select Plan"
            }
            className={
              basicPlan
                ? license.toUpperCase() === planName
                  ? `${s.basic} ${s.buttonClass} ${s.selectedPlan}`
                  : `${s.basic} ${s.buttonClass}`
                : license.toUpperCase() === planName
                ? `${s.buttonClass} ${s.selectedPlan}`
                : s.buttonClass
            }
          >
            {" "}
          </Button>
        </div>
      )}
      {planName === "BRANDED" && (
        <div
          className={planName !== "BRANDED" ? customClass : s.brandedCardButton}
        >
          <Button
            onClick={() => onOpenUpgrade(planName, price, id, name, license)}
            disabled={license.toUpperCase() === planName}
            text={
              license.toUpperCase() === planName
                ? "Current Plan"
                : "Select Plan"
            }
            className={
              basicPlan
                ? license.toUpperCase() === planName
                  ? `${s.basic} ${s.buttonClass} ${s.selectedPlan}`
                  : `${s.basic} ${s.buttonClass}`
                : license.toUpperCase() === planName
                ? `${s.buttonClass} ${s.selectedPlan}`
                : s.buttonClass
            }
          >
            {" "}
          </Button>
        </div>
      )}
    </div>
  );
};

PlanCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  planName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  plan: PropTypes.array.isRequired,
  isPaidPlan: PropTypes.bool.isRequired,
  basicPlan: PropTypes.bool,
  onOpenUpgrade: PropTypes.func.isRequired,
  license: PropTypes.string,
  customClass: PropTypes.object,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(PlanCard);
