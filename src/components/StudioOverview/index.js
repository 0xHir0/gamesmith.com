import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./styles.module.scss";
import StudioGameCard from "../StudioGameCard";
import StudioGameCardNew from "../StudioGameCardNew";
import Button from "../UI/Button";
import StudioJobCardNew from "../StudioJobCardNew";
import { getCompanyMakersRequest } from "../../containers/CompanyEmployees/actions";
import { openOutOfClicks, openSignIn } from "../../containers/Modals/actions";
import {
  selectCompanyEmployees,
  selectIsFetching,
  selectIsLastPage,
} from "../../containers/CompanyEmployees/selectors";
import { selectUser } from "../../containers/App/selectors";
import StudioPeopleCardNew from "../StudioPeopleCardNew";
import StudioServices from "../StudioServices";
import StudioBenefits from "../StudioBenefits";

class StudioOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "",
    };
  }
  componentDidMount() {
    const { slug, onGetCompanyMaker } = this.props;
    onGetCompanyMaker(slug, 0);
  }
  browseAll = (page) => {
    this.setState({ selectedPage: page }, () =>
      this.props.setPage(this.state.selectedPage)
    );
  };
  render() {
    const {
      games,
      jobs,
      heroUrl,
      bannerUrl,
      studioId,
      description,
      studioName,
      slug,
      user,
      owner,
      onEditJob,
      isValidated,
      onValidate,
      onApply,
      onJobDetails,
      authenticated,
      hasCV,
      token,
      onSignIn,
      countryOptions,
      studioLogo,
      onGetCompanyMaker,
      makers,
      isLastPage,
      doc,
      isFetching,
      setPage,
    } = this.props;
    return (
      <section>
        <div className={s.root}>
          <div className={s.margin}>
            <div className={s.flex}>
              {/*<div className={s.slider}>*/}
              {/*<img src={bannerUrl}/>*/}
              {/*<div className="container">*/}
              {/*  <div className="mySlides">*/}
              {/*    <div className="numbertext">1 / 6</div>*/}
              {/*    <img  style="width:100%"/>*/}
              {/*  </div>*/}

              {/*  <div className="mySlides">*/}
              {/*    <div className="numbertext">2 / 6</div>*/}
              {/*    <img  style="width:100%"/>*/}
              {/*  </div>*/}

              {/*  <div className="mySlides">*/}
              {/*    <div className="numbertext">3 / 6</div>*/}
              {/*    <img  style="width:100%"/>*/}
              {/*  </div>*/}

              {/*  <div className="mySlides">*/}
              {/*    <div className="numbertext">4 / 6</div>*/}
              {/*    <img  style="width:100%"/>*/}
              {/*  </div>*/}

              {/*  <div className="mySlides">*/}
              {/*    <div className="numbertext">5 / 6</div>*/}
              {/*    <img  style="width:100%"/>*/}
              {/*  </div>*/}

              {/*  <div className="mySlides">*/}
              {/*    <div className="numbertext">6 / 6</div>*/}
              {/*    <img style="width:100%"/>*/}
              {/*  </div>*/}

              {/*  <a className="prev" onClick="plusSlides(-1)">❮</a>*/}
              {/*  <a className="next" onClick="plusSlides(1)">❯</a>*/}

              {/*  <div className="caption-container">*/}
              {/*    <p id="caption"></p>*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*</div>*/}
              <div className={s.description}>
                <h3>Hello. We are {studioName}</h3>
                <p>{description}</p>
              </div>
            </div>
          </div>
          <div className={s.margin}>
            {games ? (
              <div>
                <h3>Game Credit</h3>
                <StudioGameCardNew
                  imageUrl={games.imageUrl}
                  name={games.name}
                  releaseDate={"yayy"}
                  genres={"Genres"}
                />
                <Button
                  className={s.btn}
                  text={"Browse all games"}
                  onClick={() => this.browseAll("games")}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={s.margin}>
            {jobs.length > 0 && jobs.length <= 25 && (
              <h3>Open Roles - Join Us!</h3>
            )}
            <div className={s.row}>
              {jobs && jobs.length > 0
                ? jobs.map(
                    (i, j) =>
                      j < 3 && (
                        <div className={s.col}>
                          <StudioJobCardNew
                            studioId={studioId}
                            id={i.id}
                            role={i.role.name}
                            company={studioName}
                            user={user}
                            startDate={
                              i.startDate
                                ? new Date(i.startDate).toString()
                                : ""
                            }
                            location={i.location}
                            country={i.address && i.address.country}
                            state={i.address && i.address.state}
                            city={i.address && i.address.city}
                            countryId={i.address && i.address.countryId}
                            stateId={i.address && i.address.stateId}
                            countryOptions={countryOptions}
                            platforms={i.platforms}
                            workCategories={i.workCategories}
                            description={i.description}
                            imgUrl={i.imgUrl}
                            owner={owner}
                            onEditJob={onEditJob}
                            isValidated={isValidated}
                            onValidate={onValidate}
                            onApply={onApply}
                            applied={i.applied}
                            onJobDetails={onJobDetails}
                            authenticated={authenticated}
                            onSignIn={onSignIn}
                            ownerId={i.ownerId}
                            jobFamilyId={i.jobFamilyId}
                            youtubeVideoUrl={i.youtubeVideo}
                            cvOption={i.cvOption}
                            gtOption={i.gtOption}
                            hasCv={hasCV}
                            token={token}
                            studioLogo={studioLogo}
                            jobFamily={
                              i.studioJobCardDetails &&
                              i.studioJobCardDetails.jobFamily
                                ? i.studioJobCardDetails.jobFamily
                                : "-"
                            }
                            jobType={
                              i.studioJobCardDetails &&
                              i.studioJobCardDetails.jobType
                                ? i.studioJobCardDetails.jobType
                                : "-"
                            }
                            expiredAt={
                              i.studioJobCardDetails &&
                              i.studioJobCardDetails.expiredAt
                                ? i.studioJobCardDetails.expiredAt
                                : null
                            }
                          />
                        </div>
                      )
                  )
                : ""}
            </div>
            {jobs && jobs.length > 3 && (
              <Button
                className={s.btn}
                text={"Browse all jobs"}
                onClick={() => this.browseAll("jobs")}
              />
            )}
          </div>
          <div className={s.margin}>
            {makers && makers.length > 0 && <h3>People behind {studioName}</h3>}
            {!isFetching && (
              <div className={s.row}>
                {makers && makers.length > 0
                  ? makers.map(
                      (i, j) =>
                        j < 3 && (
                          <div className={s.col}>
                            <StudioPeopleCardNew
                              id={makers[0].id}
                              firstName={i.profile.first_name}
                              lastName={i.profile.last_name}
                              imgUrl={i.profile.img_url}
                              location={i.profile.location}
                              role={i.curr_role}
                            />
                          </div>
                        )
                    )
                  : ""}
              </div>
            )}

            {makers && makers.length > 0 && (
              <Button
                className={s.btn}
                text={"Browse people"}
                onClick={() => this.browseAll("people")}
              />
            )}
          </div>
          {/*
          <div className={s.margin}>
            <StudioBenefits />
            <Button className={s.btn} text={'Browse benefits'} onClick={() => this.browseAll('benefits')}/>
          </div>

          <div className={s.margin}>
            <StudioServices />
            <Button className={s.btn} text={'Browse services'} onClick={() => this.browseAll('services')}/>
          </div>*/}
        </div>
      </section>
    );
  }
}
StudioOverview.propTypes = {
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
)(StudioOverview);
