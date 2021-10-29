/*
 *Recruiter Maker Container
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import loc from "./img/location.svg";
import option from "./img/option.svg";
import work from "./img/work.svg";
import chat from "./img/chat.png";
import show from "./img/phone-envelope-01.svg";
import emailIcon from "./img/phone-envelope-02.svg";
import call from "./img/phone-envelope-03.svg";
import contact from "./img/phone-envelope-04.svg";
import { Link } from "react-router";
import { addUserToGroup, filterAwards } from "utils";
import { openExceedRecruiterSearchLimit } from "../../containers/Modals/actions";
import {
  addApplozicCountRequest,
  getApplozicRecruiterRequest,
} from "../../containers/App/actions";
import { applozicMsgCount } from "../../containers/App/selectors";
import { selectContactDetailCount } from "../../containers/RecruiterPeople/selectors";
import { getContactDetailCountRequest } from "../../containers/RecruiterPeople/actions";
import satellite from "./img/satellite.svg";
import trophy from "../../data/icons/awards_icons/trophy.png"

class RecruiterMakerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMore: false,
      blurText: true,
    };
  }
  componentDidMount() {
    const { checkApplozicCount } = this.props;
    checkApplozicCount();
  }

  handleSeeMore = (e) => {
    e.preventDefault();
    this.setState({ seeMore: !this.state.seeMore });
    if (this.state.seeMore) {
      const element = document.getElementById("seeMore");
      element.scrollIntoView();
    }
  };
  showLimitMessage = (id, firstName, lastName) => {
    const name = `${firstName} ${lastName}`;
    if (document.querySelector("#dltOnCallback")) {
      document.querySelector("#dltOnCallback").remove();
    }

    const appendedx = document.createElement("div");
    const themessages = document.querySelectorAll(".mck-message-inner div");
    const whoisthis = id;

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
    addUserToGroup(id, name);
    return new Promise((resolve, reject) => {
      this.props.dispatch(addApplozicCountRequest(resolve, reject));
    }).then(() => {
      if (!this.props.messageCount) {
        document.getElementById("mck-sidebox").style.visibility = "hidden";
        this.props.dispatch(
          openExceedRecruiterSearchLimit({
            message: "Let's look at a plan that suits your business needs.",
          })
        );
      }
    });
  };
  viewDetail() {
    return new Promise((resolve, reject) => {
      this.props.dispatch(getContactDetailCountRequest(resolve, reject));
    }).then(() => {
      if (this.props.contactDetailCount) {
        this.setState({ blurText: false });
      } else {
        this.props.dispatch(
          openExceedRecruiterSearchLimit({
            message: "Let's look at a plan that suits your business needs.",
          })
        );
      }
    });
  }
  render() {
    const {
      index,
      id,
      firstName,
      lastName,
      imgUrl,
      VerificationScore,
      currRole,
      currCompany,
      location,
      email,
      phoneNumber,
      jobCategory,
      employmentType,
      about,
      gameCredits,
      highestRatedTitle,
      handleRedirect,
      studio,
      workCategories,
      awards
    } = this.props;
    const linkTo = `/maker/${id}`;
    let filteredAwards;
    if (awards) {
      filteredAwards = filterAwards(awards)
      let awardsWrapper =
        filteredAwards.length ? (
          <span className={`${s.awards}`}>
            <img className={s.trophy} src={trophy} alt="icon" />
            {filteredAwards.length > 1 ? (
              <small>{filteredAwards.length} awards</small>
            ) : (
              <small> 1 award </small>
            )}
          </span>) : (
          null
        )
    }
    return (
      <div className={s.root}>
        <div className={s.row}>
          <div className={s.colAvatar}>
            <Avatar
              firstName={firstName}
              image={imgUrl}
              className={s.avatar}
              handleRedirect={handleRedirect}
            />
          </div>
          <div className={s.colName}>
            <h3 className={s.userName}>
              {firstName}{" "}
              <span className={this.state.blurText ? s.blur : ""}>
                {lastName}
              </span>
            </h3>
          </div>
          <div className={s.colScore}>
            <p className={s.scoreLine}>
              &#x2605; {VerificationScore}{" "}
              {VerificationScore > 0 ? "Verifications" : "Verification"}
            </p>
          </div>
        </div>
        <div className={s.job}>
          <img src={work} alt="work" className={s.work} />
          <div className={s.jobTitle}>{currRole}</div>
        </div>
        <div className={s.description}>
          <img src={loc} alt="work" className={s.locIcon} />
          <div className={s.loc}>{location}</div>
          <img src={option} alt="work" className={s.locIcon} />
          <div className={s.loc}>{jobCategory}</div>
        </div>
        {workCategories && workCategories.length > 0 && (
          <div className={s.job}>
            <img className={s.work} src={satellite} alt="icon" />
            <div className={s.jobTitle}>Open to opportunities</div>
          </div>
        )}
        <div className={s.description}>
          <img src={emailIcon} alt="work" className={s.locIcon} />
          <div className={s.loc}>
            <span className={this.state.blurText ? s.blur : ""}>{email}</span>
          </div>
          <img src={call} alt="work" className={s.locIcon} />
          <div className={s.loc}>
            <span className={this.state.blurText ? s.blur : ""}>
              {phoneNumber}
            </span>
          </div>
        </div>
        <div className={s.about}>
          <h4 className={s.heading}>About</h4>
          <hr></hr>
          {about ? (
            <p className={s.paragraph}>{about}</p>
          ) : (
            "Contact this member for more information."
          )}
        </div>
        <div id="seeMore">
          <div className={s.gameHistory}>
            <h4 className={s.heading}>Game History</h4>
            {filteredAwards.length ? (
              <h4 className={s.heading}>Has worked on {filteredAwards.length > 1 ? `${filteredAwards.length} awards winning games` : "1 award winning game"} </h4>
            ) : (
              null
            )}
            {highestRatedTitle &&
            highestRatedTitle > 0 &&
            highestRatedTitle !== 99 ? (
              <h4 className={s.paragraph} style={{ float: "right" }}>
                Highest Rated Title Score: {highestRatedTitle}
              </h4>
            ) : (
              ""
            )}
          </div>
          <hr></hr>
          {console.log(filteredAwards)}
          {gameCredits && gameCredits.length > 0 ? (
            gameCredits.map((i) => (
              <div className="row">
                <div className={`${s.gameCredits} col-md-4`}>
                  <p className={s.paragraph}>{i.game ? i.game.name : "-"}</p>
                  {filteredAwards.map(award => {
                    if (i.game_id === award.game_id){
                      return <img className={s.trophy} key={award.game_id} src={trophy} alt="trophy"/>
                    }})}
                </div>
                <div className="col-md-3">
                  <p className={s.paragraph}>{i.company ? i.company : "-"}</p>
                </div>
                <div className="col-md-3">
                  <p className={s.paragraph}>{i.role ? i.role.name : "-"}</p>
                </div>
                <div className="col-md-2">
                  <p className={s.paragraph}>
                    {i.start_year ? i.start_year : "-"}-
                    {i.end_year ? i.end_year : "-"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className={s.paragraph}>The user has not worked on any game.</p>
          )}
          <div className={s.button}>
            <Link to={linkTo}>
              <Button
                text="SHOW MORE"
                className={s.ShowMoreButton}
                icon={show}
              />
            </Link>
            {studio.licenseType !== "unlimited-jobs-post-pack" && (
              <Button
                text="MESSAGE"
                onClick={() => this.showLimitMessage(id, firstName, lastName)}
                className={`applozic-launcher ${s.messageButton}`}
                icon={chat}
                data-mck-id={id}
                data-mck-name={`${firstName} ${lastName}`}
              />
            )}
            <Button
              text="CONTACT DETAILS"
              className={s.contactDetails}
              icon={contact}
              onClick={() => this.viewDetail()}
            />
          </div>
        </div>
      </div>
    );
  }
}

RecruiterMakerCard.propTypes = {
  index: PropTypes.number,
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imgUrl: PropTypes.string,
  currRole: PropTypes.string,
  currCompany: PropTypes.string,
  location: PropTypes.string,
  jobCategory: PropTypes.string,
  employmentType: PropTypes.string,
  VerificationScore: PropTypes.number,
  about: PropTypes.string,
  gameCredits: PropTypes.array,
  highestRatedTitle: PropTypes.string,
  contactDetailCount: PropTypes.bool,
  getContactDetailCount: PropTypes.func,
  addApplozicCount: PropTypes.func,
  dispatch: PropTypes.func,
  messageCount: PropTypes.bool,
  awards: PropTypes.array
};
export default connect(
  createStructuredSelector({
    contactDetailCount: selectContactDetailCount(),
    messageCount: applozicMsgCount(),
  }),
  (dispatch) => ({
    dispatch,
    getContactDetailCount: () => dispatch(getContactDetailCountRequest()),
    checkApplozicCount: () => dispatch(getApplozicRecruiterRequest()),
  })
)(RecruiterMakerCard);
