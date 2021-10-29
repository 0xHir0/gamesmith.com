/*
 * Apply SMS modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { applySmsRequest } from "containers/App/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Modal from "components/UI/Modal";
import ApplySmsForm from "components/ApplySmsForm";

class ApplySms extends Component {
  componentWillMount() {
    // added Reddit Code
    this.addRedditCode();
  }
  componentWillUnmount() {
    // Remove Reddit Code
    var script = document.getElementById("reditCode");
    var noScript = document.getElementById("reditNoScript");

    document.querySelector("body").removeChild(script);
    document.querySelector("body").removeChild(noScript);
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const {
        data: { jobId, studioId },
      } = this.props;
      values.jobId = jobId;
      values.studioId = studioId;
      dispatch(applySmsRequest({ values, resolve, reject }));
    });

  addRedditCode() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "reditCode";
    script.innerHTML =
      "new Image().src = 'https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAiuMSktAA==&s=G_ncVi4KG8giTX256MoBnN3KoGEjdoGBF-49EcXU9WA=';";
    document.querySelector("body").appendChild(script);

    var noScript = document.createElement("noscript");
    noScript.id = "reditNoScript";
    var img = document.createElement("img");
    img.width = 1;
    img.height = 1;
    img.style.display = "none";
    img.src =
      "https://alb.reddit.com/snoo.gif?q=CAAHAAABAAoACQAAAAiuMSktAA==&s=G_ncVi4KG8giTX256MoBnN3KoGEjdoGBF-49EcXU9WA=";
    noScript.appendChild(img);
    document.querySelector("body").appendChild(noScript);
  }

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title="Enter your Phone"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <ApplySmsForm onSubmit={this.onSubmit} destroyOnUnmount={false} />
      </Modal>
    );
  }
}

ApplySms.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(ApplySms);
