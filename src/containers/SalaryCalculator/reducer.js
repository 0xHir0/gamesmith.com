/*
* Salary Calculator reducer
*/

import { fromJS } from 'immutable';
import {
  SEARCH_SALARY_REQUEST,
  SEARCH_SALARY_SUCCESS,
  SEARCH_SALARY_ERROR,
  GET_JOBTITLE_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_BYNAME_REQUEST,
  SAVE_TITLES,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  salary: [],
  message: '',
  title: '',
  value: '',
  jobs: [],
  currentSalary: '',
  flag: 'below',
  titles:[],
});

function salaryCalculatorReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SALARY_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', true);
    case SEARCH_SALARY_SUCCESS:
      return state
        .set('isFetching', false)
        .set('value', action.payload.data)
        .set('title', action.payload.title)
        .set('currentSalary', action.payload.salary)
        .set('flag', action.payload.flag)
    case SEARCH_SALARY_ERROR:
      return state
        .set('isFetching', false)
        .set('isSearching', false)
        .set('message', action.message);
    case GET_JOBTITLE_REQUEST:
      return state
        .set('message', '');
    case GET_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', action.jobs)
    case GET_JOBS_BYNAME_REQUEST:
      return state
        .set('isFetching', true)
    case SAVE_TITLES:
      return state
        .set('isFetching', false)
        .set('isSearching', false)
        .set('titles', action.titles)
    default:
      return state;
  }
}


export default salaryCalculatorReducer;
