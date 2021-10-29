/*
 * App
 *
 * This is the entry file for the application, only setup and boilerplate code.
 */

// Needed for redux-saga es6 generator support
import "babel-polyfill";
/* eslint-disable import/no-unresolved */
// Load the favicon, the manifest.json file and the .htaccess file
// import 'file?name=[name].[ext]!./favicon.ico';
import "!file?name=[name].[ext]!./manifest.json";
import "file?name=[name].[ext]!./.htaccess";
/* eslint-enable import/no-unresolved */

// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//import applyRouterMiddleware from "react-router-apply-middleware";
import { Router } from "react-router";
//import history from "./history";
import { syncHistoryWithStore } from "react-router-redux";
import FontFaceObserver from "fontfaceobserver";
//import { useScroll } from "react-router-scroll";
import HttpsRedirect from "react-https-redirect";
import configureStore from "./store";
import ReactGA from "react-ga";
ReactGA.initialize("UA-90593793-1");

import ReactPixel from "react-facebook-pixel";

// Observe loading of Lato
import styles from "containers/App/styles.module.scss";
const fontObserver = new FontFaceObserver("Mark Pro", {});
export const ENV = process.env.NODE_ENV || "developments";

// Install Gamesmith Analytics Client Library
// Note: (This library is used in the Router onUpdate lifecycle hook)
import { GamesmithAnalyticsClient } from "./services/gamesmith-analytics-client/gamesmith-analytics-client.es6.js";
const gsac = new GamesmithAnalyticsClient({
  apiEndpoint:
    "https://uyt8hstyue.execute-api.us-west-2.amazonaws.com/latest/analytic",
});

// When font is loaded, add a font-family using Mark Web to the body
fontObserver.load().then(
  () => {
    document.body.classList.add("fontLoaded");
  },
  () => {
    document.body.classList.remove("fontLoaded");
  }
);

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
//const store = configureStore(initialState, browserHistory);
const store = configureStore(initialState);

// If you use Redux devTools extension, since v2.0.1, they added an
// `updateStore`, so any enhancers that change the store object
// could be used with the devTools' store.
// As this boilerplate uses Redux & Redux-Saga, the `updateStore` is needed
// if you want to `take` actions in your Sagas, dispatched from devTools.
if (window.devToolsExtension) {
  window.devToolsExtension.updateStore(store);
}

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
//import { selectLocationState } from "containers/App/selectors";
/*
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});
*/

// Set up the router, wrapping all Routes in the App component
import App from "containers/App";
import createRoutes from "./routes";
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

function logPageView() {
  if (ENV != "development") {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    gsac._sendAnalyticEvent();
    gsac._resetTracker();
  }
}

const advancedMatching = { em: "" };
const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};
ReactPixel.init("657839911622589", advancedMatching, options);

ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <Router
        onUpdate={logPageView}
        history={history}
        routes={rootRoute}
        /* render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
         // applyRouterMiddleware(useScroll())
        } */
      />
    </HttpsRedirect>
  </Provider>,
  document.getElementById("app")
);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from "offline-plugin/runtime";
install();
