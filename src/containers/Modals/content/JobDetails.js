/*
 * Job Decscription modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Modal from "components/UI/Modal";
import JobDetailsCard from "components/JobDetailsCard";
import { makerGamesRequest } from "../../Games/actions";
import { openConfirmApplyJob } from "../actions";
import { createStructuredSelector } from "reselect";

class JobDetails extends Component {
  render() {
    const {
      className = "",
      crossClassname = "",
      isOpen,
      onCloseModal,
      onConfirmApply,
      data: {
        id,
        location,
        country,
        state,
        city,
        countryId,
        stateId,
        platforms,
        jobsFamily,
        families,
        description,
        imgUrl,
        company,
        startDate,
        expiredAt,
        role,
        applied,
        studioId,
        user,
        ownerId,
        onApply,
        isValidated,
        onValidate,
        onEditJob,
        authenticated,
        onSignIn,
        countryOptions,
        youtubeVideoUrl,
        cvOption,
        hasCv,
        domain,
        studioLogo,
      },
    } = this.props; // const { className = '', crossClassname = '', isOpen, onCloseModal, onConfirmApply, data: { id, location, country, state, city, countryId, stateId, platforms, families, description, imgUrl, company , startDate, role, applied, studioId, user, ownerId, onApply, isValidated, onValidate , onEditJob, authenticated, onSignIn, countryOptions, youtubeVideoUrl,cvOption, hasCv, domain } } = this.props; // eslint-disable-line

    return (
      <Modal
        title=""
        crossClassname={crossClassname}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <JobDetailsCard
          id={id}
          role={role}
          company={company}
          location={location}
          country={country}
          state={state}
          city={city}
          countryId={countryId}
          stateId={stateId}
          studioId={studioId}
          countryOptions={countryOptions}
          domain={domain}
          platforms={platforms}
          jobsFamily={jobsFamily ? jobsFamily : families}
          description={description}
          startDate={startDate ? new Date(startDate).toString() : ""}
          expiredAt={expiredAt ? new Date(expiredAt).toString() : ""}
          applied={applied}
          imgUrl={imgUrl}
          user={user}
          ownerId={ownerId}
          isValidated={isValidated}
          onValidate={onValidate}
          onApply={onApply}
          onEditJob={onEditJob}
          authenticated={authenticated}
          onSignIn={onSignIn}
          youtubeVideoUrl={youtubeVideoUrl}
          cvOption={cvOption}
          hasCv={hasCv}
          onConfirmApply={onConfirmApply}
          studioLogo={studioLogo}
        />
      </Modal>
    );
  }
}

JobDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onConfirmApply: PropTypes.func.isRequired,
  className: PropTypes.string,
  crossClassname: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    platforms: PropTypes.array,
    role: PropTypes.string,
    applied: PropTypes.bool,
    startDate: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    onApply: PropTypes.func.isRequired,
    user: PropTypes.object,
    isValidated: PropTypes.bool,
    onValidate: PropTypes.func.isRequired,
    imgUrl: PropTypes.string,
    ownerId: PropTypes.number.isRequired,
    onEditJob: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    onSignIn: PropTypes.func.isRequired,
    countryOptions: PropTypes.array.isRequired,
    studioLogo: PropTypes.string,
  }),
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onConfirmApply: (id, studioId) => dispatch(openConfirmApplyJob(id, studioId)),
}))(JobDetails);
