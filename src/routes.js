/*
 * These are the pages you can go to
 *
 * They are all wrapped in the App component, which should contain the navbar etc
 * We are using verbose react-router plain routes here in order to support webpack
 * code splitting for better performance
 *
 * See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
 */

import { getAsyncInjectors } from "utils/asyncInjectors";
import appSaga from "./containers/App/sagas";
import makerSaga from "./containers/Maker/sagas";
import peopleSaga from "./containers/People/sagas";
import recruiterSaga from "./containers/Recruiter/sagas";
import partnerSaga from "./containers/Partners/sagas";
import salarySaga from "./containers/SalaryCalculator/sagas";
import gamesSaga from "./containers/Games/sagas";
import ecosystemSaga from "./containers/Ecosystem/sagas";
import job from "./containers/Job/sagas";
import studiosSaga from "./containers/Studios/sagas";
import signupSaga from "./containers/SignUp/sagas";
import verificationrequestsSaga from "./containers/VerificationRequests/sagas";
import vfxSaga from "./containers/VFX/sagas";
import recruiterpeople from "./containers/RecruiterPeople/sagas";
import companyEmployeesSaga from "./containers/CompanyEmployees/sagas";

import {
  requireAuth,
  redirectAuth,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  getUserData,
  removeUserData,
  redirectAuthSSO,
  setReturnUrl,
  requireOnboarding,
} from "utils";

const errorLoading = (err) => {
  console.error("Dynamic page loading failed", err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line

  // Init main sagas

  appSaga
    .concat(makerSaga)
    .concat(peopleSaga)
    .concat(recruiterSaga)
    .concat(salarySaga)
    .concat(ecosystemSaga)
    .concat(studiosSaga)
    .concat(vfxSaga)
    .concat(signupSaga)
    .concat(verificationrequestsSaga)
    .concat(recruiterpeople)
    .concat(companyEmployeesSaga)
    .concat(job)
    .forEach((saga) => {
      if (!Reflect.has(store.asyncSagas, saga)) {
        store.runSaga(saga);
        store.asyncSagas[saga] = true; // eslint-disable-line no-param-reassign
      }
    });

  return [
    {
      path: "/",
      name: "home",
      getComponent(nextState, cb) {
        console.log("xd");
        System.import("./containers/Home")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: (nextState, replace) => {
        if (checkAuthToken() && localStorage.getItem("onboarding") !== "true") {
          replace("/home");
        }
      },
    },
    {
      path: "/signup",
      name: "signup",
      getComponent(nextState, cb) {
        System.import("./containers/SignUp")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "/signin",
      name: "signin",
      getComponent(nextState, cb) {
        System.import("./containers/SignIn")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "/client",
      name: "client",
      getComponent(nextState, cb) {
        System.import("./containers/Client")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: redirectAuth(),
    },
    {
      path: "/professional",
      name: "professional",
      getComponent(nextState, cb) {
        System.import("./containers/Professional")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: redirectAuth(),
    },
    {
      path: "/about",
      name: "about",
      getComponent(nextState, cb) {
        System.import("./containers/About")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: redirectAuth(),
    },
    {
      path: "/salarycalculator",
      name: "salarycalculator",
      getComponent(nextState, cb) {
        System.import("./containers/SalaryCalculator/reducer");
        System.import("./containers/SalaryCalculator/sagas");
        System.import("./containers/SalaryCalculator")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: redirectAuth(),
    },
    {
      path: "/faqs",
      name: "faqs",
      getComponent(nextState, cb) {
        System.import("./containers/FAQs")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: redirectAuth(),
    },
    {
      path: "/studios",
      name: "studios",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Studios/reducer"),
          System.import("./containers/Studios/sagas"),
          System.import("./containers/Studios"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("studios", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/vfx",
      name: "vfx",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/VFX/reducer"),
          System.import("./containers/VFX/sagas"),
          System.import("./containers/VFX"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("vfx", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/studio/:slug",
      name: "studio",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Studio/reducer"),
          System.import("./containers/Studio/sagas"),
          System.import("./containers/Studio"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("studio", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/forum",
      name: "forum",
      getComponent(nextState, cb) {
        const {
          location: { query },
        } = nextState;
        const importModules = Promise.all([
          System.import("./containers/Forum/reducer"),
          System.import("./containers/Forum/sagas"),
          System.import("./containers/Forum"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("forum", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/forum/login",
      name: "forumLogin",
      getComponent(nextState, cb) {
        const {
          location: { query },
        } = nextState;
        const importModules = Promise.all([
          System.import("./containers/ForumLogin/reducer"),
          System.import("./containers/ForumLogin/sagas"),
          System.import("./containers/ForumLogin"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("forumLogin", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: redirectAuthSSO(),
    },
    {
      path: "/employers",
      name: "employers",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Employers/reducer"),
          System.import("./containers/Employers/sagas"),
          System.import("./containers/Employers"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("employers", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/resetpassword",
      name: "resetpassword",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/ResetPassword/reducer"),
          System.import("./containers/ResetPassword/sagas"),
          System.import("./containers/ResetPassword"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("resetpassword", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/repostJob",
      name: "repostJob",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/RepostJob"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/maker/:makerID",
      name: "maker",
      getComponent(nextState, cb) {
        System.import("./containers/Maker")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: (nextState, replace) => {
        setReturnUrl(nextState.location.pathname);
        if (!getAuthToken() || !getUserData()) {
          removeAuthToken();
          removeUserData();
          replace("/?login");
        } else if (!checkAuthToken()) {
          removeAuthToken();
          removeUserData();
          replace("/?unauthorized");
        } else if (
          getAuthToken() &&
          getUserData() &&
          !getUserData().isRealUser
        ) {
          replace("/?proceedonboarding");
        } else {
          // if the user visits own ID slug redirect to /me
          const makerID = nextState.params.makerID.toString();
          const user = getUserData();
          if (user && user.id.toString() === makerID) {
            replace("/maker/me");
          }
        }
      },
    },
    {
      path: "/maker/:makerID/profile",
      name: "maker",
      getComponent(nextState, cb) {
        System.import("./containers/Maker")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: (nextState, replace) => {
        setReturnUrl(nextState.location.pathname);
      },
    },
    {
      path: "/maker/:makerID/connections",
      name: "connections",
      getComponent(nextState, cb) {
        System.import("./containers/Connections")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: requireAuth(),
    },
    {
      path: "/recruiter/:recruiterID/connections",
      name: "connections",
      getComponent(nextState, cb) {
        System.import("./containers/RecruiterConnections")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/maker/:makerID/games",
      name: "history",
      getComponent(nextState, cb) {
        System.import("./containers/GameHistory")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      // onEnter: requireAuth(),
    },
    {
      path: "/maker/:makerID/game/:gameID",
      name: "details",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/GameDetails/reducer"),
          System.import("./containers/GameDetails"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("gameDetails", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/games",
      name: "games",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Games/reducer"),
          System.import("./containers/Games/sagas"),
          System.import("./containers/Games"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("games", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/ecosystem",
      name: "ecosystem",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Ecosystem/reducer"),
          System.import("./containers/Ecosystem/sagas"),
          System.import("./containers/Ecosystem"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("ecosystem", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/game/:gameID",
      name: "game",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Game/reducer"),
          System.import("./containers/Game/sagas"),
          System.import("./containers/Game"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("game", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      // onEnter: requireAuth(),
    },
    {
      path: "/join/maker/:id",
      name: "join",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Join/reducer"),
          System.import("./containers/Join/sagas"),
          System.import("./containers/Join"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("join", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: "/makers",
      name: "makers",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/People/reducer"),
          System.import("./containers/People/sagas"),
          System.import("./containers/People"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("people", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
        // System.import('./containers/People')
        // .then(loadModule(cb))
        // .catch(errorLoading);
      },
      onEnter: requireOnboarding(),
      // onEnter: requireAuth(),
    },
    {
      path: "/recruitermaker",
      name: "recruitermaker",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/RecruiterPeople/reducer"),
          System.import("./containers/RecruiterPeople/sagas"),
          System.import("./containers/RecruiterPeople"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("recruiterpeople", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/jobs",
      name: "jobs",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Jobs/reducer"),
          System.import("./containers/Jobs/sagas"),
          System.import("./containers/Jobs"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("jobs", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/job/:jobID",
      name: "job",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Job/reducer"),
          System.import("./containers/Job/sagas"),
          System.import("./containers/Job"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("job", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      // onEnter: requireAuth(),
    },
    {
      path: "/requests",
      name: "requests",
      getComponent(nextState, cb) {
        System.import("./containers/Requests")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/teamrequests",
      name: "teamrequests",
      getComponent(nextState, cb) {
        System.import("./containers/TeamRequests")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/analytics",
      name: "analytics",
      getComponent(nextState, cb) {
        System.import("./containers/RemoteAnalytics")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/settings",
      name: "settings",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Settings/reducer"),
          System.import("./containers/Settings/sagas"),
          System.import("./containers/Settings"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("settings", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/edit",
      name: "edit",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Edit/reducer"),
          System.import("./containers/Edit/sagas"),
          System.import("./containers/Edit"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("profile", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/recruiter",
      name: "recruiter",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Recruiter/reducer"),
          System.import("./containers/Recruiter/sagas"),
          System.import("./containers/Recruiter"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("recruiter", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/recruiter/:path",
      name: "recruiter",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Recruiter/reducer"),
          System.import("./containers/Recruiter/sagas"),
          System.import("./containers/Recruiter"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("recruiter", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/verify",
      name: "verify",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Verify/reducer"),
          System.import("./containers/Verify/sagas"),
          System.import("./containers/Verify"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("verify", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    },
    {
      path: "/unsubscribe/:code",
      name: "unsubscribe",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Unsubscribe/reducer"),
          System.import("./containers/Unsubscribe/sagas"),
          System.import("./containers/Unsubscribe"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("unsubscribe", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: "/terms",
      name: "terms",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Terms"),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    },
    // {
    //   path: '/funding',
    //   name: 'funding',
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //       System.import('./containers/Funding/reducer'),
    //       System.import('./containers/Funding/sagas'),
    //       System.import('./containers/Funding'),
    //     ]);
    //
    //     const renderRoute = loadModule(cb);
    //
    //     importModules.then(([reducer, sagas, component]) => {
    //       injectReducer('funding', reducer.default);
    //       injectSagas(sagas.default);
    //       renderRoute(component);
    //     });
    //
    //     importModules.catch(errorLoading);
    //   },
    // },
    {
      path: "/payments",
      name: "payments",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/Payments/reducer"),
          System.import("./containers/Payments/sagas"),
          System.import("./containers/Payments"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("payments", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: "/studio-signup",
      name: "studioHub",
      getComponent(location, cb) {
        System.import("./containers/StudioHub")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "/onboarding",
      name: "onBoarding",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/OnBoarding/reducer"),
          System.import("./containers/OnBoarding/sagas"),
          System.import("./containers/OnBoarding"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("onBoarding", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireOnboarding(),
    },
    {
      path: "/networking(/:code)(/:accept_verification)",
      name: "verificationrequests",
      getComponent(location, cb) {
        System.import("./containers/VerificationRequests")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "/Client",
      name: "client",
      getComponent(location, cb) {
        System.import("./containers/Client")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "/professional",
      name: "professional",
      getComponent(location, cb) {
        System.import("./containers/Professional")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "/studio/:studio/employees",
      name: "companyEmployees",
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import("./containers/CompanyEmployees/reducer"),
          System.import("./containers/CompanyEmployees/sagas"),
          System.import("./containers/CompanyEmployees"),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer("companyEmployees", reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: "home",
      name: "tribeHome",
      getComponent(location, cb) {
        System.import("./containers/TribeHome")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: "*",
      name: "error",
      getComponent(nextState, cb) {
        System.import("./containers/Error")
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
