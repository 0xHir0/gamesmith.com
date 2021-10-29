import React from "react";
import s from "./styles.module.scss";
import StudioJobCardNew from "../../components/StudioJobCardNew";

const StudioJobs = ({
  jobs,
  studioId,
  studioName,
  user,
  owner,
  onEditJob,
  isValidated,
  onValidate,
  onApply,
  onJobDetails,
  authenticated,
  hasCV,
  token,
  onSignIn,
  countryOptions,
  studioLogo,
}) => (
  <section>
    <div className={s.root}>
      <div className={s.heading}>
        <h3>Open Roles - Join Us!</h3>
      </div>
      <div className={`row ${s.row}`}>
        {jobs && jobs.length > 0 ? (
          jobs.map((i) => (
            <div className={s.col}>
              <StudioJobCardNew
                studioId={studioId}
                id={i.id}
                role={i.role.name}
                company={studioName}
                user={user}
                startDate={i.startDate ? new Date(i.startDate).toString() : ""}
                location={i.location}
                country={i.address && i.address.country}
                state={i.address && i.address.state}
                city={i.address && i.address.city}
                countryId={i.address && i.address.countryId}
                stateId={i.address && i.address.stateId}
                countryOptions={countryOptions}
                platforms={i.platforms}
                workCategories={i.workCategories}
                description={i.description}
                imgUrl={i.imgUrl}
                owner={owner}
                onEditJob={onEditJob}
                isValidated={isValidated}
                onValidate={onValidate}
                onApply={onApply}
                applied={i.applied}
                onJobDetails={onJobDetails}
                authenticated={authenticated}
                onSignIn={onSignIn}
                ownerId={i.ownerId}
                jobFamilyId={i.jobFamilyId}
                youtubeVideoUrl={i.youtubeVideo}
                cvOption={i.cvOption}
                gtOption={i.gtOption}
                hasCv={hasCV}
                token={token}
                studioLogo={i.studioLogo}
                jobFamily={
                  i.studioJobCardDetails && i.studioJobCardDetails.jobFamily
                    ? i.studioJobCardDetails.jobFamily
                    : "-"
                }
                jobType={
                  i.studioJobCardDetails && i.studioJobCardDetails.jobType
                    ? i.studioJobCardDetails.jobType
                    : "-"
                }
                expiredAt={
                  i.studioJobCardDetails && i.studioJobCardDetails.expiredAt
                    ? i.studioJobCardDetails.expiredAt
                    : null
                }
              />
            </div>
          ))
        ) : (
          <h4 className={s.center}>There are no jobs available.</h4>
        )}
      </div>
    </div>
  </section>
);

export default StudioJobs;
