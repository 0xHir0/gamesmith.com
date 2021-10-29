import request from "axios";
import axios from "axios";
//import { merge } from "lodash";
import employeeCount from "../data/employeeCountV2";

/*const win = window || { location: { hostname: "" } }; */
export const ENV = process.env.NODE_ENV || "development";
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;

var jQuery = require("jquery")(window);

// Prod config
//export const BACKEND_RAIL_URL = "https://api-prod.gamesmith.com/reshufl_search";
//export const BACKEND_RAIL = "https://api-prod.gamesmith.com";
//export const BACKEND_URL = "https://backend.gamesmith.com";
//export const FRONTEND_URI = "https%3A%2F%2Fwww.gamesmith.com";
//export const STRIPE_PUBLIC_API_KEY = "pk_live_tE9sem5bTr1juX49PAzEm9h2"; // TEST pk_test_KziHMeHx3hQi0Yrg6hSPgtQ1  pk_live_tE9sem5bTr1juX49PAzEm9h2

// staging config
export const BACKEND_RAIL_URL = "https://api-stage.gamesmith.com/reshufl_search";
export const BACKEND_RAIL = "https://api-stage.gamesmith.com";
export const BACKEND_URL = "https://staging-backend.gamesmith.com";
export const FRONTEND_URI = "https%3A%2F%2Fdevstagingui.gamesmith.com";
export const STRIPE_PUBLIC_API_KEY = "pk_test_KziHMeHx3hQi0Yrg6hSPgtQ1"; // TEST pk_test_KziHMeHx3hQi0Yrg6hSPgtQ1  pk_live_tE9sem5bTr1juX49PAzEm9h2

export const FORUM_URL = "http://forum.gamesmith.com";
export const BASE_FORUM_URL = "http://forum.gamesmith.com";
export const STRIPE_URL = "https://js.stripe.com/v3/";

const TOKEN = "authToken";
const USER = "userData";
const URL = "redirectTo";

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * @method String HTTP method, e.g. post, get, put, delete
 * @data Object Data you wish to pass to the server
 * @api String endpoint
 * @return Promise
 */

export function makeRequest(method, data, api, headers = {}) {
  return request({
    url: `${BACKEND_URL}/api/${api}`,
    method,
    data,
    headers,
  });
}

export function makeRailsRequest(method, data, api, headers = {}) {
  return request({
    url: `${BACKEND_RAIL_URL}/${api}`,
    method,
    data,
    headers,
  });
}

export function makeRailApiRequest(method, data, api, headers = {}) {
  return request({
    url: `${BACKEND_RAIL}/${api}`,
    method,
    data,
    headers,
  });
}

// user info handlers
export function getUserData() {
  return JSON.parse(localStorage.getItem(USER));
}
export function setUserData(userData) {
  localStorage.setItem(USER, JSON.stringify(userData));
}

export function removeUserData() {
  localStorage.removeItem(USER);
}

// view profile url handler
export function getReturnUrl() {
  return JSON.parse(localStorage.getItem(URL));
}

export function setReturnUrl(returnUrl) {
  localStorage.setItem(URL, JSON.stringify(returnUrl));
}

export function removeReturnUrl() {
  localStorage.removeItem(URL);
}

// auth token handlers
export function getAuthToken() {
  return JSON.parse(localStorage.getItem(TOKEN));
}
export function setAuthToken(token) {
  localStorage.setItem(TOKEN, JSON.stringify(token));
}
export function checkAuthToken() {
  const token = getAuthToken();
  if (token && !token.hasOwnProperty("expiresOn")) return false;
  return token
    ? new Date(token.expiresOn).toISOString() > new Date().toISOString()
    : false;
}
export function removeAuthToken() {
  localStorage.removeItem(TOKEN);
  const req = makeRequest("GET", {}, "forumLogout", {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Auth-Token": getAuthToken(),
  });
}

export function checkUrlAvailabilty(url) {
  return true;
  // var xhttp = new XMLHttpRequest();
  //
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4) {
  //     if(this.status == 200){
  //       return true
  //     }else{
  //       return false
  //     }
  //   }
  // };
  //
  // xhttp.open("GET", url, false);
  // xhttp.send();

  // xhttp.open("GET", "http://forum.gamesmith.com:3000", false);
  // xhttp.setRequestHeader('HOST','http://www.gamesmith.com');
}

export function geoLocationCountry(
  method,
  url,
  value,
  data = {},
  type = "json"
) {
  const successRes = function (data) {
    const countryClasses = jQuery("#countryId").attr("class");

    const cC = countryClasses.split(" ");
    cC.shift();
    let addClasses = "";
    if (cC.length > 0) {
      acC = cC.join();
      addClasses = `&addClasses=${encodeURIComponent(acC)}`;
    }

    let presel = false;
    const iip = "N";
    jQuery.each(cC, (index, value) => {
      if (value.match("^presel-")) {
        presel = value.substring(7);
      }
      if (value.match("^presel-byi")) {
        const iip = "Y";
      }
    });
    if (data.tp == 1) {
      if (data.hits > 500) {
        // alert('Free usage far exceeded. Please subscribe at geodata.solutions.');
        console.log(`Daily geodata.solutions hit count:${data.hits}`);
      } else {
        console.log(`Daily geodata.solutions hit count:${data.hits}`);
      }
      if (presel == "byip") {
        presel = data.presel;
        console.log(`2 presel is set as ${presel}`);
      }

      if (jQuery.inArray("group-continents", cC) > -1) {
        const $select = jQuery(".countries");
        console.log(data.result);
        jQuery.each(data.result, (i, optgroups) => {
          const $optgroup = jQuery("<optgroup>", { label: i });
          if (optgroups.length > 0) {
            $optgroup.appendTo($select);
          }

          jQuery.each(optgroups, (groupName, options) => {
            const coption = jQuery("<option />");
            coption.attr("value", options.name).text(options.name);
            coption.attr("countryid", options.id);
            if (presel) {
              if (presel.toUpperCase() == options.id) {
                coption.attr("selected", "selected");
              }
            }
            coption.appendTo($optgroup);
          });
        });
      } else {
        jQuery.each(data.result, (key, val) => {
          const option = jQuery("<option />");
          option.attr("value", val).text(val);
          option.attr("countryid", key);
          if (presel) {
            if (presel.toUpperCase() == key) {
              option.attr("selected", "selected");
            }
          }
          jQuery(".countries").append(option);
        });
      }
      if (presel) {
        jQuery(".countries").trigger("change");
      }
      jQuery(".countries").prop("disabled", false);
    } else {
      alert(data.msg);
    }
    document.querySelector("#countryId").value = value;
  };

  const errorRes = function (e) {
    console.log(e);
  };
  jQuery(".countries").find("option:eq(0)").html("Please wait..");
  jQuery.ajax({
    url,
    type: method,
    data,
    success: successRes,
    error: errorRes,
    dataType: type,
    timeout: 60000,
  });
}

export function geoLocationState(method, url, value, data = {}, type = "json") {
  const successRes = function (data) {
    jQuery.each(data.result, (key, val) => {
      const option = jQuery("<option />");
      option.attr("value", val).text(val);
      option.attr("stateid", key);
      jQuery(".states").append(option);
    });
    document.querySelector("#stateId").value = value;
    jQuery(".states").prop("disabled", false);
  };

  const errorRes = function (e) {
    console.log(e);
  };

  jQuery.ajax({
    url,
    type: method,
    data,
    success: successRes,
    error: errorRes,
    dataType: type,
    timeout: 60000,
  });
}

export function geoLocationCity(method, url, value, data = {}, type = "json") {
  const successRes = function (data) {
    const listlen = Object.keys(data.result).length;
    if (listlen > 0) {
      jQuery.each(data.result, (key, val) => {
        const option = jQuery("<option />");
        option.attr("value", val).text(val);
        jQuery(".cities").append(option);
      });
    } else {
      const usestate = document.querySelector("#stateId").value;
      const option = jQuery("<option />");
      option.attr("value", usestate).text(usestate);
      option.attr("selected", "selected");
      jQuery(".cities").append(option);
    }
    document.querySelector("#cityId").value = value;
    jQuery(".cities").prop("disabled", false);
  };

  const errorRes = function (e) {
    console.log(e);
  };

  jQuery.ajax({
    url,
    type: method,
    data,
    success: successRes,
    error: errorRes,
    dataType: type,
    timeout: 60000,
  });
}

// function for making Linkedin oauth popup windows
export function linkedinAuth(state) {
  console.log(FRONTEND_URI);
  const w = 475;
  const h = 550;
  const y = window.outerHeight / 2 + (window.screenY - h / 2);
  const x = window.outerWidth / 2 + (window.screenX - w / 2);
  return window.open(
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=75d5ul44bm0rac&redirect_uri=${FRONTEND_URI}%2Flinkedin&state=${state}&scope=r_liteprofile%20r_emailaddress`,
    "Linkedin Authentication",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );
}

export function requireAuth(callback) {
  return (nextState, replace) => {
    // require the auth and user data to be set
    setReturnUrl(nextState.location.pathname);

    if (!getAuthToken() || !getUserData()) {
      removeAuthToken();
      removeUserData();
      replace("/?login");
    } else if (getUserData() && !getUserData().isRealUser) {
      replace("/?proceedonboarding");
    } else if (!checkAuthToken()) {
      removeAuthToken();
      removeUserData();
      replace("/?unauthorized");
    }
    if (callback) callback();
  };
}

export function requireOnboarding(callback) {
  return (nextState, replace) => {
    // require the auth and user data to be set
    if (getUserData() && !getUserData().isRealUser) {
      replace("/?proceedonboarding");
    }
    if (callback) callback();
  };
}

export function redirectAuth(callback) {
  return (nextState, replace) => {
    // redirect if user is logged in
    if (checkAuthToken() && getUserData() && getUserData().isRealUser) {
      replace("/");
    }
    if (callback) callback();
  };
}

export function redirectAuthSSO(callback) {
  return (nextState, replace) => {
    // redirect if user is logged in
    if (checkAuthToken() && getUserData()) {
      console.log("Yeah!!!");
    }
    if (callback) callback();
  };
}

export function getSizeId(size) {
  if (size && typeof size === "string") {
    const val = employeeCount.filter((v) => v.name === size);
    return val[0].id;
  }
}

export function loadScript(url, type = "text/javascript", id = "") {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    if (id) script.id = id;
    script.async = true;
    script.type = type;
    script.onload = () => {
      console.log(`Script loaded ${url} successfully`);
      resolve(script);
    };
    script.onerror = () => {
      console.log(`Script ${url} loading failed`);
      reject(new Error(`Script load error for ${url}`));
    };

    document.head.append(script);
  });
}

export function getFilter(key) {
  const filterArray = [
    { key: "Best Match", value: "best_match" },
    { key: "Most Verified", value: "times_verified" },
    { key: "Most Connected", value: "connections_count" },
    { key: "Most Games", value: "games_count" },
    { key: "Most Searched", value: "searched_count" },
  ];
  const data = filterArray.filter((x) => x.key == key);
  return data[0].value;
}

export async function addUserToGroup(userId, name = "") {
  // const maker = '39716176';
  const groupName = "makers";
  const groupId = "40061694";
  // const apiKey = 'aad9e7478192aeb910ee0727140bcb30'; //test
  // const auth = 'Basic dXNlcjEyMzQ6NjNhMDZkNDgtYTQ3Yi00ZGRhLTgzOGEtOWRjMTgyYTc1N2Iy'; //test
  const apiKey = "gamesmith299bb298412053414de4322b1a13315b";
  const auth =
    "Basic c3VwcG9ydEBnYW1lc21pdGguY29tOmM0NzI5NTBkLTFhMTItNDY2YS1hYmVjLTJkNDEwM2MyYjk4Yw==";

  if (name) {
    const createUser = await axios.post(
      "https://apps.applozic.com/rest/ws/user/v2/create",
      {
        userId: userId,
        displayName: name,
      },
      { headers: { "Application-Key": apiKey, Authorization: auth } }
    );
  }

  const isUserPresent = await axios.get(
    `https://apps.applozic.com/rest/ws/group/check/user?clientGroupId=${groupId}&userId=${userId}`,
    { headers: { "Application-Key": apiKey, Authorization: auth } }
  );

  // console.log('is Present', isUserPresent)
  if (!isUserPresent.data.response) {
    const req = await axios.post(
      "https://apps.applozic.com/rest/ws/group/add/member",
      {
        userId: userId,
        clientGroupId: groupId,
        role: 3,
      },
      {
        headers: { "Application-Key": apiKey, Authorization: auth },
      }
    );
    // console.log('req ::', req);
  }
}

export const filterAwards = (awards) => {
  return awards.filter(award => award.visible)
}
