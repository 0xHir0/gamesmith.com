/*
 * Availability form component
 */

import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import Button from "components/UI/Button";
import Checkbox from "components/UI/Checkbox";

import s from "./styles.module.scss";

export const fields = [
  "disputedGame",
  "disputedCompany",
  "makerId",
  "creditId",
  "title",
  "studio",
  "makerName",
];

let DisputeForm = ({
  fields: {
    disputedGame,
    disputedCompany,
    makerId,
    creditId,
    title,
    studio,
    makerName,
  },
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Checkbox
      className={s.disputeCheckBox}
      {...disputedGame}
    >{`${makerName.value} did not work on ${title.value} `}</Checkbox>
    <Checkbox
      className={s.disputeCheckBox}
      {...disputedCompany}
    >{`${makerName.value} has never worked for ${studio.value} `}</Checkbox>
    <p className={s.margin}>
      Verification disputes will not be publically displayed. All disputes shall
      be privately monitored by Gamesmith.
    </p>
    <Button className={s.orangeColor} type="submit" text="SUBMIT" />
  </form>
);

DisputeForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default DisputeForm = reduxForm({
  form: "dispute",
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(DisputeForm);
