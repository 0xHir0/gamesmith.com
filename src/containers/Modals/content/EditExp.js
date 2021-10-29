/*
 * Delete Exp Confirmation modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toInteger } from "lodash";
import Modal from "components/UI/Modal";
import AddExpForm from "components/AddExpForm";
import gameIcon from "../../../data/icons/add-control-interface.png";

import { editExpRequest, getAutocompleteRequest } from "containers/App/actions";
import { openDeleteExp } from "containers/Modals/actions";

class EditExp extends Component {
  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      const {
        data: { page = "edit" },
      } = this.props; // eslint-disable-line
      dispatch(editExpRequest({ page: page, values, resolve, reject }));
    });

  getSuggestions = (data) => this.props.handleAutoComplete(data);

  setPlatforms = (platforms, e, selectedPlatforms) => {
    const index = selectedPlatforms.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      platforms.addField({ id: toInteger(e.target.value) });
    } else {
      platforms.removeField(index);
    }
  };

  render() {
    const ismobile = window.innerWidth <= 1150;
    const {
      className = "",
      isOpen,
      onCloseModal,
      onDeleteExp,
      data: {
        gameData: {
          id,
          company,
          game,
          role,
          location,
          underNda,
          startDate,
          endDate,
          platforms,
          accomplishments,
          softwareUsed,
        },
        page = "edit",
      },
    } = this.props; // eslint-disable-line
    return (
      <Modal
        title="Edit Game"
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={gameIcon}
      >
        <AddExpForm
          onSubmit={this.onSubmit}
          initialValues={{
            creditId: id,
            currRole: role ? role.name : "",
            currGame: game ? game.name : "",
            company,
            underNda: underNda,
            startYear: startDate ? startDate.year.toString() : "",
            endYear: endDate ? endDate.year.toString() : "",
            platforms,
            accomplishments: ismobile ? "not filled yet" : "not filled yet",
            softwareUsed: ismobile ? "not filled yet" : "not filled yet",
            location: ismobile ? "not filled yet" : "not filled yet",
          }}
          gameId={game.id}
          isEdit={true}
          page={page}
          setPlatforms={this.setPlatforms}
          onGetSuggestions={this.getSuggestions}
          onDeleteExp={onDeleteExp}
        />
      </Modal>
    );
  }
}

EditExp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  handleAutoComplete: PropTypes.func.isRequired,
  onDeleteExp: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  onDeleteExp: (gameID, title, searchQuery, page) =>
    dispatch(
      openDeleteExp({
        gameID: gameID,
        gameTitle: title,
        searchQuery: searchQuery,
        page: page,
      })
    ),
  handleAutoComplete: (data) => dispatch(getAutocompleteRequest(data)),
}))(EditExp);
