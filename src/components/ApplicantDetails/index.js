import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/UI/Avatar";
import Button from "components/UI/Button";
import ApplicantGameCard from "components/ApplicantGameCard";
import { Link } from "react-router";

import s from "./styles.module.scss";

const ApplicantDetails = ({ maker, onCloseModal, onViewMyCv }) => {
  const button = (
    <Button
      to={`/maker/${maker.id}`}
      onClick={onCloseModal}
      className={s.applicantBtn}
      style={{ border: 0, marginTop: 5 }}
      text="View Profile"
      color="transparent"
    />
  );
  const credits = maker.credits;
  return (
    <main role="main" className={s.root}>
      <div className="row">
        <div className={s.profile}>
          <div className={s.user}>
            <Avatar
              className={s.avatar}
              linkTo={`/maker/${maker.id}`}
              image={maker.imgUrl}
              firstName={maker.firstName}
              lastName={maker.lastName}
            />
            <h3>{`${maker.firstName} ${maker.lastName}`}</h3>
            {maker.timesVerified && (
              <span className={s.verified}>
                Verified &#x2605; {maker.timesVerified} Games
              </span>
            )}
            {maker.currRole && <h4>{maker.currRole}</h4>}
            {button}
          </div>
          <div className={` ${s.contactInfo}`}>
            <ul>
              {maker.phoneNumber && (
                <li className={s.setLi}>
                  <i className={"fa fa-phone "}></i>
                  <span>{maker.phoneNumber}</span>
                </li>
              )}
              {maker.email && (
                <li className={s.setLi}>
                  <i className={"fa fa-envelope "}></i>
                  <span>{maker.email}</span>
                </li>
              )}
              {maker.cvUrl && (
                <li className={s.setLi}>
                  <i className={"fa fa-file "}></i>
                  <Link
                    style={{ marginLeft: "3%" }}
                    onClick={() => onViewMyCv(maker.cvUrl)}
                  >
                    View CV
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className={` ${s.info}`}>
            <ul>
              {maker.latestGameName && (
                <li className={s.setLi}>
                  <i className={"icon-controller "}></i>
                  <span>{maker.latestGameName}</span>
                </li>
              )}
              {maker.latestGameStudio && (
                <li className={s.setLi}>
                  <i className={"icon-briefcase "}></i>
                  <span>{maker.latestGameStudio}</span>
                </li>
              )}
              {maker.location && (
                <li className={s.setLi}>
                  {/* <i className={"icon-pin"}></i>
                   */}
                   <i className="fas fa-map-marker-alt"></i>
                  <span>{maker.location}</span>
                </li>
              )}
            </ul>
          </div>
          <div className={` ${s.games}`}>
            {credits &&
              credits.length > 0 &&
              credits.map((cr, idx) => (
                <ApplicantGameCard
                  key={idx}
                  title={cr.game.name}
                  role={cr.role.name}
                  location={cr.location}
                  startDate={cr.startDate}
                  endDate={cr.endDate}
                  platforms={cr.platforms}
                />
              ))}
          </div>
          {maker.bio && (
            <div className={s.about}>
              <h4>About</h4>
              <p>{maker.bio}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

ApplicantDetails.propTypes = {
  maker: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  onCloseModal: PropTypes.func.isRequired,
};

export default ApplicantDetails;
