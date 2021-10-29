/*
 * Add Experience modal
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { toInteger } from "lodash";

import { addExpRequest, getAutocompleteRequest } from "containers/App/actions";

import Modal from "components/UI/Modal";
import AddExpForm from "components/AddExpForm";
import gameIcon from "../../../data/icons/add-control-interface.png";

class AddExp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workedgame: "true",
      page: this.props.data.page ? this.props.data.page : "",
      isNewGame: this.props.data.isNewGame ? this.props.data.isNewGame : false,
      searchQuery: this.props.data.searchQuery
        ? this.props.data.searchQuery
        : "",
      gameId: this.props.data.gameID ? this.props.data.gameID : -1,
    };
  }

  onSubmit = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(
        addExpRequest({
          page: this.state.page,
          isNewGame: this.state.isNewGame,
          searchQuery: this.state.searchQuery,
          gameId: this.state.gameId,
          values,
          resolve,
          reject,
        })
      );
    });

  getSuggestions = (query) => this.props.handleAutoComplete(query);

  setPlatforms = (platforms, e, selectedPlatforms) => {
    const index = selectedPlatforms.indexOf(toInteger(e.target.value));
    if (e.target.checked) {
      platforms.addField({ id: toInteger(e.target.value) });
    } else {
      platforms.removeField(index);
    }
  };

  render() {
    const { className = "", isOpen, onCloseModal, data } = this.props; // eslint-disable-line
    const ismobile = window.innerWidth <= 1150;
    const utilFiller = (el, text) => {
      if (!document.getElementsByName(el)[0]) {
        if (document.querySelector("#thisForm")) {
          const input = document.createElement("input");
          input.name = el;
          document.querySelector("#thisForm").appendChild(input);
        }
      }
      if (document.getElementsByName(el)[0]) {
        document.getElementsByName(el)[0].value = text;
        const event = new Event("input", { bubbles: true });
        document.getElementsByName(el)[0].dispatchEvent(event);
      }
    };

    setTimeout(() => {
      const common = "Not filled yet";
      utilFiller("accomplishments", common);
      utilFiller("startYear", "2021");
      utilFiller("softwareUsed", common);
      utilFiller("location", common);
    }, 200);
    setTimeout(() => {
      if (document.querySelector("#job-platform-label1")) {
        document.querySelector("#job-platform-label1").click();
      }
    }, 2000);

    const title = (
      <div style={{ width: "100%" }}>
        <h3 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "500" }}>
          {!ismobile ? "Finally!" : ""}
        </h3>
        <h3 style={{ color: "#ffffff", fontSize: "1.2rem" }}>
          Add a game you’re proud to have worked on
        </h3>
        <input
          type="checkbox"
          style={{ display: "none" }}
          id="hasgameX"
          onClick={(e) => {
            this.setState({
              workedgame: e.target.checked ? "checked" : "notchecked",
            });
            setTimeout(() => {
              utilFiller("currGame", " ");
              utilFiller("currRole", " ");
              utilFiller("company", " ");
            }, 200);
          }}
        />
      </div>
    );
    return (
      <Modal
        title={
          this.props.data.page === "games" || this.props.data.page === "game"
            ? "Join Team"
            : title
        }
        className={className}
        isOpen={isOpen}
        closeModal={onCloseModal}
        titleImage={gameIcon}
      >
        <AddExpForm
          initialValues={{
            currGame: data ? data.gameTitle : "",
            company: data ? data.studioName : "",
          }}
          onSubmit={this.onSubmit}
          setPlatforms={this.setPlatforms}
          onGetSuggestions={this.getSuggestions}
          workedgame={this.state.workedgame}
        />
      </Modal>
    );
  }
}

AddExp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.object,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  handleAutoComplete: PropTypes.func.isRequired,
};

export default connect(createStructuredSelector({}), (dispatch) => ({
  dispatch,
  handleAutoComplete: (query) => dispatch(getAutocompleteRequest(query)),
}))(AddExp);
