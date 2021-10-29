/*
 * AddStudioForm component
 */

import React from "react";
import PropTypes from "prop-types";

import s from "./styles.module.scss";
import { debounce } from "lodash";
import { createStructuredSelector } from "reselect";
import {
  CardCVCElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  injectStripe,
  PostalCodeElement,
} from "react-stripe-elements";
import Button from "../UI/Button";
import spinner from "data/images/spinnertransparent.gif";
import {
  openAddStudio,
  openMessage,
  openSubscribe,
} from "../../containers/Modals/actions";
import { connect } from "react-redux";
import { makeRequest, getAuthToken } from "utils";
import { call } from "redux-saga/effects";
import { getUserData } from "../../utils";
import { selectUser } from "../../containers/App/selectors";
import ReactTooltip from "react-tooltip";
import { selectRecruiter } from "../../containers/Recruiter/selectors";
import {
  getRecruiterStudioRequest,
  recruiterConnectionsRequest,
} from "../../containers/Recruiter/actions";
import { getCountriesRequest } from "../../containers/App/actions";
import Input from "../UI/Input";

class AddPaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      nameOnCard: this.props.studioName,
    };

    this.submitForm = this.submitForm.bind(this);
    this.updatePaymentDetails = this.updatePaymentDetails.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.handleName = this.handleName.bind(this);
  }

  handleName(e) {
    e.preventDefault();
    this.setState({
      nameOnCard: e.target.value,
    });
  }

  async updatePaymentDetails() {
    const { onSubscribe, plan, studioId, studioName, onFailed } = this.props;
    this.setState({
      isClicked: true,
    });
    // User clicked submit
    let req = "";
    try {
      const { token } = await this.props.stripe.createToken({
        name: studioName,
      });
      if (token) {
        this.setState({ isClicked: false });
        onFailed("Update Success", "Payment details updated.");
      } else {
        onFailed("Update Failed", "Failed to update payment details");
      }
      req = await makeRequest(
        "POST",
        {
          tokenId: token.id,
          tokenType: token.type,
          tokenUsed: token.used,
          livemode: token.livemode,
          clientIp: token.client_ip,
          cardId: token.card.id,
          cardExpMonth: token.card.exp_month,
          cardExpYear: token.card.exp_year,
          companyName: token.card.name,
          cardBrand: token.card.brand,
          cardFunding: token.card.funding,
          cardAddressZip: token.card.address_zip,
          cardLast4: token.card.last4,
          cardCountry: token.card.country,
          studioId,
        },
        "updateStripePayment",
        {
          "X-Auth-Token": getAuthToken().token,
        }
      );
      if (req.status === 200) {
        ReactTooltip.rebuild();
      }
    } catch (e) {
      if (e.response.data.error) {
        onFailed("Failed to update", "You have already subscribed");
      } else {
        onFailed(
          "Failed to update",
          "Please enter your card details correctly"
        );
      }
    }
  }

  async submitForm(ev) {
    const { onSubscribe, plan, studioId, studioName, onFailed } = this.props;
    this.setState({
      isClicked: true,
    });
    // User clicked submit
    let req = "";
    try {
      const { token } = await this.props.stripe.createToken({
        name: studioName,
      });
      if (token) {
        this.setState({ isClicked: false });
        onSubscribe(
          "You have successfully subscribed.",
          "blank",
          "support@gamesmith.com",
          "For any questions, you can reach out to",
          "or through live chat."
        );
      } else {
        onFailed(
          "Failed to Subscribe",
          "Please enter your card details correctly"
        );
      }
      req = await makeRequest(
        "POST",
        {
          tokenId: token.id,
          tokenType: token.type,
          tokenUsed: token.used,
          livemode: token.livemode,
          plan,
          clientIp: token.client_ip,
          cardId: token.card.id,
          cardExpMonth: token.card.exp_month,
          cardExpYear: token.card.exp_year,
          companyName: token.card.name,
          cardBrand: token.card.brand,
          cardFunding: token.card.funding,
          cardAddressZip: token.card.address_zip,
          cardLast4: token.card.last4,
          cardCountry: token.card.country,
          studioId,
        },
        "subscribe",
        {
          "X-Auth-Token": getAuthToken().token,
        }
      );
      if (req.status === 200) {
        const { user, onGetRecruiter, onStudioRequest, onGetCountries } =
          this.props;
        const loginRecruiterStudio = !!(
          getUserData() && getUserData().recruiter
        )
          ? getUserData().recruiter.companyId
          : -1;
        onGetRecruiter(user && user.recruiter ? user.recruiter.id : -1);
        onStudioRequest(loginRecruiterStudio);
        onGetCountries();
        ReactTooltip.rebuild();
      }
    } catch (e) {
      if (e.response.data.error) {
        onFailed("Failed to Subscribe", "You have already subscribed");
      } else {
        onFailed(
          "Failed to Subscribe",
          "Please enter your card details correctly"
        );
      }
    }
  }

  render() {
    const divStyle = {
      margin: "40px",
      border: "5px solid pink",
      color: "#FFFFFF",
    };
    const page = this.props.page ? this.props.page : "recruiter";
    const { studioStripeData } = this.props;
    const cardNumber =
      studioStripeData && studioStripeData.cardLast4
        ? `**** **** **** ${studioStripeData.cardLast4}`
        : "";
    const expDate =
      studioStripeData && studioStripeData.expMonth
        ? ` ${studioStripeData.expMonth}  / ${studioStripeData.expYear}`
        : "";
    return (
      <div>
        <div className="row">
          <div className="col-sm-12" style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#FFFFFF" }}>Company Name</label>
              <div
                className={s.elementWrapper}
                style={{ borderBottom: "1px solid white" }}
              >
                <input
                  type="text"
                  value={this.props.studioName}
                  className={s.nameoncardField}
                  id="nameoncard"
                />
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ base: { fontSize: "0.8rem", color: "#FFFFFF" } }}>
                Card number
              </label>
              <div style={{ borderBottom: "1px solid white" }}>
                {cardNumber.length ? (
                  <CardNumberElement
                    style={{
                      base: {
                        fontSize: "18px",
                        color: "#FFFFFF",
                        marginBottom: "2rem",
                      },
                    }}
                    placeholder={cardNumber}
                  />
                ) : (
                  <CardNumberElement
                    style={{
                      base: {
                        fontSize: "18px",
                        color: "#FFFFFF",
                        marginBottom: "2rem",
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5" style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ base: { fontSize: "0.8rem", color: "#FFFFFF" } }}>
                Expiration date
              </label>
              <div style={{ borderBottom: "1px solid white" }}>
                {expDate.length ? (
                  <CardExpiryElement
                    style={{
                      base: {
                        fontSize: "18px",
                        color: "#FFFFFF",
                        marginBottom: "2rem",
                      },
                    }}
                    placeholder={expDate}
                  />
                ) : (
                  <CardExpiryElement
                    style={{
                      base: {
                        fontSize: "18px",
                        color: "#FFFFFF",
                        marginBottom: "2rem",
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
          <div className="col-sm-5" style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ base: { fontSize: "0.8rem", color: "#FFFFFF" } }}>
                CVC
              </label>
              <div style={{ borderBottom: "1px solid white" }}>
                <CardCVCElement
                  style={{
                    base: {
                      fontSize: "18px",
                      color: "#FFFFFF",
                      marginBottom: "2rem",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {page === "recruiter" ? (
              <Button
                style={{ width: "100%" }}
                icon={this.state.isClicked && spinner}
                className={s.payButton}
                text={page === "recruiter" ? "SUBSCRIBE" : "UPDATE"}
                color="#f8e81c"
                onClick={
                  this.state.nameOnCard !== "" &&
                  !this.state.isClicked &&
                  this.submitForm
                }
              />
            ) : (
              <Button
                style={{ width: "100%" }}
                className={s.payButton}
                text={page === "recruiter" ? "SUBSCRIBE" : "UPDATE"}
                color="#f8e81c"
                onClick={
                  this.state.nameOnCard !== "" &&
                  !this.state.isClicked &&
                  this.updatePaymentDetails
                }
              />
            )}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}
AddPaymentForm.propTypes = {
  onSubscribe: PropTypes.func,
  plan: PropTypes.string,
  studioName: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  onGetRecruiter: PropTypes.func,
  onStudioRequest: PropTypes.func,
  onGetCountries: PropTypes.func.isRequired,
  page: PropTypes.string,
};

// export default injectStripe(AddPaymentForm);
export default injectStripe(
  connect(
    createStructuredSelector({
      user: selectUser(),
      recruiter: selectRecruiter(),
    }),
    (dispatch) => ({
      dispatch,
      onFailed: (title, message) => dispatch(openMessage(title, message)),
      onSubscribe: (title, message, email, startMessage, endMessage) =>
        dispatch(
          openSubscribe(title, message, { email, startMessage, endMessage })
        ),
      onGetRecruiter: (id) => dispatch(recruiterConnectionsRequest(id)),
      onGetCountries: () => dispatch(getCountriesRequest()),
      onStudioRequest: (id) => dispatch(getRecruiterStudioRequest(id)),
    })
  )(AddPaymentForm)
);
