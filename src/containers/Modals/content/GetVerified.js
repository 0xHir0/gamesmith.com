import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Modal from "components/UI/Modal";
import GetVerification from "components/GetVerification";
import {
  gameMakersRequest,
  searchGameMakersRequest,
  sendInviteRequest,
} from "containers/App/actions";

import {
  selectGameMakers,
  selectIsFetchingMaker,
  selectIsSearchingMaker,
} from "containers/App/selectors";

class GetVerified extends Component {
  componentDidMount() {
    const { data, onGetMakers } = this.props;
    onGetMakers(data.makerID, data.gameID, data.creditID);
  }
  onSubmit = (users) => {
    const {
      data: { gameID, creditID, makerID, title, makerName },
    } = this.props;
    this.props.onSendInvite({
      users,
      gameID,
      creditID,
      makerID,
      title,
      makerName,
    });
  };
  onMakerSearch = (e, gameId, searchTerm) => {
    const {
      data: { makerID, creditID },
    } = this.props;
    this.props.onSearchGameMakers(makerID, gameId, searchTerm, creditID);
    e.preventDefault();
  };
  render() {
    const {
      data,
      className = "",
      isOpen,
      onCloseModal,
      gameMakers,
      isFetching,
      onGetMakers,
    } = this.props;
    return (
      <div>
        <Modal
          title=""
          className={className}
          isOpen={isOpen}
          closeModal={onCloseModal}
        >
          <GetVerification
            isFetching={isFetching}
            data={data}
            gameMakers={gameMakers}
            handleGetMaker={onGetMakers}
            handleMakerSearch={this.onMakerSearch}
            handleSubmit={this.onSubmit}
          />
        </Modal>
      </div>
    );
  }
}

GetVerified.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  onGetMakers: PropTypes.func,
  gameMakers: PropTypes.array,
  isFetching: PropTypes.bool,
  onSearchGameMakers: PropTypes.func,
  onSendInvite: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    isFetching: selectIsFetchingMaker(),
    isSearching: selectIsSearchingMaker(),
    gameMakers: selectGameMakers(),
  }),
  (dispatch) => ({
    dispatch,
    onGetMakers: (makerId, gameId, creditId) =>
      dispatch(gameMakersRequest({ makerId, gameId, creditId })),
    onSearchGameMakers: (makerId, gameId, searchTerm, creditId) =>
      dispatch(
        searchGameMakersRequest({ makerId, gameId, searchTerm, creditId })
      ),
    onSendInvite: (data) => dispatch(sendInviteRequest(data)),
  })
)(GetVerified);
