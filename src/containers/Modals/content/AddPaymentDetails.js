/*
 * Add Payment modal
 * */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import AddPaymentForm from "components/AddPaymentForm";
import Modal from "components/UI/Modal";
import { addStudioRequest } from "../../../containers/Studios/actions";
import {
  Elements,
  StripeProvider,
  CardElement,
  injectStripe,
} from "react-stripe-elements";
import { STRIPE_PUBLIC_API_KEY } from "../../../utils";

class AddStudio extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const label = this.props.data;
      dispatch(addStudioRequest(values, label, resolve, reject));
    });
  render() {
    // pk_test_KziHMeHx3hQi0Yrg6hSPgtQ1 gamesmith
    // pk_live_tE9sem5bTr1juX49PAzEm9h2  LIVE KEY

    const { className = "", isOpen, onCloseModal, data } = this.props;
    const title = (
      <div>
        <h3 style={{ color: "#ffffff", fontSize: "1.8rem" }}>
          Payment Details
        </h3>
      </div>
    );
    return (
      <StripeProvider apiKey={STRIPE_PUBLIC_API_KEY}>
        <Modal
          title={title}
          className={className}
          isOpen={isOpen}
          closeModal={onCloseModal}
        >
          <Elements>
            <AddPaymentForm
              plan={data.plan}
              studioId={data.studioId}
              studioName={data.studioName}
              onSubmit={this.onSubmit}
            />
          </Elements>
        </Modal>
      </StripeProvider>
    );
  }
}

AddStudio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  // receiverID: PropTypes.number.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.string,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
}))(AddStudio);
