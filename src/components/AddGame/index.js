/*
 * Sign Up Container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import AutoComplete from "components/UI/AutoComplete";
import Select from "components/UI/Select";
import JobTag from "components/UI/JobTags";
import Switch from "react-switch";
import Button from "../UI/Button";
import { Link } from "react-router";
import Input from "../UI/Input";
import endYearDate from "data/endYear";
import { change, reduxForm, untouch } from "redux-form";

export const fields = [
  "firstName",
  "lastName",
  "email",
  "password",
  "country",
  "state",
  "city",
  "currCompany",
  "currRole",
  "isStudent",
  "degree",
  "university",
  "workCategories[].id",
  "phoneNumber",
  "currGame",
  "gameRole",
  "platforms[].id",
  "startYear",
  "endYear",
  "accomplishments",
  "softwareUsed",
  "location",
];

const uncheckedIcon = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 11,
      color: "white",
      paddingRight: 2.5,
      paddingTop: 1,
    }}
  >
    NO
  </div>
);
const checkedIcon = (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 11,
      fontWeight: 400,
      color: "black",
      paddingRight: 2.5,
      paddingLeft: 2.5,
      paddingTop: 1,
    }}
  >
    YES
  </div>
);
let makerToggle = false;

const validate = (values) => {
  const errors = {};
  if (!values.currGame && makerToggle) {
    errors.currGame = "Required";
  }
  if (!values.gameRole && makerToggle) {
    errors.gameRole = "Required";
  }
  if (values.platforms.length < 1 && makerToggle) {
    errors.platforms = "Required";
  }
  if (!values.startYear && makerToggle) {
    errors.startYear = "Required";
  }
  if (!values.endYear && makerToggle) {
    errors.endYear = "Required";
  } else if (values.endYear < values.startYear) {
    errors.endYear = "End Year cannot be in Past.";
  }
  if (!values.accomplishments && makerToggle) {
    errors.accomplishments = "Required";
  }
  if (!values.softwareUsed && makerToggle) {
    errors.softwareUsed = "Required";
  }
  if (!values.location && makerToggle) {
    errors.location = "Required";
  }
  return errors;
};

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGameFields: false,
      clickPlatform: true,
    };
  }
  componentDidMount() {
    this.setState({ showGameFields: this.props.isGameMaker });
  }
  componentWillUnmount() {
    setTimeout(() => {
      if (document.querySelector("#job-platform-label1")) {
        document.querySelector("#job-platform-label1").click();
      }
    }, 200);
  }

  handleIsGameMaker = () => {
    this.setState({ showGameFields: !this.state.showGameFields }, () => {
      makerToggle = !makerToggle;
      this.props.handleGameMaker(this.state.showGameFields);
      this.props.dispatch(change("CreateProfile", "currGame", ""));
      this.props.dispatch(change("CreateProfile", "gameRole", ""));
      this.props.dispatch(change("CreateProfile", "startYear", ""));
      this.props.dispatch(change("CreateProfile", "endYear", ""));
      this.props.dispatch(change("CreateProfile", "accomplishments", ""));
      this.props.dispatch(change("CreateProfile", "softwareUsed", ""));
      this.props.dispatch(change("CreateProfile", "location", ""));
      this.props.dispatch(untouch("CreateProfile", "currGame"));
      this.props.dispatch(untouch("CreateProfile", "gameRole"));
      this.props.dispatch(untouch("CreateProfile", "startYear"));
      this.props.dispatch(untouch("CreateProfile", "endYear"));
      this.props.dispatch(untouch("CreateProfile", "accomplishments"));
      this.props.dispatch(untouch("CreateProfile", "softwareUsed"));
      this.props.dispatch(untouch("CreateProfile", "location"));
      if (this.state.clickPlatform) {
        setTimeout(() => {
          if (document.querySelector("#job-platform-label1")) {
            document.querySelector("#job-platform-label1").click();
          }
        }, 200);
        this.setState({ clickPlatform: !this.state.clickPlatform });
      }
    });
  };

  disableButton = () => {
    this.props.handleSubmit();
    if (document.getElementById("submitButton")) {
      document.getElementById("submitButton").disabled = true;
    }
    setTimeout(this.setEnableButton, 3000);
  };
  setEnableButton = () => {
    if (document.getElementById("submitButton")) {
      document.getElementById("submitButton").disabled = false;
    }
  };

  render() {
    const {
      fields: {
        currGame,
        gameRole,
        currCompany,
        platforms,
        startYear,
        endYear,
        accomplishments,
        softwareUsed,
        location,
      },
      student,
      isGameMaker,
      handleGameMaker,
      onGetSuggestions,
      setPlatforms,
      previousPage,
      handleSubmit,
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className={s.root}>
          <div className={s.formName}>
            <h3>Add Game</h3>
            <div className={s.dots}>
              <span className={s.disableCount}>0</span>
              <span className={s.disableCount}>0</span>
              <span className={s.enableCount}>0</span>
            </div>
          </div>
          <h3>Have you worked on a game?</h3>
          {!student ? (
            <div className={s.switch}>
              <Switch
                checked={isGameMaker}
                onChange={this.handleIsGameMaker}
                offColor="#323232"
                onColor="#FFFF00"
                id="normal-switch"
                offHandleColor="#1c1c1c"
                onHandleColor="#191919"
                uncheckedIcon={uncheckedIcon}
                checkedIcon={checkedIcon}
                height={20}
                width={45}
                handleDiameter={20}
                className={s.gameMakerOption}
              />
            </div>
          ) : (
            <p className={s.subheading}>
              Students can add game once account is created.
            </p>
          )}
          {!isGameMaker && (
            <div className={s.noGame}>
              <Button
                id="submitButton"
                text="Continue"
                className={s.continueButton}
                type="submit"
                onClick={this.disableButton}
              />
            </div>
          )}

          {isGameMaker && !student && (
            <div>
              <p className={s.subheading}>
                OK, tell us a bit about your work on this game.
              </p>
              <div className={s.row}>
                <div className={s.col}>
                  <AutoComplete
                    {...currGame}
                    label="Game Title"
                    ignoreCase
                    inputName="game"
                    loadOptions={(query, cb) => {
                      onGetSuggestions({ url: "games", query, cb });
                    }}
                  />
                </div>
                <div className={s.col}>
                  <AutoComplete
                    {...gameRole}
                    label="Job Title"
                    ignoreCase
                    loadOptions={(query, cb) => {
                      onGetSuggestions({ url: "roles", query, cb });
                    }}
                  />
                </div>
                <div className={s.col}>
                  <AutoComplete
                    {...currCompany}
                    label="Company"
                    ignoreCase
                    loadOptions={(query, cb) => {
                      onGetSuggestions({ url: "companies", query, cb });
                    }}
                  />
                </div>
              </div>
              <div className={s.row}>
                <div className={s.col}>
                  <Select
                    className="input"
                    options={endYearDate}
                    label="Start Year"
                    {...startYear}
                  />
                </div>
                <div className={s.col}>
                  <Select
                    className="input"
                    options={endYearDate}
                    label="End Year"
                    {...endYear}
                  />
                </div>
                <div className={s.col}></div>
              </div>
              <div>
                <JobTag
                  label="Platforms"
                  platforms={platforms}
                  setPlatforms={setPlatforms}
                />
              </div>
              <div className={s.row}>
                <div className={s.col}>
                  <Input label="Responsibilities" open {...accomplishments} />
                </div>
                <div className={s.col}>
                  <Input
                    label="Tools (e.g. Maya, UE5)"
                    open
                    {...softwareUsed}
                  />
                </div>
                <div className={s.col}>
                  <Input label="Location" open {...location} />
                </div>
              </div>
              <div>
                <Button
                  id="submitButton"
                  text="Done"
                  className={s.doneButton}
                  type="submit"
                  onClick={this.disableButton}
                />
              </div>
            </div>
          )}
          <Link className={s.previous} onClick={previousPage}>
            PREVIOUS
          </Link>
        </div>
      </form>
    );
  }
}

AddGame.propTypes = {
  fields: PropTypes.object.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  setPlatforms: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleGameMaker: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  student: PropTypes.bool.isRequired,
  isGameMaker: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "CreateProfile",
  fields,
  destroyOnUnmount: false,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddGame);
