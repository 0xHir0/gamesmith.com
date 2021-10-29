import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { selectUser } from "containers/App/selectors";
import { selectMaker, selectMakerCredits } from "containers/Maker/selectors";
import { connect } from "react-redux";
import s from "./styles.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router";
import { BACKEND_URL } from "utils";

class ProfileCompleteness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFetched: false,
      slides: [],
      makerInfo: {},
      workCategories: [],
    };
  }

  componentWillUpdate() {
    const { maker } = this.props;
    const { makerInfo, workCategories } = this.state;

    // if (!window.location.href.includes('https://gamesmith.com'))
    //   makerInfo.phoneNumberValidated ? //console.log('%c Phone number is validated! ', 'background: green; color: white') : //console.log('%c Phone number is not validated! ', 'background: red; color: white')
  }
  componentDidMount() {
    const { user } = this.props;
    const { hasFetched } = this.state;
    const doReq = () => {
      fetch(`${BACKEND_URL}/api/gamemaker/${user.id}`, {
        headers: {
          accept: "application/json, text/plain, */*",
          "x-auth-token": JSON.parse(localStorage.authToken).token,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          let cloneReq = data;
          this.setState({ makerInfo: cloneReq.maker });
          this.setState({ workCategories: cloneReq });
          this.setState({ hasFetched: true });
        });
    };
    if (!hasFetched) doReq();
  }
  render() {
    const { user, isCvUploaded, innerFontStyle, customClass } = this.props;
    const { makerInfo, workCategories, hasFetched } = this.state;
    const verified =
      makerInfo.credits &&
      makerInfo.credits.reduce((score, credit) => score + credit.score, 0) > 0;

    const timesVerified =
      verified &&
      makerInfo.credits.reduce((score, credit) => score + credit.score, 0);
    const totalVerfiedGames =
      timesVerified &&
      makerInfo.credits.reduce(
        (score, credit) => (credit.score > 0 ? score + 1 : score),
        0
      );

    // .then(data => this.setState({makerInfo :data}))

    const countProfileCompleteness = () => {
      let count = 0;
      //console.log("%c Logger begin ", "background: green; color: white");

      if (makerInfo.imgUrl) count = count + 5;
      //console.log(makerInfo.imgUrl);
      if (makerInfo.phoneNumberValidated) count = count + 5;
      //console.log(makerInfo.phoneNumberValidated);
      if (makerInfo.lastName) count = count + 5;
      //console.log(makerInfo.lastName);
      if (makerInfo.location) count = count + 5;
      //console.log(makerInfo.location);
      if (JSON.parse(localStorage.userData).email) count = count + 5;
      //console.log(JSON.parse(localStorage.userData).email);
      if (makerInfo.bio)
        if (makerInfo.bio.length >= 25) count = count + 10;
        else count = count + 5;

      //console.log(makerInfo.bio);
      if (makerInfo.skills)
        if (makerInfo.skills.length >= 25) count = count + 5;

      //console.log(makerInfo.skills);
      if (makerInfo.accomplishments)
        if (makerInfo.accomplishments.length >= 25) count = count + 5;

      ////console.log(makerInfo.accomplishments);
      if (makerInfo.currRole && makerInfo.currCompany && makerInfo.currGame)
        count = count + 5;

      if (makerInfo.connections) count = count + 5;
      ////console.log(makerInfo.connections);

      if (totalVerfiedGames > 0) count = count + totalVerfiedGames * 5;
      ////console.log(totalVerfiedGames);
      if (timesVerified) count = count + timesVerified * 5;
      if (makerInfo.additionalInfo) {
        if (makerInfo.additionalInfo[0].language) count = count + 5;
        if (makerInfo.additionalInfo[0].jobsFamily) count = count + 5;
        if (workCategories.length > 0) count = count + 5;
        if (makerInfo.additionalInfo[0].cvUrl) count = count + 5;

        if (
          !(
            localStorage.getItem("isStudent") == null ||
            localStorage.getItem("isStudent") == false
          )
        )
          count = count + 5;
      }
      //console.log(makerInfo.additionalInfo);
      count = count * 1.2;
      count > 100 ? (count = 100) : (count = count);
      return count;
    };

    const generateSlides = () => {
      let finalSlides = [];

      if (makerInfo.imgUrl)
        if (!makerInfo.imgUrl.length > 1)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add a profile picture"}
              />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add a profile picture"}
              />
            </div>
          );
      if (!makerInfo.phoneNumberValidated)
        finalSlides.push(
          <div>
            {" "}
            <LinkButtonToProfile
              link={"/edit"}
              linktext={"Add a phone number"}
            />
          </div>
        );
      if (makerInfo.bio)
        if (!makerInfo.bio.length >= 50)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile link={"/edit"} linktext={"Add ‘About me’"} />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile link={"/edit"} linktext={"Add ‘About me’"} />
            </div>
          );
      if (makerInfo.skills)
        if (!makerInfo.skills.length >= 50)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add your skills"}
              />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add your skills"}
              />
            </div>
          );
      if (makerInfo.accomplishments)
        if (!makerInfo.accomplishments.length >= 50)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Mention what you are up to"}
              />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add your accomplishments"}
              />
            </div>
          );
      if (makerInfo.latestGameId)
        if (!makerInfo.latestGameId >= 1)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add games you have worked on"}
              />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Add a game you have worked on"}
              />
            </div>
          );
      if (!makerInfo.timesVerified > 0)
        finalSlides.push(
          <div>
            {" "}
            <LinkButtonToProfile
              link={"/edit"}
              linktext={"Get verified for games you have worked on"}
            />
          </div>
        );

      if (makerInfo.additionalInfo)
        if (!makerInfo.additionalInfo[0].cvUrl)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/maker/me"}
                linktext={"Upload a Resume/CV  "}
              />
            </div>
          );

      if (makerInfo.connections)
        if (!makerInfo.connections.length > 0)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/makers"}
                linktext={"Connect with other Makers"}
              />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Connect with other Makers"}
              />
            </div>
          );
      if (makerInfo.workCategories)
        if (!makerInfo.workCategories.length > 0)
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Set your communication preferences"}
              />
            </div>
          );
        else
          finalSlides.push(
            <div>
              {" "}
              <LinkButtonToProfile
                link={"/edit"}
                linktext={"Set your communication preferences"}
              />
            </div>
          );

      return finalSlides;
    };

    const PrevArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div className={s.chevronleft} style={{ ...style }} onClick={onClick} />
      );
    };
    const NextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div
          className={s.chevronright}
          style={{ ...style }}
          onClick={onClick}
        />
      );
    };

    const LinkButtonToProfile = (props) => {
      return (
        <div>
          <button className={s.carouselButton}>
            <Link to={props.link}>{props.linktext}</Link>
          </button>
        </div>
      );
    };

    const settings = {
      dots: true,
      dotsClass: `slick-dots slickChangeBullets`,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div
        className={customClass}
        style={
          (countProfileCompleteness >= 100 ? { display: "none" } : {},
          hasFetched == false ? { visibility: "hidden" } : {})
        }
      >
        <div className={s.carouselWrapper}>
          <div className={s.subCarousel}>
            <h4 style={innerFontStyle} className={s.center}>
              Your profile is {countProfileCompleteness()} % complete
            </h4>
            <div className={""}>
              <div className={s.progressBarWrapper}>
                <div className={s.progressBar}>
                  <div
                    style={{ width: `${countProfileCompleteness()}%` }}
                    className={s.progressBarInner}
                  ></div>
                  <div className={s.slickdots}>
                    <Slider {...settings}>{generateSlides()}</Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
    makerCredits: selectMakerCredits(),
  })
)(ProfileCompleteness);
