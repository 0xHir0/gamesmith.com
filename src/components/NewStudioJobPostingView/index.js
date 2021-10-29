/*
 * New Studio Job Posting View
 */

import React, { PropTypes } from "react";
import Button from "components/UI/Button";
import { toUpper, startCase } from "lodash";
import StudioBasicPlan from "components/StudioBasicPlan";

import s from "./styles.module.scss";

const free = "free";
const NewStudioJobPostingView = ({
  studioName,
  studioId,
  onSubmitUpgradeStudioRequest,
  onAddJob,
  studioLicense,
}) => {
  return (
    <div>
      <div className={`${s.noJob}`}>
        <h4>Congratulations on joining Gamesmith.</h4>
        {studioLicense == free ? (
          <h4>You can post one job free with this account.</h4>
        ) : (
          <h4>You can post three jobs with this account.</h4>
        )}
        <h4>Post your job...</h4>
        <Button
          className={`${s.studioJobPostingViewBtn} ${s.marginTop}`}
          text="Post a Job"
          onClick={() => onAddJob(studioId)}
        />
      </div>
      <StudioBasicPlan
        studioId={studioId}
        onSubmitUpgradeStudioRequest={onSubmitUpgradeStudioRequest}
      />
    </div>
  );
};

NewStudioJobPostingView.propTypes = {
  onSubmitUpgradeStudioRequest: PropTypes.func,
  studioName: PropTypes.string.isRequired,
  studioLicense: PropTypes.string.isRequired,
  onAddJob: PropTypes.func.isRequired,
  studioId: PropTypes.number,
};

export default NewStudioJobPostingView;
