/*
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import Immutable, { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import appReducer from 'containers/App/reducer';
import signUpReducer from 'containers/SignUp/reducer';
import makerReducer from 'containers/Maker/reducer';
import recruiterReducer from 'containers/Recruiter/reducer';
import editReducer from 'containers/Edit/reducer';
import jobsReducer from 'containers/Jobs/reducer';
import jobReducer from 'containers/Job/reducer';
import studiosReducer from 'containers/Studios/reducer';
import VFXReducer from 'containers/VFX/reducer';
import studioReducer from 'containers/Studio/reducer';
import peopleReducer from 'containers/People/reducer';
import headerReducer from 'containers/Header/reducer';
import employersReducer from 'containers/Employers/reducer';
import modalReducer from 'containers/Modals/reducer';
import sideNavReducer from 'containers/SideNav/reducer';
import gamesReducer from 'containers/Games/reducer';
import partnerReducer from 'containers/Partners/reducer';
import salaryCalculatorReducer from 'containers/SalaryCalculator/reducer';
import ecosystemReducer from 'containers/Ecosystem/reducer';
import verificationRequestReducer from './containers/VerificationRequests/reducer';
import recruiterPeopleReducer from './containers/RecruiterPeople/reducer';
import companyEmployeesReducer from './containers/CompanyEmployees/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

// Merge route into the global application state
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

// Creates the main reducer with the asynchronously loaded ones
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
    signUp: signUpReducer,
    header: headerReducer,
    maker: makerReducer,
    recruiter: recruiterReducer,
    people: peopleReducer,
    modal: modalReducer,
    profile: editReducer,
    sideNav: sideNavReducer,
    games: gamesReducer,
    jobs: jobsReducer,
    job: jobReducer,
    studios: studiosReducer,
    vfx: VFXReducer,
    studio: studioReducer,
    employers: employersReducer,
    partners: partnerReducer,
    salary: salaryCalculatorReducer,
    ecosystem: ecosystemReducer,
    verificationRequests: verificationRequestReducer,
    recruiterPeople: recruiterPeopleReducer,
    companyEmployees: companyEmployeesReducer,
    form: (state = Immutable.fromJS({}), action) => Immutable.fromJS(formReducer(state.toJS(), action)),
    ...asyncReducers,
  });
}
