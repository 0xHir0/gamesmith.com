/*
 * Add Opportunities Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./styles.module.scss";
import Button from "../UI/Button";
import Phone from "components/UI/Phone";
import makerWorkCategories from "../../data/workCategories";
import checked from "./img/checked.svg";
import { Link } from "react-router";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { saveCvCdnUrl, deleteCvCdnUrl } from "../../containers/SignUp/actions";
import { selectCvUrl } from "../../containers/SignUp/selectors";
import { reduxForm } from "redux-form";
import uploadcare from "uploadcare-widget";
export const fields = ["workCategories[].id", "phoneNumber", "makerCvUrl"];

class AddOpportunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnCVButton: false,
      cdnUrl: "",
    };
  }
  componentDidMount() {
    this.setState({ cdnUrl: this.props.cvUrl });
  }

  uploadCV(e) {
    e.preventDefault();
    const widget = uploadcare.SingleWidget('<input data-tabs="file">');
    widget.validators.push((info) => {
      if (info.name !== null) {
        if (
          !/\.docx/i.test(info.name) &&
          !/\.pdf/i.test(info.name) &&
          !/\.doc/i.test(info.name)
        ) {
          throw Error("PDF or Word document-only");
        }
      }
    });
    widget.openDialog(null).done((file) => {
      file.promise().done((fileInfo) => {
        this.props.onSaveCVUrl(fileInfo.cdnUrl);
        this.setState({ cdnUrl: fileInfo.cdnUrl });
      });
    });
  }
  handleMouseEnterCVButton() {
    this.setState({ isOnCVButton: true });
  }
  handleMouseLeaveCVButton() {
    this.setState({ isOnCVButton: false });
  }
  deleteMakerCV(e) {
    e.preventDefault();
    this.props.onDeleteCVUrl();
    this.setState({ cdnUrl: "" });
  }
  render() {
    const {
      fields: { workCategories, phoneNumber, makerCvUrl },
      cvUrl,
      setWorkCategories,
      previousPage,
      handleSubmit,
    } = this.props;
    const selectedWorkCategories = workCategories.map((p2) => p2.id.value);
    return (
      <form onSubmit={handleSubmit}>
        <div className={s.root}>
          <div className={s.formName}>
            <h3>Add Opportunities</h3>
            <div className={s.dots}>
              <span className={s.disableCount}>0</span>
              <span className={s.enableCount}>0</span>
              <span className={s.disableCount}>0</span>
            </div>
          </div>
          <h3>Thank you! Now, let's help you get discovered by studios.</h3>
          <p className={s.subheading}>
            What type of opportunities shall people contact you about?
          </p>
          <div className={`row ${s.row}`}>
            {makerWorkCategories.map((p, idx) => (
              <div key={idx} className={`col-md-4 col-sm-4 ${s.col}`}>
                <input
                  type="checkbox"
                  id={`workCategories-${p.id}`}
                  className={s.checkBox}
                  value={p.id}
                  checked={selectedWorkCategories.indexOf(p.id) !== -1}
                  onChange={(e) =>
                    setWorkCategories(workCategories, e, selectedWorkCategories)
                  }
                />
                <label
                  id={`workCategories-label-${p.id}`}
                  htmlFor={`workCategories-${p.id}`}
                  className={`${s.tag} ${
                    selectedWorkCategories.indexOf(p.id) !== -1 ? s.active : ""
                  }`}
                >
                  <img
                    src={checked}
                    className={
                      selectedWorkCategories.indexOf(p.id) !== -1
                        ? s.radioButton
                        : s.unCheckBox
                    }
                    alt={"check"}
                  />
                </label>
                <span className={s.font}>{p.label}</span>
              </div>
            ))}
          </div>
          <div className={s.phoneNumberBox}>
            <p className={s.subheading}>
              Which Phone number can studios reach you at?
            </p>
            <div className={s.phoneNumber}>
              <Phone className="input" open label="Phone" {...phoneNumber} />
            </div>
          </div>
          <div className={s.uploadCv}>
            {!this.state.cdnUrl && (
              <Button
                text="Upload CV"
                className={s.uploadCvButton}
                onClick={(e) => this.uploadCV(e)}
              />
            )}
            <div>
              {this.state.cdnUrl && (
                <Button
                  text="Delete CV"
                  className={s.deleteCVBtn}
                  onClick={(e) => this.deleteMakerCV(e)}
                />
              )}
            </div>
          </div>
          <div>
            <Button
              text="Continue"
              className={s.continueButton}
              type="submit"
            />
          </div>
          <Link className={s.previous} onClick={previousPage}>
            PREVIOUS
          </Link>
        </div>
      </form>
    );
  }
}

AddOpportunities.propTypes = {
  fields: PropTypes.object.isRequired,
  onSaveCVUrl: PropTypes.func.isRequired,
  onDeleteCVUrl: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setWorkCategories: PropTypes.func.isRequired,
  cvUrl: PropTypes.string,
};

AddOpportunities = connect(
  createStructuredSelector({
    cvUrl: selectCvUrl(),
  }),
  (dispatch) => ({
    dispatch,
    onSaveCVUrl: (cvCdnUrl) => dispatch(saveCvCdnUrl(cvCdnUrl)),
    onDeleteCVUrl: () => dispatch(deleteCvCdnUrl()),
  })
)(AddOpportunities);

export default reduxForm({
  form: "CreateProfile",
  fields,
  destroyOnUnmount: false,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddOpportunities);
