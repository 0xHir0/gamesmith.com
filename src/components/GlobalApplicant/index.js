import React from "react";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import s from "./styles.module.scss";
import DropdownMenu from "react-dd-menu";

class GlobalApplicant extends React.Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  render() {
    const {
      jobs,
      maker,
      onApplicantDetails,
      onMoveGlobalApplicantToJob,
      isFullLicense,
      license,
      toggleTab,
      onOpenUpgradePrompt,
    } = this.props;
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      className: s.dropdownContent,
      toggle: (
        <a className={s.action} onClick={this.toggle}>
          <i className="fa fa-download fa-rotate-270" />
        </a>
      ),
      align: "center",
      size: "md",
    };
    return (
      <div
        className={s.root}
        onClick={
          !isFullLicense
            ? () => onOpenUpgradePrompt(toggleTab, "plan")
            : () => console.log("")
        }
      >
        <p
          className={
            license === "basic" ||
            license === "branded" ||
            license === "single-job-post"
              ? s.blur
              : ""
          }
        >
          <a
            className={s.makerName}
            onClick={
              license === "basic" ||
              license === "branded" ||
              license === "single-job-post"
                ? () => onOpenUpgradePrompt(toggleTab, "plan")
                : () => onApplicantDetails(maker)
            }
          >{`${maker.firstName}`}</a>
        </p>
        <p>
          <a>{truncate(maker.currRole, { length: 40 })}</a>
        </p>
        <p
          className={
            license === "basic" ||
            license === "branded" ||
            license === "single-job-post"
              ? s.blur
              : ""
          }
        >
          {truncate(maker.location, { length: 40 })}
        </p>
        {(license === "basic" ||
          license === "branded" ||
          license === "single-job-post") && (
          <p>{truncate(maker.availability, { length: 40 })}</p>
        )}
        {/*<div className={s.links}>*/}
        {/*   <DropdownMenu {...menuOptions}>*/}
        {/*    {jobs && jobs.length > 0 && jobs.map(j => (*/}
        {/*      <a key={j.id} className={s.job}*/}
        {/*        onClick={(license === 'basic' || license === 'branded' || license === 'single-job-post') ? () => toggleTab('plan') : () => onMoveGlobalApplicantToJob(j.id, maker.id)}>{j.role.name}</a>*/}
        {/*    ))}*/}
        {/*  </DropdownMenu>*/}
        {/*</div>*/}
      </div>
    );
  }
}

GlobalApplicant.propTypes = {
  maker: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  jobs: PropTypes.array.isRequired,
  onApplicantDetails: PropTypes.func.isRequired,
  onOpenUpgradePrompt: PropTypes.func.isRequired,
  onMoveGlobalApplicantToJob: PropTypes.func.isRequired,
};

export default GlobalApplicant;
