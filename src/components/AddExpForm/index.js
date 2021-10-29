/*
 * Add experience form component
 */

import React from "react";
import PropTypes from "prop-types";

import { reduxForm } from "redux-form";
import { isEqual } from "lodash";
import browser from "bowser";

import Button from "components/UI/Button";
import Input from "components/UI/Input";
import Select from "components/UI/Select";
import Tags from "components/UI/Tags";
import JobTag from "components/UI/JobTags";
import AutoComplete from "components/UI/AutoComplete";
import Checkbox from "components/UI/Checkbox";
import year from "data/year";
import endYearDate from "data/endYear";
import gameIcon from "data/icons/add-control-interface.png";

import validate from "./validation";

import s from "./styles.module.scss";

export const fields = [
  "creditId",
  "currRole",
  "currGame",
  "company",
  "platforms[].id",
  "startYear",
  "endYear",
  "endDate",
  "accomplishments",
  "softwareUsed",
  "location",
  "underNda",
];
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
let AddExpForm = ({
  fields: {
    creditId = 0,
    currRole,
    currGame,
    company,
    platforms,
    startYear,
    endYear,
    accomplishments,
    softwareUsed,
    location,
    underNda,
  },
  gameId,
  handleSubmit,
  isEdit,
  onGetSuggestions,
  setPlatforms,
  error,
  page,
  onDeleteExp,
  initialValues,
  workedgame,
}) => {
  return (
    <form id={"thisForm"} className={s.root} onSubmit={handleSubmit}>
      {(browser && browser.msie) || workedgame == "checked" ? (
        <div style={workedgame == "checked" ? { display: "none" } : {}}>
          <Input
            label="Game Title"
            ignoreCase
            /*disabled={currGame.initialValue ? true : false}*/ open
            {...currGame}
            inputName="game"
          />
          <Input label="Job Title" ignoreCase open {...currRole} />
          <Input
            label="Company"
            disabled={company.initialValue ? true : false}
            open
            {...company}
          />
        </div>
      ) : (
        <div>
          <AutoComplete
            {...currGame}
            label="Game Title"
            ignoreCase
            inputName="game"
            // disabled={currGame.initialValue ? true : false}
            loadOptions={(query, cb) => {
              onGetSuggestions({ url: "games", query, cb });
            }}
          />
          <AutoComplete
            {...currRole}
            label="Job Title"
            ignoreCase
            loadOptions={(query, cb) => {
              onGetSuggestions({ url: "roles", query, cb });
            }}
          />
          <AutoComplete
            {...company}
            label="Company"
            ignoreCase
            loadOptions={(query, cb) => {
              onGetSuggestions({ url: "companies", query, cb });
            }}
          />
        </div>
      )}
      <div style={!ismobile ? { display: "block" } : { display: "none" }}>
        {" "}
        <JobTag
          label="Platforms"
          platforms={platforms}
          setPlatforms={setPlatforms}
        />
      </div>
      <div className="row">
        {error && platforms.length < 1 && (
          <div className={`${s.error}`}>{error}</div>
        )}
      </div>
      <div>
        <div className={s.left}>
          <div style={!ismobile ? { display: "block" } : { display: "none" }}>
            {" "}
            <Input label="Start year" open {...startYear} />{" "}
          </div>
        </div>
        <div
          className={s.right}
          style={!ismobile ? { display: "block" } : { display: "none" }}
        >
          <Select
            className="input"
            options={endYearDate}
            label="End Year"
            {...endYear}
          />
        </div>
      </div>
      <div style={!ismobile ? { display: "block" } : { display: "none" }}>
        <Input
          label="Responsibilities"
          type="textarea"
          open
          {...accomplishments}
        />{" "}
      </div>

      <div style={{ display: "none" }}></div>
      <div style={!ismobile ? { display: "block" } : { display: "none" }}>
        <Input label="Tools (e.g. Maya, UE5)" open {...softwareUsed} />
        <Input label="Location" open {...location} />
      </div>

      <span
        className={s.modalRemoveButton}
        style={!ismobile ? { display: "block", padding:'0px 72px !important' } : { display: "none" }}
      >
        {isEdit && (isEqual(page, "games") || isEqual(page, "game")) && (
          <Button
            type="button"
            text="Delete"
            onClick={() =>
              onDeleteExp(gameId, currGame.value, currGame.value, page)
            }
          />
        )}
      </span>

      <div
        style={
          ismobile && !currGame.initialValue
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <svg
          style={{
            marginLeft: "-22px",
            marginRight: "22px",
            position: "absolute",
          }}
          id="svgone"
          onClick={(e) => {
            document.querySelector("#hasgameX").click();
            document.querySelector("#job-platform-label2").click();
            document.querySelector("#svgone").style.display = "none";
            document.querySelector("#svgtwo").style.display = "";
          }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            id="Rectangle_2_copy"
            data-name="Rectangle 2 copy"
            d="M3,0H14a3,3,0,0,1,3,3V14a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0Z"
            transform="translate(0.5 0.5)"
            fill="rgba(255,255,255,0)"
            stroke="#9a9a9a"
          />
        </svg>
        <svg
          style={{
            marginLeft: "-22px",
            marginRight: "22px",
            position: "absolute",
            display: "none",
          }}
          id="svgtwo"
          onClick={(e) => {
            document.querySelector("#hasgameX").click();
            document.querySelector("#job-platform-label1").click();
            document.querySelector("#svgtwo").style.display = "none";
            document.querySelector("#svgone").style.display = "";
          }}
          width="17"
          height="17"
          viewBox="0 0 17 17"
        >
          <rect
            id="Rectangle_2_copy"
            data-name="Rectangle 2 copy"
            width="17"
            height="17"
            rx="3"
            fill="#fd0"
          />
          <image
            id="Layer_2_copy"
            data-name="Layer 2 copy"
            width="10"
            height="8"
            transform="translate(4 5)"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAABHNCSVQICAgIfAhkiAAAAHlJREFUGFeF0LEJwmAQhuEnldorCIGs4gyuEURcwQ1MJ2mcQ2xEiE0QXMI95OD/IUU0V9693PvxFaZnhU0xwS3wwvUfOMMbN+x/gfP0KaBDWANs8cExxQhdjzt2OVqA63Q444QnOtTD/Fm9xAMlLlk3BsauwhbNWBNfdvgQ7FgzXxIAAAAASUVORK5CYII="
          />
        </svg>
        I have not worked on a game yet
      </div>
      <div className={s.imposition}>
        <Button
          style={
            currGame.initialValue
              ? { marginTop: "0px", paddingTop: "0px", paddingBottom: "0px" }
              : {
                  display: "flex",
                  margin: "auto",
                  marginTop: "30px",
                  background: "rgb(255, 221, 0)",
                }
          }
          type="submit"
          text={currGame.initialValue ? "Join Team" : "Next"}
          icon={gameIcon}
        />
      </div>
      <br></br>
      <br></br>
      {!currGame.initialValue ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="106"
          height="10"
          viewBox="0 0 106 10"
        >
          <g id="Progress" transform="translate(-154 -746)">
            <rect
              id="Yellow"
              width="21"
              height="10"
              rx="5"
              transform="translate(218 746)"
              fill="#fd0"
            />
            <rect
              id="_2"
              data-name="2"
              width="11"
              height="10"
              rx="5"
              transform="translate(154 746)"
              fill="#1c1c1c"
            />
            <rect
              id="_3"
              data-name="3"
              width="11"
              height="10"
              rx="5"
              transform="translate(176 746)"
              fill="#1c1c1c"
            />
            <rect
              id="_4"
              data-name="4"
              width="11"
              height="10"
              rx="5"
              transform="translate(197 746)"
              fill="#1c1c1c"
            />
            <rect
              id="_5"
              data-name="5"
              width="11"
              height="10"
              rx="5"
              transform="translate(249 746)"
              fill="#1c1c1c"
            />
          </g>
        </svg>
      ) : (
        ""
      )}
    </form>
  );
};

AddExpForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setPlatforms: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default AddExpForm = reduxForm({
  form: "experience",
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddExpForm);
