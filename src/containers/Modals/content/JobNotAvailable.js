/*
 * JobNotAvailable modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";

const JobNotAvailable = ({ className = "", isOpen, onCloseModal }) => (
  <Modal className={className} isOpen={isOpen} closeModal={onCloseModal}>
    <p> This job is no longer available.</p>
    <p>
      Click <a href={"https://gamesmith.com/jobs"}>here</a> for other jobs you
      may like.
    </p>
  </Modal>
);

JobNotAvailable.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default JobNotAvailable;
