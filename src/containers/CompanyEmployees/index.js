/*
 * CompanyEmployees container
 */

import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import Helmet from "react-helmet";
import MakersCard from "components/MakersCard";
import Button from "../../components/UI/Button";

import {
  selectIsFetching,
  selectCompanyEmployees,
  selectIsLastPage,
} from "./selectors";

import { getCompanyMakersRequest } from "./actions";

import { openOutOfClicks, openSignIn } from "../Modals/actions";

import s from "./styles.module.scss";
import { createStructuredSelector } from "reselect";
import { getGameURLFromId } from "../../utils/hashingFunction";
import { selectUser } from "../App/selectors";
import { checkAuthToken } from "../../utils";

class CompanyEmployees extends React.Component {
  componentDidMount() {
    const {
      params: { studio },
      onGetCompanyMaker,
    } = this.props;
    onGetCompanyMaker(studio, 0);
  }
  handleRedirect = (path) => {
    const { onOpenOutOfClicks, onOpenSignIn, history } = this.props;
    if (window.count <= 14) {
      if (checkAuthToken()) {
        history.push(path);
      } else {
        onOpenSignIn();
      }
    } else {
      onOpenOutOfClicks();
    }
  };

  render() {
    const {
      params: { studio },
      makers,
      onSignIn,
      isLastPage,
      doc,
      onGetCompanyMaker,
      user,
      isFetching,
    } = this.props;
    const count = makers ? makers.length : 0;
    return (
      <main role="main" className={s.root}>
        <Helmet
          title="CompanyEmployees"
          meta={[
            { name: "description", content: "Description of CompanyEmployees" },
          ]}
        />
        <br />
        <br />
        <br />
        <div className={s.center_text}>
          <h3>Meet the world's top game professionals</h3>
          <br />
          <br />
        </div>
        <div className={s.company_makers}>
          {makers &&
            makers.map((p, idx) => (
              <MakersCard
                key={idx}
                id={p.id}
                matchScore={p.match_score}
                currID={user ? user.id : -1}
                avatar={p.profile && p.profile.img_url}
                awards={p.awards}
                firstName={p.profile && p.profile.first_name}
                location={p.profile && p.profile.location}
                lastName={p.profile && p.profile.last_name}
                currRole={p.curr_role}
                currGame={p.curr_game}
                isSubscribe={p.account && p.account.isSubscribe}
                width={doc.width}
                query={this.props.location.search}
                currCompany={p.curr_company}
                connection={
                  p.connected ? "yes" : p.connectPending ? "pending" : "no"
                }
                claimed={p.claimed}
                page="people"
                // onConnect={onConnect}
                imageSm={
                  p.latest_game_id
                    ? getGameURLFromId(p.latest_game_id.toString(), "550x740")
                    : getGameURLFromId(
                        Math.floor(Math.random() * 3000 + 0).toString(),
                        "550x740"
                      )
                }
                imageLg={
                  p.latest_game_id
                    ? getGameURLFromId(p.latest_game_id.toString(), "1500x400")
                    : getGameURLFromId(
                        Math.floor(Math.random() * 3000 + 0).toString(),
                        "550x740"
                      )
                }
                platforms={p.platforms}
                timesVerified={p.timesVerified ? p.timesVerified : null}
                onSignIn={onSignIn}
                handleRedirect={this.handleRedirect}
              />
            ))}
        </div>
        <div style={{ textAlign: "center" }}>
          {!isLastPage && !isFetching && makers && makers.length !== 0 && (
            <Button
              onClick={() => onGetCompanyMaker(studio, count)}
              text="More"
            />
          )}
          <br />
          <br />
        </div>
        {!isFetching && makers && makers.length === 0 && (
          <div className={s.center_text}>
            <h4>No data found...</h4>
          </div>
        )}
        <div>
          <div className={s.center_text}>
            {isFetching && (
              <div style={{ marginTop: "2rem" }}>
                <h3>Loading</h3>
                <div className={`loader ${s.loading}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}
CompanyEmployees.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  params: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  makers: PropTypes.array.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func,
  location: PropTypes.object,
  onGetCompanyMaker: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
  onOpenOutOfClicks: PropTypes.func.isRequired,
  onOpenSignIn: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    isFetching: selectIsFetching(),
    makers: selectCompanyEmployees(),
    isLastPage: selectIsLastPage(),
    user: selectUser(),
  }),
  (dispatch) => ({
    dispatch,
    onGetCompanyMaker: (name, count) =>
      dispatch(getCompanyMakersRequest(name, count)),
    onSignIn: () => dispatch(openSignIn()),
    onOpenOutOfClicks: () => dispatch(openOutOfClicks()),
  })
)(CompanyEmployees);
