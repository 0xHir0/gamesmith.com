/*
 * Settings reducer
 */

import { fromJS } from 'immutable';
import {
  GET_SETTINGS_REQUEST,
  GET_SETTINGS_SUCCESS,
  GET_SETTINGS_ERROR,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_ERROR,
  GET_STUDIO_PLAN_SUCCESS,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  message: '',
  settings: {},
  studioData: {},
  cardLast4: '',
  expMonth: '',
  expYear: '',
  nextBillingDate: '',

});

function settingsReducer(state = initialState, action) {
  switch (action.type) {
    // get actions
    case GET_SETTINGS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case GET_SETTINGS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('settings', fromJS(action.data));
    case GET_SETTINGS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // update actions
    case UPDATE_SETTINGS_REQUEST:
      return state
        .set('message', '');
    case UPDATE_SETTINGS_SUCCESS:
      return state
        .set('message', action.message);
    case UPDATE_SETTINGS_ERROR:
      return state
        .set('message', action.message);
    case GET_STUDIO_PLAN_SUCCESS:
      return state.set('studioData', action.data.studio)
        .set('cardLast4', action.data.cardLast4)
        .set('expMonth', action.data.expMonth)
        .set('expYear', action.data.expYear)
        .set('nextBillingDate', action.data.nextBillingDate)
    default:
      return state;
  }
}

export default settingsReducer;
