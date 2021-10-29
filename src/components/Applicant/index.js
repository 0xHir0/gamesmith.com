import React from "react";
import PropTypes from "prop-types";
import { truncate } from "lodash";
import s from "./styles.module.scss";
import DropdownMenu from "react-dd-menu";
import { openExceedRecruiterSearchLimit } from "../../containers/Modals/actions";
import { addApplozicCountRequest } from "containers/App/actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { applozicMsgCount } from "containers/App/selectors";
import { addUserToGroup } from "utils";
class Applicant extends React.Component {
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
  showLimitMessage = (maker) => {
    const name = `${maker.firstName} ${maker.lastName}`;
    if (document.querySelector("#dltOnCallback")) {
      document.querySelector("#dltOnCallback").remove();
    }
    const appendedx = document.createElement("div");
    const themessages = document.querySelectorAll(".mck-message-inner div");
    const whoisthis = maker.id;

    if (themessages.length > 0) {
      appendedx.innerHTML = `<a title="Go to profile" href="/maker/${whoisthis}" id="dltOnCallback" class="blk-lg-3" style="margin-right: 10px;"><img src="https://gamesmith-profile-pic.s3.amazonaws.com/${whoisthis}" style="max-width: 40px; min-height: 40px; max-height: 40px; min-width: 40px; border-radius: 100px"></a>`;
      document
        .querySelector("#mck-tab-individual > div")
        .appendChild(appendedx);
      const themessages = document.querySelectorAll(".mck-message-inner div");
      if (themessages.length > 0) {
        console.log(themessages[0].getAttribute("data-contact"));
      }
      const divToMakeClickable = document
        .querySelector("#dltOnCallback")
        .parentElement.parentElement.parentElement.querySelector(
          ".mck-box-title"
        );
      divToMakeClickable.style.cursor = "pointer";
      divToMakeClickable.addEventListener("click", this.clickOnGoToProfile);
    }
    addUserToGroup(maker.id, name);
    return new Promise((resolve, reject) => {
      this.props.dispatch(addApplozicCountRequest(resolve, reject));
    }).then(() => {
      if (!this.props.applozicMsgCount) {
        document.getElementById("mck-sidebox").style.visibility = "hidden";
        if (this.props.user.recruiter) {
          this.props.dispatch(
            openExceedRecruiterSearchLimit({
              message: "Let's look at a plan that suits your business needs.",
            })
          );
        }
      }
    });
  };
  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      className: s.applicantDropdownContent,
      toggle: (
        <a className={s.action} onClick={this.toggle}>
          <i className="fa fa-download fa-rotate-270" />
        </a>
      ),
      align: "center",
      size: "md",
    };
    const {
      job,
      jobId,
      jobs,
      maker,
      isRejected,
      onApplicantDetails,
      onRejectApplicant,
      onMoveApplicantToOtherJob,
      dispatch,
      user,
    } = this.props;
    const filterJobs = jobs.filter((j) => j.id != (job ? job.id : jobId));
    return (
      <div className={s.root}>
        <p>
          <a
            onClick={() => onApplicantDetails(maker)}
          >{`${maker.firstName} ${maker.lastName}`}</a>
        </p>
        <p>
          <a>{truncate(maker.currRole, { length: 40 })}</a>
        </p>
        <p>{truncate(maker.location, { length: 40 })}</p>
        <div className={s.links}>
          <div className={s.subLinks}>
            <a
              className={`applozic-launcher ${s.buttonChat}`}
              data-mck-id={maker.id}
              data-mck-name={`${maker.firstName} ${maker.lastName}`}
              onClick={() => this.showLimitMessage(maker)}
            >
              <i className="fa-envelope fa" />
            </a>
            {!isRejected ? (
              <a
                className={s.action}
                onClick={() =>
                  onRejectApplicant(maker.id, job ? job.id : jobId)
                }
              >
                <i className="fa-thumbs-down fa" />
              </a>
            ) : (
              <a className={s.action}>
                <i className={`fa-thumbs-down fa ${s.red}`} />
              </a>
            )}
          </div>
          <DropdownMenu {...menuOptions}>
            {filterJobs &&
              filterJobs.length > 0 &&
              filterJobs.map((j, idx) => (
                <a
                  key={idx}
                  className={s.job}
                  onClick={() =>
                    onMoveApplicantToOtherJob(
                      job ? job.id : jobId,
                      j.id,
                      maker.id
                    )
                  }
                >
                  {j.role.name}
                </a>
              ))}
          </DropdownMenu>
        </div>
      </div>
    );
  }
}

Applicant.propTypes = {
  maker: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  job: PropTypes.object,
  user: PropTypes.object,
  jobId: PropTypes.number,
  jobs: PropTypes.array.isRequired,
  onApplicantDetails: PropTypes.func.isRequired,
  onApplicantMessage: PropTypes.func.isRequired,
  onRejectApplicant: PropTypes.func.isRequired,
  onMoveApplicantToOtherJob: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  applozicMsgCount: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.bool.isRequired,
  ]),
  isRejected: PropTypes.bool,
};
export default connect(
  createStructuredSelector({
    applozicMsgCount: applozicMsgCount(),
  }),
  (dispatch) => ({
    dispatch,
  })
)(Applicant);
