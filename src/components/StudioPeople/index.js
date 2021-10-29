import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import { getCompanyMakersRequest } from "../../containers/CompanyEmployees/actions";
import {
  selectCompanyEmployees,
  selectIsFetching,
  selectIsLastPage,
} from "../../containers/CompanyEmployees/selectors";
import { selectUser } from "../../containers/App/selectors";
import { openOutOfClicks, openSignIn } from "../../containers/Modals/actions";
import StudioPeopleCardNew from "../StudioPeopleCardNew";

class StudioPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { slug, onGetCompanyMaker } = this.props;
    onGetCompanyMaker(slug, 0);
  }
  render() {
    const {
      slug,
      onGetCompanyMaker,
      studioName,
      makers,
      onSignIn,
      isLastPage,
      doc,
      user,
      isFetching,
    } = this.props;
    return (
      <section>
        <div className={s.root}>
          <h3>People behind {studioName}</h3>
          {!isFetching && (
            <div className={`${s.row} row`}>
              {makers && makers.length > 0 ? (
                makers.map(
                  (i) =>
                    i.profile && (
                      <div className={s.column}>
                        <StudioPeopleCardNew
                          id={i.id}
                          firstName={i.profile.first_name}
                          lastName={i.profile.last_name}
                          imgUrl={i.profile.img_url}
                          location={i.profile.location}
                          role={i.curr_role}
                        />
                      </div>
                    )
                )
              ) : (
                <h4 className={s.center}>This studio has no employees.</h4>
              )}
            </div>
          )}
          {isFetching && <h4 className={s.loading}>Loading...</h4>}
        </div>
      </section>
    );
  }
}
StudioPeople.propTypes = {
  onGetCompanyMaker: PropTypes.func.isRequired,
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
)(StudioPeople);
