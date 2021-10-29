/*
 * add salary modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { searchSalaryRequest } from "containers/SalaryCalculator/actions";

import Modal from "components/UI/Modal";
import SalaryForm from "components/SalaryForm";

class AddSalary extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const { data } = this.props;
      dispatch(
        searchSalaryRequest({
          salary: values.salary,
          title: data.title,
          age: data.age,
          sex: data.sex,
          level: data.level,
          resolve,
          reject,
        })
      );
    });

  render() {
    const { className = "", isOpen, onCloseModal } = this.props;
    return (
      <Modal
        title={`Please Enter Your Salary to compare`}
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
      >
        <SalaryForm onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

AddSalary.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  // receiverID: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(AddSalary);
