/*
 * Funding container
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StudioCard from "components/StudioCard";

import bannerPlaceholder from "../../data/images/banner-placeholder.png";
import logoPlaceholder from "../../data/images/logo-placeholder.jpg";
import { getPartnerRequest } from "../Ecosystem/actions";
import s from "./styles.module.scss";
import { createStructuredSelector } from "reselect";
import { checkAuthToken } from "../../utils";
import {
  selectIsFetching,
  selectIsLastPage,
  selectOffset,
  selectStudios,
} from "../Ecosystem/selectors";
import { openParnterMessage } from "../Modals/actions";

class Funding extends React.Component {
  componentDidMount() {
    const { getFundingComp } = this.props;
    getFundingComp();
  }
  render() {
    const { studios, isFetching, isLastPage, onPartnerMessage } = this.props;
    return (
      <main role="main" className={s.root}>
        <h1 className={s.studioHeading}>Funding</h1>
        {checkAuthToken() === false
          ? studios.map((st, idx) => (
              <div className={s.fundingfilter}>
                <StudioCard
                  key={idx}
                  id={st.id}
                  slug={st.slug}
                  name={st.name}
                  location={st.location || "set location"}
                  logo={st.logo == "" ? logoPlaceholder : st.logo}
                  bannerUrl={
                    st.bannerUrl == "" ? bannerPlaceholder : st.bannerUrl
                  }
                  isAuth={checkAuthToken() ? true : false}
                  onSignIn={onPartnerMessage}
                  partnerName={"funding"}
                />
              </div>
            ))
          : studios.map((st, idx) => (
              <div>
                <StudioCard
                  key={idx}
                  id={st.id}
                  slug={st.slug}
                  name={st.name}
                  location={st.location || "set location"}
                  logo={st.logo == "" ? logoPlaceholder : st.logo}
                  bannerUrl={
                    st.bannerUrl == "" ? bannerPlaceholder : st.bannerUrl
                  }
                />
              </div>
            ))}
        {!isFetching && studios.length === 0 && (
          <h3>There are no studios to display</h3>
        )}
        {isFetching && (
          <div>
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {isLastPage && studios.length !== 0 && <h3>No more results</h3>}
      </main>
    );
  }
}

Funding.propTypes = {
  params: PropTypes.object.isRequired,
  getFundingComp: PropTypes.func.isRequired,
  studios: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  onPartnerMessage: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    studios: selectStudios(),
    isFetching: selectIsFetching(),
    offset: selectOffset(),
    isLastPage: selectIsLastPage(),
  }),

  (dispatch) => ({
    dispatch,
    getFundingComp: () => dispatch(getPartnerRequest("Funding")),
    onPartnerMessage: () =>
      dispatch(
        openParnterMessage(
          "invite",
          "Members Only: Please sign in or apply for membership to access this section",
          "blank",
          "blank"
        )
      ),
  })
)(Funding);
