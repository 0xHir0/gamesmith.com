/*
 * Analytics container
 */

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { getUserData } from "../../utils";
import s from "./styles.module.scss";
import BarChart from "./components/BarChart";
import DateFilter from "./components/DateFilter";

import anonUserPlaceholderImage from "../../data/images/anon-user.jpg";

import { GamesmithAnalyticsAPIWrapper } from "../../utils/analyticsAPI/GamesmithAnalyticsAPIWrapper";
const AnalyticsAPI = new GamesmithAnalyticsAPIWrapper();

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.User = getUserData();
    this.DefaultFilterStartDate = this.generateFilterStartDate(30);
    this.updateAllStats = this.updateAllStats.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.updateStudio = this.updateStudio.bind(this);
    this.updateJobPostings = this.updateJobPostings.bind(this);
    // Note: Make sure to keep label: "My Studio" for the logged in studio owner chart stat
    // This will make the chart bar show yellow color for this studio.
    this.hardcodedStudiosForChart = [
      { label: "King", slug: "king" },
      { label: "Santa Monica", slug: "santa-monica" },
      { label: "My Studio", slug: this.props.studioSlug }, // <--- Logged in Studio Owner
      { label: "WB Games", slug: "wb-games" },
      { label: "PlayStation", slug: "playstation" },
      { label: "Id Software", slug: "id-software" },
    ];
  }

  state = {
    analyticData: {
      specificStudioAnalytics: null,
      jobPostingsForSpecificStudioAnalytics: null,
    },
    chartData: [],
  };

  componentDidMount() {
    // Call each of the stat methods on component mount
    this.getStudioChartAnalytics(this.DefaultFilterStartDate);
    this.getStudioAnalytics(this.DefaultFilterStartDate);
    this.getJobPostingsForStudio(this.DefaultFilterStartDate);
  }

  generateFilterStartDate(totalDays) {
    return moment().subtract(totalDays, "days").format("YYYY-MM-DD");
  }

  async getStudioChartAnalytics(dateFilter) {
    const getStudioChartAnalytics =
      await AnalyticsAPI.getSpecificStudioMultipleAnalytics(
        this.hardcodedStudiosForChart,
        dateFilter
      );
    this.setState({ chartData: getStudioChartAnalytics });
  }

  async getStudioAnalytics(dateFilter) {
    const getSpecificStudioAnalytics =
      await AnalyticsAPI.getSpecificStudioAnalytics(
        this.props.studioSlug,
        dateFilter
      );
    this.processMakerAvatarUrls(
      "specificStudioAnalytics",
      getSpecificStudioAnalytics.data
    );
  }

  async getJobPostingsForStudio(dateFilter) {
    const getJobPostingsForSpecificStudioAnalytics =
      await AnalyticsAPI.getJobPostingsForSpecificStudioAnalytics(
        this.props.studioSlug,
        dateFilter
      );
    this.processMakerAvatarUrls(
      "jobPostingsForSpecificStudioAnalytics",
      getJobPostingsForSpecificStudioAnalytics.data
    );
  }

  processMakerAvatarUrls(analyticName, data) {
    const responseData = data;
    responseData.viewedByMakers = responseData.viewedByMakers.map((id) => {
      const makerID = id.toString();
      if (makerID.includes("anon_")) {
        return {
          makerID,
          avatarURL: anonUserPlaceholderImage,
        };
      } else {
        return {
          makerID,
          avatarURL: `https://gamesmith-profile-pic.s3.amazonaws.com/${makerID}`,
        };
      }
    });
    const analyticStateObj = { analyticData: { ...this.state.analyticData } };
    analyticStateObj.analyticData[analyticName] = responseData;
    this.setState(analyticStateObj);
  }

  formatMinutes(seconds) {
    return `${(seconds / 60).toFixed(2)} mins`;
  }

  generateAvatarList(analyticName) {
    if (
      this.state.analyticData &&
      this.state.analyticData[analyticName] &&
      this.state.analyticData[analyticName].viewedByMakers
    ) {
      const avatars = [];
      for (let x = 0; x <= 10; x += 1) {
        const m = this.state.analyticData[analyticName].viewedByMakers[x];
        if (!m) {
          break;
        } else {
          let innerChild = null;
          if (x === 10) {
            const remainingAvatarsCount = (() => {
              const val =
                this.state.analyticData[analyticName].viewedByMakers.length -
                10;
              return val >= 50 ? 50 : val;
            })();
            innerChild = (
              <div className={s.avatarusercountcontainer}>
                <div className={s.count}>
                  <span>+{remainingAvatarsCount}</span>
                </div>
              </div>
            );
          } else {
            const avatarImgTag = <img alt="avatar" src={m.avatarURL} />;
            if (m.makerID.includes("anon_")) {
              // Only show the default avatar placeholder image with no profile link
              innerChild = avatarImgTag;
            } else {
              // Wrap the makers avatar with link to maker profile
              innerChild = (
                <a target="_blank" href={`/maker/${m.makerID}`}>
                  {avatarImgTag}
                </a>
              );
            }
          }
          avatars.push(
            <div key={x} className={s.avataruser}>
              {innerChild}
            </div>
          );
        }
      }
      return avatars;
    }
  }

  updateAllStats(e) {
    // This is a universal method that will call all of the
    // studio stats. Later we could have separate dropdowns to control
    // the date time filters for specific stats.
    this.updateChart(e);
    this.updateStudio(e);
    this.updateJobPostings(e);
  }

  updateChart(e) {
    this.getStudioChartAnalytics(this.generateFilterStartDate(e.target.value));
  }

  updateStudio(e) {
    this.getStudioAnalytics(this.generateFilterStartDate(e.target.value));
  }

  updateJobPostings(e) {
    this.getJobPostingsForStudio(this.generateFilterStartDate(e.target.value));
  }

  render() {
    return (
      <main role="main" className={s.root}>
        <div className={s.headingPageTextContainer}>
          <h2 className={s.headingPageText}>Stats And Analytics</h2>
          <h5 className={s.subheadingPageText}>
            Welcome to your stats and analytics dashboard! Here you'll see all
            your studio page stats like:<br></br>visits, average time spent,
            views and much more!
          </h5>
        </div>
        <div className={s.analyticsBoxContainer}>
          <div className={s.leftSide}>
            <div className={s.chart}>
              <div className={s.headerContainer}>
                <h3>Performance</h3>
                <DateFilter filterAction={this.updateAllStats}></DateFilter>
              </div>
              <div className={s.chartContainer}>
                {/* <!-- CHART - Studio Page Visits --> */}
                <BarChart
                  datasets={{
                    labels: this.hardcodedStudiosForChart.map(
                      (studio) => studio.label
                    ),
                    datasets: [
                      {
                        label: "Studio Page Visits",
                        data: this.state.chartData.map((StudioStat) =>
                          StudioStat.totalViews.time.toFixed(2)
                        ),
                        barThickness: 32,
                        backgroundColor: this.hardcodedStudiosForChart.map(
                          (studio) => {
                            if (studio.label === "My Studio") {
                              return "#B3A81D";
                            } else {
                              return "rgba(195,195,195,1)";
                            }
                          }
                        ),
                      },
                    ],
                  }}
                ></BarChart>
              </div>
            </div>
          </div>
          <div className={s.rightSide}>
            <div className={s.stat}>
              <div className={s.headerContainer}>
                <h3>Studio</h3>
                {/* <DateFilter filterAction={this.updateAllStats}></DateFilter> */}
              </div>
              <h5>
                Page Visits:{" "}
                <span className={s.statValue}>
                  {this.state.analyticData.specificStudioAnalytics &&
                    this.state.analyticData.specificStudioAnalytics.totalViews
                      .count}
                </span>
              </h5>
              <h5>
                Time users spent on your page:{" "}
                <span className={s.statValue}>
                  {this.state.analyticData.specificStudioAnalytics &&
                    this.formatMinutes(
                      this.state.analyticData.specificStudioAnalytics.totalViews
                        .time
                    )}
                </span>
              </h5>
            </div>
            <div className={s.stat}>
              <div className={s.headerContainer}>
                <h3>Job Postings</h3>
                {/* <DateFilter filterAction={this.updateAllStats}></DateFilter> */}
              </div>
              <h5>
                Page Visits:{" "}
                <span className={s.statValue}>
                  {this.state.analyticData
                    .jobPostingsForSpecificStudioAnalytics &&
                    this.state.analyticData
                      .jobPostingsForSpecificStudioAnalytics.totalViews.count}
                </span>
              </h5>
              <h5>
                Time users spent on your page:{" "}
                <span className={s.statValue}>
                  {this.state.analyticData
                    .jobPostingsForSpecificStudioAnalytics &&
                    this.formatMinutes(
                      this.state.analyticData
                        .jobPostingsForSpecificStudioAnalytics.totalViews.count
                    )}
                </span>
              </h5>
            </div>
          </div>
          {/* <!-- Who viewed my page --> */}
          <div className={s.bottomRow}>
            <div
              className={`${s.top} ${s.rootbackgroundcolor} ${s.borderRounded} ${s.container} `}
            >
              <div>
                <h3>Who viewed my page</h3>
                <br />
                <div className={s.avatarusercontainer}>
                  {this.generateAvatarList("specificStudioAnalytics")}
                  {!this.state.analyticData.specificStudioAnalytics && (
                    <h3>Loading...</h3>
                  )}
                </div>
              </div>
            </div>
            {/* <!-- Who viewed my job postings --> */}
            <div
              className={`${s.top} ${s.rootbackgroundcolor} ${s.borderRounded} ${s.container}`}
            >
              <div>
                <h3>Who viewed my job postings</h3>
                <br />
                <div className={s.avatarusercontainer}>
                  {this.generateAvatarList(
                    "jobPostingsForSpecificStudioAnalytics"
                  )}
                  {!this.state.analyticData
                    .jobPostingsForSpecificStudioAnalytics && (
                    <h3>Loading...</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Analytics.propTypes = {
  studioSlug: PropTypes.string,
};

export default Analytics;
