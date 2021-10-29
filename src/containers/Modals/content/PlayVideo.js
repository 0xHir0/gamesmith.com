/*
 * Play Video modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";
const YoutubeVideo = require("react-youtube-video");

const PlayVideo = ({ className = "", isOpen, onCloseModal }) => (
  <Modal
    className={className}
    isOpen={isOpen}
    closeModal={onCloseModal}
    modalName={"PlayVideo"}
  >
    <YoutubeVideo
      url={"https://youtu.be/YpfGtsQ-V9M"}
      width={"560"}
      height={"315"}
      controls
    />
  </Modal>
);

PlayVideo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PlayVideo;
