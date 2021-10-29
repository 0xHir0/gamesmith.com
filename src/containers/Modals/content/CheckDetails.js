/*
 * Check details modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import langs from "langs";
import { trim, map, isEmpty } from "lodash";
import Switch from "react-switch";
import { selectUser } from "containers/App/selectors";

import { updateDetailsRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import DetailsForm from "components/DetailsForm";

class CheckDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }
  onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(
        updateDetailsRequest({
          values,
          resolve,
          reject,
          isStudent: this.state.isChecked,
        })
      );
    });
  };

  setLanguagesArray = () => {
    const langList = langs.names();
    const result = map(langList, (value) => {
      return { label: trim(value), value: trim(value) };
    });
    return result;
  };
  checkStudent = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  render() {
    const uncheckedIcon = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          color: "white",
          paddingRight: 2.5,
          paddingTop: 1,
        }}
      >
        Off
      </div>
    );
    const checkedIcon = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 12,
          fontWeight: 400,
          color: "black",
          paddingRight: 2.5,
          paddingLeft: 2.5,
          paddingTop: 1,
        }}
      >
        On
      </div>
    );
    const ismobile = window.innerWidth <= 1150;
    const {
      className = "",
      isOpen,
      onCloseModal,
      data: {
        email,
        maker: { firstName, lastName, currRole, currCompany },
        makerEmail,
        id,
        isDirectRequest,
      },
    } = this.props;
    const makerEmails = map(makerEmail, (maker) => {
      return { value: maker.email, label: maker.email };
    });
    const em = makerEmails.filter((me) => me.value === email);
    if (isEmpty(em)) {
      makerEmails.push({ value: email, label: email });
    }
    const title = (
      <div>
        <h3 style={{ color: "#ffffff", fontSize: "1.8rem" }}>OK!</h3>
        <div>
          <h3 style={{ color: "#ffffff", fontSize: "1.4rem" }}>
            LET'S GET YOU ONBOARD ASAP
          </h3>
        </div>
      </div>
    );

    return (
      <Modal
        title="Let's Check We Have The Right Details"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <DetailsForm
          initialValues={{
            firstName,
            lastName,
            email,
            currRole,
            currCompany,
          }}
          isDirectRequest={isDirectRequest}
          makerEmails={makerEmails}
          languageOptions={this.setLanguagesArray()}
          checkStudent={this.checkStudent}
          isStudent={this.state.isChecked}
          onSubmit={this.onSubmit}
        />
      </Modal>
    );
  }
}

CheckDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
  }),
  (dispatch) => ({
    dispatch,
  })
)(CheckDetails);
