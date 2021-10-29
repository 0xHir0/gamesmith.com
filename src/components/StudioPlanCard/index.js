/*
 * Studio plan card
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "../UI/Button";
import yellowMark from "./img/yellowMark.png";
import s from "./styles.module.scss";
import { openCancelPlan } from "../../containers/Modals/actions";

const BRANDED_PLAN = "BRANDED";

const StudioPlanCard = ({
  id,
  name,
  planName,
  planTitle,
  price,
  plan,
  recruitmentPlan,
  basicPlan = false,
  license,
  onOpenUpgrade,
  doc,
  onDowngradePlan,
}) => {
  const features = plan.map((f, ids) => (
    <span key={ids} className={s.properties}>
      {
        <img
          src={yellowMark}
          className={recruitmentPlan || ids !== 2 ? s.yellowMark : s.space}
          alt="icon"
        />
      }
      {f}
    </span>
  ));
  return (
    <div className={s.planCard}>
      <div className={s.card}>
        <div className={s.header}>
          <h3>{planTitle}</h3>
          <p style={{ color: "white" }}>Monthly</p>
          <label className={s.price}>&#65129;{price}</label>
        </div>
        <div className={recruitmentPlan ? s.cardBody : s.cardbody}>
          <div className={s.body}>{features}</div>
        </div>
      </div>
      <Button
        onClick={
          license.toLowerCase() !== planName.toLowerCase()
            ? () => onOpenUpgrade(planName, price, id, name, license)
            : () => onDowngradePlan(id, BRANDED_PLAN)
        }
        text={
          license.toLowerCase() === planName.toLowerCase()
            ? "Cancel my plan"
            : "Select Plan"
        }
        className={
          license.toLowerCase() === planName.toLowerCase()
            ? s.cancelPlan
            : s.selectPlan
        }
      ></Button>
    </div>
  );
};

StudioPlanCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  planName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  plan: PropTypes.array.isRequired,
  recruitmentPlan: PropTypes.bool.isRequired,
  basicPlan: PropTypes.bool,
  onOpenUpgrade: PropTypes.func.isRequired,
  license: PropTypes.string,
  customClass: PropTypes.object,
  onDowngradePlan: PropTypes.func.isRequired,
  planTitle: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDowngradePlan: (id, plan) => dispatch(openCancelPlan(id, plan)),
}))(StudioPlanCard);
