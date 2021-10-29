/*
 * Exceed Limit modal
 */

import React from "react";
import PropTypes from "prop-types";

import Modal from "components/UI/Modal";

const ExceedRecruiterSearchLimit = ({
  isOpen,
  onCloseModal,
  data: { message },
}) => (
  <Modal
    title={""}
    isOpen={isOpen}
    closeModal={onCloseModal}
    style={{ backgroundColor: "black" }}
  >
    <h3
      style={{
        padding: "-0.5rem 3rem",
        fontSize: "x-large",
        fontWeight: "500",
        color: "white",
      }}
    >
      You've reached your limit.
    </h3>
    <h4 style={{ padding: "1rem 3rem 0", fontSize: "large" }}>
      Please contact your account manager or{" "}
      <a href="mailto:sales@gamesmith.com">sales@gamesmith.com</a>
    </h4>
    {<br />}
    {<br />}
  </Modal>
);
ExceedRecruiterSearchLimit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onGetRecruiter: PropTypes.func,
};

export default ExceedRecruiterSearchLimit;
