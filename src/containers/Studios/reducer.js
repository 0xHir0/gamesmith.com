/*
 * Studios reducer
 */

import { fromJS } from 'immutable';
import { curry, orderBy } from 'lodash';
import {
  STUDIO_REQUEST,
  STUDIO_SUCCESS,
  STUDIO_ERROR,
  SEARCH_STUDIO_REQUEST,
  SEARCH_STUDIO_SUCCESS,
  SEARCH_STUDIO_ERROR,
  TOGGLE_SEARCH,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  START_SPINNER, // temp while BE search route not implemented
  GET_RECRUITER_STUDIO_SUCCESS,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  isLastPage: false,
  data: [],
  studios: [],
  search: [],
  message: '',
  recruiterStudio: {},
});

const isMatch = curry((query, studio) => new RegExp(query, 'i').test(studio.get('name')));
// this is implementaion is temporary; it is set up this way to mirror
// how searching is done for studios and to make refactoring faster
// when the appropriate route for searchstudio is implemented on the BE
function studiosReducer(state = initialState, action) {
  switch (action.type) {
    case STUDIO_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case STUDIO_SUCCESS:
      const sortedStudios = orderBy(action.data, 'jobCount', 'desc');
      const sortedData = orderBy(action.data, 'jobCount', 'desc');
      return state
        .set('isFetching', false)
        .set('data', fromJS(sortedData))
        .set('studios', fromJS(sortedStudios))
        .set('isLastPage', action.data.length < 10)
        .set('message', '');
    case STUDIO_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case TOGGLE_SEARCH:
      return state
        .set('isSearching', !state.get('isSearching'));
    case SEARCH_STUDIO_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', true)
        .set('isLastPage', false)
        .set('search', fromJS([]))
        .set('message', '');
    case SEARCH_STUDIO_SUCCESS:
      return state
        .set('isFetching', false)
        .set('search', fromJS(action.data))
        .set('isLastPage', action.data.length < 10)
        .set('message', '');
    case SEARCH_STUDIO_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case NEXT_PAGE_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case NEXT_PAGE_SUCCESS: {
      const data = state.get('data');
      const target = state.get('isSearching') ? 'search' : 'studios';
      return state
        .set('isFetching', false)
        .set(target, state.get(target).concat(action.data))
        .set('isLastPage', action.data.length < 10)
        .set('message', '');
    }
    case NEXT_PAGE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case START_SPINNER:
      return state
        .set('isFetching', true);
    case GET_RECRUITER_STUDIO_SUCCESS:
      return state.set('recruiterStudio', fromJS(action.payload.data));
    default:
      return state;
  }
}

export default studiosReducer;
