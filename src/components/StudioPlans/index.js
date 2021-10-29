/*
 * studio plan
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import StudioPlanCard from "../StudioPlanCard";
import unlimitedJobPostPack from "../../data/plans/unlimitedJobPostPack";
import lite from "../../data/plans/lite";
import team from "../../data/plans/team";
import pro from "../../data/plans/pro";
import enterprise from "../../data/plans/enterprise";
import branded from "../../data/plans/branded";
import corporate from "../../data/plans/corporate";
import membership from "../../data/plans/membership";
import enterprise2 from "../../data/plans/enterprise2";
import { STRIPE_URL, loadScript } from "../../utils/index";
import RecruiterPlanCard from "../RecruiterPlanCard";
const STRIPE_ID = "stripeId";

class StudioPlan extends React.Component {
  componentDidMount() {
    if (!document.getElementById(STRIPE_ID))
      loadScript(STRIPE_URL, "text/javascript", STRIPE_ID);
  }

  render() {
    const { name, id, license, onOpenUpgrade, doc, planType, onDowngradePlan } =
      this.props;
    return (
      <div className={s.main}>
        <div className={s.heading}>
          <h3>Choose the plan that best fits you</h3>
        </div>
        {planType === "myPlan" && (
          <div className={s.allPlansContainer}>
            <div className={s.plan}>
              <StudioPlanCard
                name={name}
                id={id}
                planName={"unlimited-jobs-post-pack"}
                planTitle="Unlimited Jobs Post Pack"
                price={"139"}
                plan={unlimitedJobPostPack}
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                doc={doc}
              />
            </div>
          </div>
        )}
        {planType === "recruitmentPlans" && (
          <div className={s.allPlansContainer}>
            <div className={s.plans}>
              <StudioPlanCard
                name={name}
                id={id}
                planName={"lite-plan"}
                planTitle="Lite"
                price={"300"}
                plan={lite}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                customClass={s.buttonMarginPaid}
                doc={doc}
              />
              <div style={{ width: "2rem", height: "2rem" }}></div>
              <StudioPlanCard
                name={name}
                id={id}
                planName={"team-plan"}
                planTitle="Team"
                price={"1000"}
                plan={team}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                customClass={s.buttonMarginPaid}
                onDowngradePlan={onDowngradePlan}
                doc={doc}
              />
            </div>
            <div className={`${s.plans} ${s.recruitmentPlans}`}>
              <StudioPlanCard
                name={name}
                id={id}
                planName={"pro-plan"}
                planTitle="Pro"
                price={"2500"}
                plan={pro}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                customClass={s.buttonMarginPaid}
                doc={doc}
              />
              <div style={{ width: "2rem", height: "2rem" }}></div>
              <StudioPlanCard
                name={name}
                id={id}
                planName={"enterprise-plan"}
                planTitle="Enterprise"
                price={"6000"}
                plan={enterprise}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                customClass={s.buttonMarginPaid}
                doc={doc}
              />
            </div>
          </div>
        )}
        {planType === "plans" && (
          <div className={s.allPlansContainer}>
            <div className={s.plans}>
              <RecruiterPlanCard
                name={name}
                id={id}
                planName={"Branded"}
                planTitle="Branded"
                monthlyPrice={"0"}
                annuallyPrice={"0"}
                plan={branded}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                customClass={s.buttonMarginPaid}
                doc={doc}
              />
              <div style={{ width: "2rem", height: "2rem" }}></div>
              <RecruiterPlanCard
                name={name}
                id={id}
                planName={"Membership"}
                planTitle="Membership"
                monthlyPrice={"139"}
                annuallyPrice={"189"}
                plan={corporate}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                customClass={s.buttonMarginPaid}
                onDowngradePlan={onDowngradePlan}
                doc={doc}
              />
            </div>
            <div className={`${s.plans} ${s.recruitmentPlans}`}>
              <RecruiterPlanCard
                name={name}
                id={id}
                planName={"Corporate"}
                planTitle="Corporate"
                monthlyPrice={"439"}
                annuallyPrice={"589"}
                plan={membership}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                customClass={s.buttonMarginPaid}
                doc={doc}
              />
              <div style={{ width: "2rem", height: "2rem" }}></div>
              <RecruiterPlanCard
                name={name}
                id={id}
                planName={"Enterprise"}
                planTitle="Enterprise"
                monthlyPrice={"custom"}
                annuallyPrice={"1000-6000"}
                plan={enterprise2}
                recruitmentPlan
                license={license}
                onOpenUpgrade={onOpenUpgrade}
                onDowngradePlan={onDowngradePlan}
                customClass={s.buttonMarginPaid}
                doc={doc}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

StudioPlan.propTypes = {
  onOpenUpgrade: PropTypes.func.isRequired,
  license: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  planType: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(StudioPlan);
