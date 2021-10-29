/*
 * Studio Global View
 */

import React from "react";
import PropTypes from "prop-types";
import GlobalApplicant from "components/GlobalApplicant";
import s from "./styles.module.scss";

const StudioGlobalView = ({
  studioName,
  studioId,
  jobs,
  isFullLicense,
  globalApplicants,
  onSubmitUpgradeStudioRequest,
  onOpenUpgradePrompt,
  onMoveGlobalApplicantToJob,
  onApplicantDetails,
  toggleTab,
  license,
}) => {
  return (
    <div style={{ paddingTop: "27px" }}>
      {
        <div className={s.games}>
          <div className={s.topHeading}>
            <div>Name</div>
            <div>Title</div>
            <div>Location</div>
          </div>
          {globalApplicants && globalApplicants.length > 0
            ? globalApplicants.map((ga, idx) => (
                <GlobalApplicant
                  key={idx}
                  maker={ga}
                  license={license}
                  isFullLicense={isFullLicense}
                  jobs={jobs}
                  toggleTab={toggleTab}
                  onOpenUpgradePrompt={onOpenUpgradePrompt}
                  onMoveGlobalApplicantToJob={onMoveGlobalApplicantToJob}
                  onApplicantDetails={onApplicantDetails}
                />
              ))
            : ""}
        </div>
      }
    </div>
  );
};

StudioGlobalView.propTypes = {
  globalApplicants: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
  onApplicantDetails: PropTypes.func.isRequired,
  onMoveGlobalApplicantToJob: PropTypes.func.isRequired,
  onSubmitUpgradeStudioRequest: PropTypes.func,
  isFullLicense: PropTypes.bool.isRequired,
  studioId: PropTypes.number.isRequired,
  studioName: PropTypes.string,
  toggleTab: PropTypes.func.isRequired,
};

export default StudioGlobalView;
