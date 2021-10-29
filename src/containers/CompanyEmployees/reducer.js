/*
 * CompanyEmployees reducer
 */

import { fromJS } from 'immutable';
import {
  GET_COMPANY_EMPLOYEES_REQUEST,
  GET_COMPANY_EMPLOYEES_SUCCESS,
  GET_COMPANY_EMPLOYEES_ERROR,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  makers: [],
  isLastPage: false,
});

function companyEmployeesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_EMPLOYEES_REQUEST:
      const data = action.payload.offset === 0 ? fromJS([]) : state.get('makers');
      return state
        .set('isFetching', true)
        .set('makers', data);
    case GET_COMPANY_EMPLOYEES_SUCCESS:
      const makers = state.get('makers').concat(fromJS(action.payload.data));
      return state
        .set('isFetching', false)
        .set('makers', makers)
        .set('isLastPage', action.payload.data && action.payload.data.length < 20)
    case GET_COMPANY_EMPLOYEES_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.payload.message);
    default:
      return state;
  }
}

export default companyEmployeesReducer;
