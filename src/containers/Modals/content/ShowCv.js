/*
 * Show CV modal
 */

import React from "react";
import PropTypes from "prop-types";
import Modal from "components/UI/Modal";
import Button from "components/UI/Button";
// import FileViewer from 'react-file-viewer';

import s from "containers/Modals/styles.module.scss";

const ShowCv = ({ data, className = "", isOpen, onCloseModal }) => (
  <Modal
    title=""
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
  >
    <iframe src={`${data}`} width="500px" height="623px"></iframe>
  </Modal>
);

ShowCv.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
};

export default ShowCv;
