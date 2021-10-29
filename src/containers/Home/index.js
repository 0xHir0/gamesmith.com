import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  openAddStudio,
  openSignUp,
  openPlayVideo,
  openSignIn,
} from "containers/Modals/actions";
import Button from "components/UI/Button";
import p from "./img/p.png";
import p1 from "./img/p1.jpg";
import modalBox from "./img/modalBox.jpg";
import playButton from "./img/play-button.png";
import makerReducer from "containers/Maker/reducer";
import watchvideo from "./img/watchvideo.svg";
import maggieJane from "./img/MaggieJane.png";
import SubscriptionForm from "../../components/SubscriptionForm";
import { addSubscriber } from "../../containers/App/actions";
import s from "./styles.module.scss";

import YouTube from "react-youtube";
import { selectAuth, selectUser } from "containers/App/selectors";
import { Link } from "react-router";
import { push } from "react-router-redux";

const YoutubeVideo = require("react-youtube-video");
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLess: false,
      showVideo: false,
    };
  }
  onSubmitSubscribeRequest = (values, dispatch) =>
    new Promise((resolve, reject) => {
      dispatch(addSubscriber(values.email));
    });
  setRedirection = (location) => {
    this.props.history.push(location);
  };
  handleShowLess = () => {
    if (this.state.isShowLess) {
      const elmnt = document.getElementById("showMore");
      elmnt.scrollIntoView();
    }
    this.setState({ isShowLess: !this.state.isShowLess });
  };
  toggleVideo = () => {
    if (this.state.showVideo) {
      this.setState({ showVideo: false });
    } else {
      this.setState({ showVideo: true });
      setTimeout(() => {
        document.querySelectorAll("iframe")[0].scrollIntoView();
        window.scrollBy(0, -150);
      }, 100);
    }
  };

  componentDidMount() {
    const getViewPort = `${window.screen.width} x ${window.screen.height}`;
    const getUserAgent = navigator.userAgent;
    const queryString = window.location.search
      .slice(1)
      .split("&")
      .map((p) => p.split("="))
      .reduce((obj, pair) => {
        const [key, value] = pair.map(decodeURIComponent);
        return { ...obj, [key]: value };
      }, {});
    const onboardingObj = {
      environment: {
        ip: "123.123.123.123",
        Useragent: getUserAgent,
        viewport: getViewPort,
      },
      queryString,
    };
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => {
        onboardingObj.environment.ip = data.ip;
        localStorage.setItem("onboardingObj", JSON.stringify(onboardingObj));
      });
  }
  createAccount = () => {
    const { dispatch } = this.props;
    if (localStorage.getItem("jobID")) localStorage.removeItem("jobID");
    dispatch(push("/signup"));
  };

  render() {
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };
    const ismobile = window.innerWidth <= 1150;
    const {
      user,
      onApply,
      authenticated,
      onSignIn,
      onStudioApply,
      onPlayVideo,
    } = this.props;

    const webVersion = (
      <main role="main" className={s.root} style={{ backgroundColor: "white" }}>
        <section className={s.full}>
          <div className={s.welcome}>
            <br />
            <br />
            <br />
            <br />
            {ismobile && (
              <div>
                {" "}
                <h1>Welcome to the digital entertainment community</h1>
                <p>
                  Gamesmith is home to over 12,000 members, titles and
                  companies.
                </p>
                <p>Stay connected and get discovered for your work!</p>{" "}
              </div>
            )}

            {ismobile &&
              (!authenticated ? (
                <div>
                  <Button
                    to="/client"
                    text="Studios, click here"
                    className={s.buttonAlt}
                  />{" "}
                  <br />
                  <img
                    style={{ marginTop: "30px" }}
                    src={watchvideo}
                    alt={"Watch Video"}
                    onClick={this.toggleVideo}
                  />
                  <br />
                  <h1>Already a member?</h1>
                  <Button
                    style={{ marginBottom: "400px" }}
                    onClick={onSignIn}
                    text={"Log In"}
                    className={s.button}
                  />{" "}
                  <br />
                </div>
              ) : (
                <div style={ismobile ? { display: "none" } : {}}>
                  <h1>Discovery platform{<br />} for the games industry</h1>
                  <p>It takes an army to create a game.</p>
                  <p>
                    Gamesmith covers everyone working in the industry from
                    {<br />} accounting to animation, PR to product, development
                    to deployment.
                  </p>
                  <p>Manage your professional image.</p>
                  <div className={s.buttonsFlex}>
                    {!authenticated && (
                      <Button
                        onClick={this.createAccount}
                        text="Create a free personal profile"
                        className={s.button}
                      />
                    )}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {!authenticated && (
                      <Button
                        to="/client"
                        text="Studios, click here"
                        className={s.button1}
                      />
                    )}
                    {<br />}
                    {<br />}
                  </div>
                  <a onClick={onPlayVideo}>
                    <p className={s.watchVideo}>
                      <img
                        className={s.playButton}
                        src={playButton}
                        alt="playButton"
                      />
                      &nbsp;&nbsp;Watch video
                    </p>
                  </a>
                  {/* <h1>Welcome to the digital entertainment community</h1>*/}
                  {/* <p>Gamesmith is home to over 12,000 members, titles and companies.</p>*/}
                  {/* <p>Stay connected and get discovered for your work!</p>*/}
                  {/* {!authenticated && <Button onClick={onApply} text="Get Started - It's free" className={s.button}/>}{<br/>}{<br/>}*/}
                </div>
              ))}
            <div
              style={ismobile ? { display: "none" } : {}}
              className={s.welcomeLeft}
            >
              <h1>Discovery platform{<br />} for the games industry</h1>
              <p>It takes an army to create a game.</p>
              <p>
                Gamesmith covers everyone working in the industry from{<br />}{" "}
                accounting to animation, PR to product, development to
                deployment.
              </p>
              <p>Manage your professional image.</p>
              <div className={s.buttonsFlex}>
                {!authenticated && (
                  <Button
                    onClick={this.createAccount}
                    text="Create a free personal profile"
                    className={s.button}
                  />
                )}
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {!authenticated && (
                  <Button
                    to="/client"
                    text="Studios, click here"
                    className={s.button1}
                  />
                )}
                {<br />}
                {<br />}
              </div>
              {/* <a onClick={onPlayVideo}><p className={s.watchVideo}><img className={s.playButton} src={playButton} alt="playButton"/>&nbsp;&nbsp;Watch video</p></a>*/}
              {/* <h1>Welcome to the digital entertainment community</h1>*/}
              {/* <p>Gamesmith is home to over 12,000 members, titles and companies.</p>*/}
              {/* <p>Stay connected and get discovered for your work!</p>*/}
              {/* {!authenticated && <Button onClick={onApply} text="Get Started - It's free" className={s.button}/>}{<br/>}{<br/>}*/}
            </div>
            <div
              className={s.welcomeRight}
              style={ismobile ? { display: "none" } : {}}
            >
              <YouTube videoId="YpfGtsQ-V9M" opts={opts} />
              {/* <img className={s.apex} src={p1} alt={'legend'}/>*/}
              {/* <p className={s.copyright}>Copyright: Electronic Arts(Apex Legend)</p>*/}
            </div>
          </div>
          <div className={s.findJob}>
            <div className={s.findJobLeft}>
              <h2>Find the right job {<br />}for you.</h2>
            </div>
            <div className={s.findJobRight} id="showMore">
              <p> JOB FAMILIES</p>
              <button onClick={() => this.setRedirection("/jobs?key=2")}>
                Audio
              </button>
              <button onClick={() => this.setRedirection("/jobs?key=18")}>
                Programming/Engineering
              </button>
              <button onClick={() => this.setRedirection("/jobs?key=23")}>
                Visual Arts
              </button>
              {<br />}
              <button onClick={() => this.setRedirection("/jobs?key=5")}>
                Community Management
              </button>
              <button onClick={() => this.setRedirection("/jobs?key=20")}>
                Quality Assurance
              </button>
              {<br />}
              <button onClick={() => this.setRedirection("/jobs?key=7")}>
                Design
              </button>
              <button onClick={() => this.setRedirection("/jobs?key=13")}>
                Marketing/Sales
              </button>{" "}
              {<br />}
              {this.state.isShowLess ? (
                <div>
                  <button onClick={() => this.setRedirection("/jobs?key=1")}>
                    Administration
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=3")}>
                    Business Development
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=4")}>
                    Business Management
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=6")}>
                    Customer Service
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=8")}>
                    Education
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=9")}>
                    Financial/Accounting
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=10")}>
                    Human Resources
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=11")}>
                    Information Technology
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=12")}>
                    Localization
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=15")}>
                    Office Management
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=16")}>
                    Production
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=17")}>
                    Product Management
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=19")}>
                    Public Relations
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=21")}>
                    Technical Support
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=22")}>
                    User/Market Research
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=24")}>
                    Writing/Editing
                  </button>
                </div>
              ) : (
                ""
              )}
              <p className={s.showMore} onClick={this.handleShowLess}>
                {this.state.isShowLess ? (
                  <span>
                    Show less <i className="fa fa-angle-up"></i>
                  </span>
                ) : (
                  <span>
                    Show more <i className="fa fa-angle-down"> </i>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className={s.postJob}>
            <div className={s.postJobLeft}>
              <h2>
                Post your job for thousands {<br />}of digital entertainment{" "}
                {<br />} professionals to see
              </h2>
            </div>
            <div className={s.postJobRight}>
              <Button to="/client" text="Post a job" className={s.button} />
            </div>
          </div>

          <div className={s.discover}>
            <div className={s.discoverLeft}>
              <div className={s.btn}>
                <h3>Who is Gamesmith for?</h3>
                <h3>Anyone working in digital entertainment</h3>
                <div className={s.btns}>
                  <div className={s.left}>
                    <Button
                      to="/professional"
                      text="I'm a professional"
                      className={s.buton}
                    />
                  </div>
                  <div className={s.right}>
                    <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png" />
                  </div>
                </div>
                <div className={s.btns}>
                  <div className={s.left}>
                    <Button
                      to="/client"
                      text="I'm a Studio"
                      className={s.buton}
                    />
                  </div>
                  <div className={s.right}>
                    <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png" />
                  </div>
                </div>
                <div className={s.btns}>
                  <div className={s.left}>
                    <Button
                      to="/jobs"
                      text="Find your next job"
                      className={s.buton}
                    />
                  </div>
                  <div className={s.right}>
                    <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className={s.discoverRight}>
              <img className={s.img} src={p} alt={"studio"} />
            </div>
          </div>

          {/* <div className={s.videoBox}>*/}
          {/*  <div className={s.videoBoxLeft}>*/}
          {/*    <YoutubeVideo url={'https://www.youtube.com/watch?v=wSwK7HUOv0I'} width={window.innerWidth < 769 ? '100%' : '200%'} controls/>*/}
          {/*  </div>*/}
          {/*  <div className={s.videoBoxRight}>*/}
          {/*    <h1>#powertothemaker</h1><h3>Take control of your digital entertainment {<br/>}career</h3>*/}
          {/*  </div>*/}
          {/* </div>*/}
          {/* <div className={s.joinCommunityBox}>*/}
          {/*  <div className={s.JoinCommunityLeft}>*/}
          {/*    <h1>Join the top vetted{<br/>} digital entertainment{<br/>} professional community</h1>{<br/>}*/}
          {/*    {!authenticated && <Button onClick={onApply} text="Get Started - It's free" className={s.button}/>}*/}
          {/*  </div>*/}
          {/* </div>*/}

          <div className={s.subscriptionBox}>
            <div className={s.subscriptionFormcontainer}>
              {/* <SubscriptionForm
                page="home"
                onSubmit={this.onSubmitSubscribeRequest}
              /> */}
            </div>
          </div>
        </section>
      </main>
    );

    const mobileVersion = (
      <main role="main" className={s.root} style={{ backgroundColor: "white" }}>
        <section className={s.full}>
          <div className={s.welcome}>
            <div className={s.welcomeLeft}>
              {!ismobile ? (
                <div>
                  {" "}
                  <h1>Welcome to the digital entertainment community</h1>
                  <p>
                    Gamesmith is home to over 12,000 members, titles and
                    companies.
                  </p>
                  <p>Stay connected and get discovered for your work!</p>{" "}
                </div>
              ) : (
                <div>
                  {" "}
                  <h1>
                    Discovery platform for the professional games industry
                  </h1>
                  <p>
                    Gamesmith is home to over 12,000 members, titles and
                    companies.
                  </p>
                  <p>Manage your professional image.</p>{" "}
                </div>
              )}

              {!authenticated && (
                <Button
                  onClick={this.createAccount}
                  text={
                    !ismobile
                      ? "Get Started - It's free"
                      : "Create personal profile"
                  }
                  className={s.button}
                />
              )}
              {<br />}
              {<br />}
              {ismobile &&
                (!authenticated ? (
                  <div>
                    <Button
                      to="/client"
                      text="Studios, click here"
                      className={s.buttonAlt}
                    />{" "}
                    <br />
                    <img
                      style={{ marginTop: "30px" }}
                      src={watchvideo}
                      alt={"Watch Video"}
                      onClick={this.toggleVideo}
                    />
                    <br />
                    <h1>Already a member?</h1>
                    <Button
                      style={{ marginBottom: "400px" }}
                      onClick={onSignIn}
                      text={"Log In"}
                      className={s.button}
                    />{" "}
                    <br />
                  </div>
                ) : (
                  <div>
                    <Link to="/makers">
                      <Button text={"Browse Makers"} className={s.button} />
                    </Link>{" "}
                    <br />
                  </div>
                ))}
            </div>
          </div>

          {!ismobile && (
            <div>
              <div className={s.findJob}>
                <div className={s.findJobLeft}>
                  <h2>Find the right job {<br />}for you.</h2>
                </div>
                <div className={s.findJobRight} id="showMore">
                  <p> JOB FAMILIES</p>
                  <button onClick={() => this.setRedirection("/jobs?key=2")}>
                    Audio
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=18")}>
                    Programming/Engineering
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=23")}>
                    Visual Arts
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=5")}>
                    Community Management
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=20")}>
                    Quality Assurance
                  </button>
                  {<br />}
                  <button onClick={() => this.setRedirection("/jobs?key=7")}>
                    Design
                  </button>
                  <button onClick={() => this.setRedirection("/jobs?key=13")}>
                    Marketing/Sales
                  </button>{" "}
                  {<br />}
                  {this.state.isShowLess ? (
                    <div>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=1")}
                      >
                        Administration
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=3")}
                      >
                        Business Development
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=4")}
                      >
                        Business Management
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=6")}
                      >
                        Customer Service
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=8")}
                      >
                        Education
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=9")}
                      >
                        Financial/Accounting
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=10")}
                      >
                        Human Resources
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=11")}
                      >
                        Information Technology
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=12")}
                      >
                        Localization
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=15")}
                      >
                        Office Management
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=16")}
                      >
                        Production
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=17")}
                      >
                        Product Management
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=19")}
                      >
                        Public Relations
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=21")}
                      >
                        Technical Support
                      </button>
                      {<br />}
                      <button
                        onClick={() => this.setRedirection("/jobs?key=22")}
                      >
                        User/Market Research
                      </button>
                      <button
                        onClick={() => this.setRedirection("/jobs?key=24")}
                      >
                        Writing/Editing
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className={s.showMore} onClick={this.handleShowLess}>
                    {this.state.isShowLess ? (
                      <span>
                        Show less <i className="fa fa-angle-up"></i>
                      </span>
                    ) : (
                      <span>
                        Show more <i className="fa fa-angle-down"> </i>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className={s.postJob}>
                <div className={s.postJobLeft}>
                  <h2>
                    Post your job for thousands {<br />}of digital entertainment{" "}
                    {<br />} professionals to see
                  </h2>
                </div>
                <div className={s.postJobRight}>
                  <Button
                    onClick={onStudioApply}
                    text="Post a job"
                    className={s.button}
                  />
                </div>
              </div>

              <div className={s.discover}>
                <div className={s.discoverLeft}>
                  <div className={s.btn}>
                    <h3>Who is Gamesmith for?</h3>
                    <h3>Anyone working in digital entertainment</h3>
                    <div className={s.btns}>
                      <div className={s.left}>
                        <Button
                          to="/professional"
                          text="I'm a professional"
                          className={s.buton}
                        />
                      </div>
                      <div className={s.right}>
                        <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png" />
                      </div>
                    </div>
                    <div className={s.btns}>
                      <div className={s.left}>
                        <Button
                          to="/client"
                          text="I'm a Studio"
                          className={s.buton}
                        />
                      </div>
                      <div className={s.right}>
                      <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
                      </div>
                    </div>
                    <div className={s.btns}>
                      <div className={s.left}>
                        <Button
                          to="/jobs"
                          text="Find your next job"
                          className={s.buton}
                        />
                      </div>
                      <div className={s.right}>
                      <img src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-forward-512.png' />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={s.discoverRight}>
                  <img className={s.img} src={p} alt={"studio"} />
                </div>
              </div>
            </div>
          )}
          <div
            style={
              ismobile && this.state.showVideo == false
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <div className={s.videoBox}>
              <div className={s.videoBoxLeft}>
                <YoutubeVideo
                  url={"https://www.youtube.com/watch?v=YpfGtsQ-V9M"}
                  width={window.innerWidth < 769 ? "100%" : "200%"}
                  controls
                />
              </div>
              <div className={s.videoBoxRight}>
                <h1>#powertothemaker</h1>
                <h3>
                  Take control of your digital entertainment {<br />}career
                </h3>
              </div>
            </div>
            {!ismobile && (
              <div className={s.joinCommunityBox}>
                <div className={s.JoinCommunityLeft}>
                  <h1>
                    Join the top vetted{<br />} digital entertainment{<br />}{" "}
                    professional community
                  </h1>
                  {<br />}
                  {!authenticated && (
                    <Button
                      onClick={onApply}
                      text="Get Started - It's free"
                      className={s.button}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          {!ismobile && (
            <div className={s.subscriptionBox}>
              <div className={s.subscriptionFormcontainer}>
                {
                  <SubscriptionForm
                    page="home"
                    onSubmit={this.onSubmitSubscribeRequest}
                  />
                }
              </div>
            </div>
          )}
        </section>
      </main>
    );

    if (ismobile) {
      return mobileVersion;
    }
    return webVersion;
  }
}
Home.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  onApply: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  onStudioApply: PropTypes.func.isRequired,
  onPlayVideo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onSignIn: PropTypes.func.isRequired,
};
Home.contextType = {
  router: PropTypes.object.isRequired,
};
export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
    user: selectUser(),
  }),
  (dispatch) => ({
    dispatch,
    onSignIn: () => dispatch(openSignIn()),
    onApply: () => dispatch(openSignUp()),
    onStudioApply: () => dispatch(openAddStudio()),
    onPlayVideo: () => dispatch(openPlayVideo()),
  })
)(Home);
