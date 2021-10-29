/*
 * MakerAccess in modal
 */

import React from "react";
import PropTypes from "prop-types";
import Modal from "components/UI/Modal";

const MakerAccess = ({ className = "", isOpen, onCloseModal }) => {
  return (
    <Modal className={className} isOpen={isOpen} closeModal={onCloseModal}>
      <div className="links">
        <p>
          Hi. It looks like you are enjoying Gamesmith. Let’s get more access.
          Simply contact{" "}
          <a href="mailto:Sales@Gamesmith.com" className="links">
            <u>Sales@Gamesmith.com</u>
          </a>{" "}
          and we will organize this for you.
        </p>
      </div>
    </Modal>
  );
};
MakerAccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default MakerAccess;
