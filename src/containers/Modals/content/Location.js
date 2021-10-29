/*
 * Location modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { createStructuredSelector } from "reselect";

import { selectUser, selectCountries } from "containers/App/selectors";
import { selectMaker } from "containers/Maker/selectors";

import { makerRequest } from "containers/Maker/actions";
import { locationRequest, getCountriesRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import LocationForm from "components/LocationForm";
import LocationIcon from "../../../data/icons/location.png";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoCountryId:
        this.props.maker &&
        this.props.maker.additionalInfo &&
        this.props.maker.additionalInfo[0] &&
        this.props.maker.additionalInfo[0].address &&
        this.props.maker.additionalInfo[0].address.countryId,
      geoStateId:
        this.props.maker &&
        this.props.maker.additionalInfo &&
        this.props.maker.additionalInfo[0] &&
        this.props.maker.additionalInfo[0].address &&
        this.props.maker.additionalInfo[0].address.stateId,
    };
  }

  componentDidMount() {
    const { user, onGetMaker, onGetCountries } = this.props;
    onGetMaker(user.id);
    onGetCountries();
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      let addressId =
        this.props.maker &&
        this.props.maker.additionalInfo &&
        this.props.maker.additionalInfo[0] &&
        this.props.maker.additionalInfo[0].address
          ? this.props.maker.additionalInfo[0].address.id
          : -1;
      if (
        this.state.geoCountryId == "WLS" ||
        this.state.geoCountryId == "SCT" ||
        this.state.geoCountryId == "ENG" ||
        this.state.geoCountryId == "NIR"
      ) {
        values.state = null;
        dispatch(
          locationRequest({
            addressId: addressId,
            countryId: this.state.geoCountryId,
            stateId: null,
            values,
            resolve,
            reject,
          })
        );
      } else {
        dispatch(
          locationRequest({
            addressId: addressId,
            countryId: this.state.geoCountryId,
            stateId: this.state.geoStateId,
            values,
            resolve,
            reject,
          })
        );
      }
    });

  setGeoCountryId = (val) => {
    this.setState({
      geoCountryId: val,
    });
  };

  setGeoStateId = (val) => {
    this.setState({
      geoStateId: val,
    });
  };

  render() {
    const {
      user: {
        maker: { status },
      },
      maker,
      className = "",
      isOpen,
      onCloseModal,
      countryOptions,
    } = this.props;
    return (
      <Modal
        title="Location"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={LocationIcon}
      >
        <LocationForm
          initialValues={{
            status,
            country:
              maker &&
              maker.additionalInfo &&
              maker.additionalInfo[0] &&
              maker.additionalInfo[0].address &&
              maker.additionalInfo[0].address.country,
            state:
              maker &&
              maker.additionalInfo &&
              maker.additionalInfo[0] &&
              maker.additionalInfo[0].address &&
              maker.additionalInfo[0].address.state,
            city:
              maker &&
              maker.additionalInfo &&
              maker.additionalInfo[0] &&
              maker.additionalInfo[0].address &&
              maker.additionalInfo[0].address.city,
          }}
          setGeoCountryId={this.setGeoCountryId}
          setGeoStateId={this.setGeoStateId}
          countryOptions={countryOptions}
          cId={
            maker &&
            maker.additionalInfo &&
            maker.additionalInfo[0] &&
            maker.additionalInfo[0].address &&
            maker.additionalInfo[0].address.countryId
          }
          sId={
            maker &&
            maker.additionalInfo &&
            maker.additionalInfo[0] &&
            maker.additionalInfo[0].address &&
            maker.additionalInfo[0].address.stateId
          }
          onSubmit={this.onSubmit}
        />
      </Modal>
    );
  }
}

Location.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onGetMaker: PropTypes.func.isRequired,
  countryOptions: PropTypes.array.isRequired,
  onGetCountries: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
    countryOptions: selectCountries(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMaker: (id) => dispatch(makerRequest(id)),
    onGetCountries: () => dispatch(getCountriesRequest()),
  })
)(Location);
