/*
 * Maker reducer
 */

import { fromJS } from 'immutable';
import { orderBy } from 'lodash';

import {
  MAKER_REQUEST,
  MAKER_SUCCESS,
  MAKER_ERROR,
  CREDIT_REQUEST,
  CREDIT_SUCCESS,
  CREDIT_ERROR,
  VERIFY_CREDIT_REQUEST,
  VERIFY_CREDIT_SUCCESS,
  VERIFY_CREDIT_ERROR,
  DISPUTE_REQUEST,
  DISPUTE_SUCCESS,
  DISPUTE_ERROR,
  UNVERIFY_CREDIT_REQUEST,
  UNVERIFY_CREDIT_SUCCESS,
  UNVERIFY_CREDIT_ERROR,
  ADD_CREDIT_SUCCESS,
  EDIT_CREDIT_SUCCESS,
  DELETE_CREDIT_SUCCESS,
  SAVE_CV_SUCCESS,
  DELETE_CV_SUCCESS,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  message: '',
  maker: {},
  makerCredits: [],
  credit: [],
  isCvUploaded: false,
  isDeleted: false,
});

function makerReducer(state = initialState, action) {
  switch (action.type) {
    case MAKER_REQUEST:
      return state
        .set('isFetching', true)
        .set('maker', fromJS([]))
        .set('makerCredits', fromJS([]))
        .set('message', '');
    case MAKER_SUCCESS:
      const orderdMakerCredit = orderBy(action.data.credits, ['endDate.month', 'endDate.year'], ['desc', 'desc']);
      return state
        .set('isFetching', false)
        .set('maker', fromJS(action.data))
        .set('makerCredits', fromJS(orderdMakerCredit))
        .set('message', 'test');
    case MAKER_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case CREDIT_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case CREDIT_SUCCESS:
      return state
        .set('isFetching', false)
        .set('credit', fromJS(action.data))
        .set('message', 'test');
    case CREDIT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // case VERIFY_CREDIT_REQUEST:
    //   return state
    //     .set('isFetching', true)
    //     .set('message', '');
    // case VERIFY_CREDIT_SUCCESS:
    //   return state
    //     .set('isFetching', false)
    //     .set('message', 'verified credit');
    case VERIFY_CREDIT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case DISPUTE_REQUEST:
      return state
        .set('message', '');
    case DISPUTE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', '');
    case DISPUTE_ERROR:
      return state
        .set('message', action.message);
    // case UNVERIFY_CREDIT_REQUEST:
    //   return state
    //     .set('isFetching', true)
    //     .set('message', '');
    // case UNVERIFY_CREDIT_SUCCESS:
    //   return state
    //     .set('isFetching', false)
    //     .set('message', 'unverified credit');
    case UNVERIFY_CREDIT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case ADD_CREDIT_SUCCESS:
      return state
        .set('isFetching', false)
        .set('makerCredits', fromJS(action.data.concat(state.get('makerCredits').toJS())))
        .set('message', 'test');
    case EDIT_CREDIT_SUCCESS:
      var filterCredits = state.get('makerCredits').toJS().filter(mc => mc.id != action.data[0].id);
      const orderdFilterCredit = orderBy(filterCredits.concat(action.data), ['startDate.year', 'startDate.month'], ['desc', 'desc']);
      return state
        .set('isFetching', false)
        .set('makerCredits', fromJS(orderdFilterCredit))
        .set('message', action.message);
    case DELETE_CREDIT_SUCCESS:
      var filterCredits = state.get('makerCredits').toJS().filter(mc => mc.id != action.id);
      return state
        .set('isFetching', false)
        .set('makerCredits', fromJS(filterCredits))
        .set('message', 'deleted');
    case SAVE_CV_SUCCESS:
      return state
        .set('isCvUploaded', true)
        .set('isDeleted', false);

    case DELETE_CV_SUCCESS:
      return state
        .set('isDeleted', true)
        .set('isCvUploaded', false);
    default:
      return state;
  }
}

export default makerReducer;
