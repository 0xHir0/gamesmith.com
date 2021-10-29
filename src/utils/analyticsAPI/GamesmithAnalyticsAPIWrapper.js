/**
 *
 * Gamesmith Analytics API Wrapper Library
 *
 * @copyright ©2020 Gamesmith Inc
 * @description This class library is for usage with the backend analytics API
 * service found here: https://github.com/gamesmithinc/Gamesmith-JS-Analytics-Backend
 *
 */
import axios from "axios";

export class GamesmithAnalyticsAPIWrapper {
  constructor() {
    this.httpRequest = axios.create({
      baseURL:
        process.env.NODE_ENV === "development"
          ? "https://uyt8hstyue.execute-api.us-west-2.amazonaws.com/latest/analytic" // Prod
          : "https://uyt8hstyue.execute-api.us-west-2.amazonaws.com/latest/analytic" // Prod
    });
  }

  /**
   *
   * Get analytics on specific maker
   *
   * @param {number} MakerID (Required) (e.g: 217630)
   * @param {string} StartDate (Required) (e.g: '2020-02-01')
   * @returns {Promise<axios>} Axios promise is returned containing response
   */
  getSpecificMakerAnalytics(MakerID, StartDate) {
    return this.httpRequest.get("/getStats", {
      params: {
        PageType: "maker",
        PageId: MakerID,
        StartDate
      }
    });
  }

  /**
   *
   * Get analytics on specific job.
   *
   * @param {number} JobID (Required) (e.g: 1690)
   * @param {string} StartDate (Required) (e.g: '2020-02-01')
   * @returns {Promise<axios>} Axios promise is returned containing response
   */
  getSpecificJobAnalytics(JobID, StartDate) {
    return this.httpRequest.get("/getStats", {
      params: {
        PageType: "job",
        PageId: JobID,
        StartDate
      }
    });
  }

  /**
   *
   * Get analytics on specific studio
   *
   * @param {string} StudioOwner (Required) (e.g: 'gamesmith-talent')
   * @param {string} StartDate (Required) (e.g: '2020-02-01')
   * @returns {Promise<axios>} Axios promise is returned containing response
   */
  getSpecificStudioAnalytics(StudioOwner, StartDate) {
    return this.httpRequest.get("/getStats", {
      params: {
        PageType: "studio",
        StudioOwner,
        StartDate
      }
    });
  }

  /**
   *
   * Get analytics on multiple specific studios + logged in studio
   *
   * @param {Array} StudioOwners (Required) (e.g: [{label: 'Gamesmith Talent': slug: 'gamesmith-talent'}])
   * @param {string} StartDate (Required) (e.g: '2020-02-01')
   * @returns {Promise<axios>} Axios promise is returned containing response
   */
  async getSpecificStudioMultipleAnalytics(StudioOwners, StartDate) {
    const StudioOwnersStatsHolder = [];
    for (let i = 0; i < StudioOwners.length; i++) {
      const StudioOwner = StudioOwners[i].slug;
      const StudioOwnerStats = await this.httpRequest.get("/getStats", {
        params: {
          PageType: "studio",
          StudioOwner,
          StartDate
        }
      });
      if (StudioOwnerStats && StudioOwnerStats.data) {
        StudioOwnerStats.data.studioOwnerSlug = StudioOwner;
        StudioOwnerStats.data.studioOwnerLabel = StudioOwners[i].label;
        if (
          StudioOwnerStats.data.totalViews &&
          StudioOwnerStats.data.totalViews.time
        ) {
          // Convert the response from seconds to minutes
          StudioOwnerStats.data.totalViews.time =
            StudioOwnerStats.data.totalViews.time / 60;
        }
        StudioOwnersStatsHolder.push(StudioOwnerStats.data);
      }
    }
    return StudioOwnersStatsHolder;
  }

  /**
   *
   * Get analytics on job postings belonging to specific studio
   *
   * @param {string} StudioOwner (Required) (e.g: 'gamesmith-talent')
   * @param {string} StartDate (Required) (e.g: '2020-02-01')
   * @returns {Promise<axios>} Axios promise is returned containing response
   */
  getJobPostingsForSpecificStudioAnalytics(StudioOwner, StartDate) {
    return this.httpRequest.get("/getStats", {
      params: {
        PageType: "studioJobs",
        StudioOwner,
        StartDate
      }
    });
  }
}
