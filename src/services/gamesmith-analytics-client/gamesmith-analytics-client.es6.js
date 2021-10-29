import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";

const CLIENT_ES6_LIB_VERSION = "0.0.1";
/**
 * Class provides simple analytics library for tracking page viewing time on Gamesmith
 * platform when page is visible and utilizes `visibilitychange` event listener.
 * When page is unloaded sends POST request using `navigator.sendBeacon()` to API for logging.
 *
 * https://github.com/gamesmithinc/Gamesmith-JS-Analytics-Client-Lib/tree/es6-module
 *
 * [Note]
 *
 * This is the es6 module version of (gamesmith-analytics-client.js).
 * This es6 version has the filname (gamesmith-analytics-client.es6.js).
 * The es6.js version is designed to have the exported class GamesmithAnalyticsClient
 * imported and instantiated. This es6 version exposes two methods.
 *
 *    _sendAnalyticEvent() - Use this to trigger the send analytic track event.
 *    _resetTracker() - Use this to reset the tracker when making page changes.
 */
export class GamesmithAnalyticsClient {
  /**
   * @typedef  {object} Config
   * @property {string} apiEndpoint - (Required) The POST endpoint API url to send analytic event
   * @property {boolean} [isDebugEnabled] - (Optional) Output to browser console tracker values
   *
   * @callback TrackerReady
   * @param {string} isRunningInfo - Indicates if the library was installed successfully
   */

  /**
   * @param {Config} config
   * @param {TrackerReady} [callback] - (Optional) Callback fires when tracker has installed
   */
  constructor(config, callback = null) {
    if (typeof window === "undefined") {
      this._error({
        type: "target",
      });
    }
    if (!config.apiEndpoint) {
      this._error({
        type: "required",
        property: "apiEndpoint",
      });
    }
    this._libName = "gamesmith-analytics-client-es6";
    this._libVersion = this._locateLibVersion;
    this._apiEndpoint = config.apiEndpoint;
    this._isDebugEnabled = config.isDebugEnabled || false;
    this._libReadyCallback = callback;
    this._isTrackingPaused = false;
    this._PathName = window.location.pathname;
    this._URL = window.location.href;
    this._Referrer = this._evaluateReferrer;
    this._UserID = this._evaluateUserID;
    this._PageType = this._evaluatePageType;
    this._PageId = this._evaluatePageId;
    this._StudioOwner = this._evaluateStudioOwner;
    this._StudioNameViewing = this._evaluateStudioNameViewing;
    this._ElapsedTime = 0;
    this._installAnalyticsTracker();
  }

  _installAnalyticsTracker() {
    // If starting tracker on a page that was already loaded
    if (
      document.readyState === "complete" ||
      // @ts-ignore
      document.readyState === "loaded" ||
      document.readyState === "interactive"
    ) {
      this._startTracker();
    }
    // If starting tracker via DOMContentLoaded event
    else {
      window.addEventListener("DOMContentLoaded", () => {
        this._startTracker();
      });
    }

    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this._isTrackingPaused = false;
      } else this._isTrackingPaused = true;
    });
    window.addEventListener("unload", () => {
      this._sendAnalyticEvent();
    });
  }

  _startTracker() {
    if (typeof this._libReadyCallback === "function") {
      this._libReadyCallback(`${this._libName} v${this._libVersion} running`);
    }
    setInterval(() => {
      if (!this._isTrackingPaused) this._ElapsedTime++;
      if (this._isDebugEnabled) this._debugInfo();
    }, 1000);
  }

  _resetTracker() {
    this._PathName = window.location.pathname;
    this._URL = window.location.href;
    this._Referrer = this._evaluateReferrer;
    this._UserID = this._evaluateUserID;
    this._PageType = this._evaluatePageType;
    this._PageId = this._evaluatePageId;
    this._StudioOwner = this._evaluateStudioOwner;
    this._StudioNameViewing = this._evaluateStudioNameViewing;
    this._ElapsedTime = 0;
  }

  _sendAnalyticEvent() {
    if (this._PageType !== "NULL") {
      const payload = {
        UserID: this._UserID,
        URL: this._URL,
        Referrer: this._Referrer,
        PageType: this._PageType,
        PageId: this._PageId,
        StudioOwner: this._StudioOwner,
        StudioNameViewing: this._StudioNameViewing,
        ElapsedTime: this._ElapsedTime,
      };
      navigator.sendBeacon(this._apiEndpoint, JSON.stringify(payload));
      if (this._isDebugEnabled) console.warn("Sent event", payload);
    }
  }

  get _locateLibVersion() {
    return CLIENT_ES6_LIB_VERSION;
  }

  get _generateAnonCookieUuid() {
    const ViewerGUIDCookie = Cookies.get("ViewerGUID");
    if (ViewerGUIDCookie) {
      return ViewerGUIDCookie;
    } else {
      const anonUuid = `anon_${uuid()}`;
      Cookies.set("ViewerGUID", anonUuid);
      return anonUuid;
    }
  }

  get _evaluateReferrer() {
    return document.referrer === ""
      ? window.location.origin
      : document.referrer;
  }

  get _evaluateUserID() {
    return (
      (window.gamesmith && window.gamesmith.UserID) ||
      this._generateAnonCookieUuid
    );
  }
  get _evaluatePageType() {
    // Calculate based on path (/game/ /maker/ /job/ /studio/) always the first part of the path
    const type = window.location.pathname.split("/")[1];
    if (
      window.location.hostname.includes("gamesmith.com") ||
      window.location.hostname === "localhost"
    ) {
      if (
        type &&
        (type === "game" ||
          type === "maker" ||
          type === "job" ||
          type === "studio")
      ) {
        return type;
      }
      return "NULL";
    }
    return "NULL";
    /*
    throw this._error({
      type: 'unknown_page_type',
    })
    */
  }

  get _evaluatePageId() {
    // For /maker/ pages, this is the ID of the maker. Example /maker/192655 the id is 192655.
    // For /job/ pages, this is the ID of the job. Example /job/1598 the id is 1598.
    // For /game/ pages, this is the ID of the game. Example /game/6 the id is 6.
    // For other pages, should be null
    if (
      this._PageType === "maker" ||
      this._PageType === "job" ||
      this._PageType === "game"
    ) {
      const id = window.location.pathname.split("/")[2];
      return id.toString();
    }
    return "NULL";
  }

  get _evaluateStudioOwner() {
    // for /studio/ and /job/ pages, this is the owning studio.
    // For example /studio/king the value is 'king'. For example /job/1598 the value is 'stardock'
    if (this._PageType === "studio") {
      const id = window.location.pathname.split("/")[2];
      return id.toString();
    } else if (this._PageType === "job") {
      let id = null;
      this._lookupJobCardStudioOwner((slug) => {
        id = slug;
      });
      return id || "NULL";
    }
    return "NULL";
  }

  _lookupJobCardStudioOwner(cb) {
    if (this._PageType === "job") {
      const jobId = window.location.pathname.split("/")[2];
      fetch(
        `https://${
          window.location.hostname === "gamesmith.com" ||
          window.location.hostname === "www.gamesmith.com"
            ? "backend"
            : "staging-backend"
        }.gamesmith.com/api/jobcard/${jobId}`
      )
        .then((response) => response.json())
        .then((JobCard) => {
          this._StudioOwner = JobCard.company.slug;
          cb(JobCard.company.slug);
        });
    }
  }

  get _evaluateStudioNameViewing() {
    if (
      window.gamesmith &&
      window.gamesmith.studioId !== -1 &&
      window.gamesmith.studioSlug
    ) {
      return window.gamesmith.studioSlug;
    }
    return "NULL";
  }

  _debugInfo() {
    console.log("\n");
    console.warn("DEBUG MODE");
    console.log("• lib name:", this._libName);
    console.log("• lib ver:", this._libVersion);
    console.log("• tracker paused:", this._isTrackingPaused);
    console.log("• UserID:", this._UserID);
    console.log("• URL:", this._URL);
    console.log("• Referrer:", this._Referrer);
    console.log("• PageType:", this._PageType);
    console.log("• PageId:", this._PageId);
    console.log("• StudioOwner:", this._StudioOwner);
    console.log("• StudioNameViewing:", this._StudioNameViewing);
    console.log("• ElapsedTime:", this._ElapsedTime);
  }

  _error(errorEvent) {
    let errorMessage = "";
    switch (errorEvent.type) {
      case "target":
        errorMessage =
          "This library requires browser target. Cannot find 'window' object.";
        break;
      case "required":
        errorMessage = `The config object argument requires property '${errorEvent.property}'.`;
        break;
      case "unknown_page_type":
        errorMessage =
          "Failed to start analytics. No compatible page type (game/maker/job/studio) found.";
    }
    throw new Error(errorMessage);
  }
}
