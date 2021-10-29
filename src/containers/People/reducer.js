/*
 * People reducer
 */

import { fromJS } from 'immutable';
import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_ERROR,
  TOGGLE_SEARCH,
  SEARCH_PEOPLE_REQUEST,
  SEARCH_PEOPLE_SUCCESS,
  SEARCH_PEOPLE_ERROR,
  SEARCH_PEOPLE_COUNT,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CLEAR_SEARCH_PEOPLE,
  MAKER_LOCATION_REQUEST,
  MAKER_LOCATION_SUCCESS,
  MAKER_LOCATION_ERROR,
  LANGUAGES_REQUEST,
  LANGUAGES_SUCCESS,
  LANGUAGES_ERROR,
  SHOW_FILTERS,
  HIDE_FILTERS,
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  NEXT_PAGE_ADDITION,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  isLastPage: false,
  showFilters: false,
  people: [],
  search: [],
  // languages:[],
  message: '',
  // location: {},
  searchData: [],
  count: 0,
});

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case PEOPLE_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case PEOPLE_SUCCESS:
      return state
        .set('people', fromJS(action.data))
        .set('isFetching', false)
        .set('message', '');
    case PEOPLE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case TOGGLE_SEARCH:
      return state
        .set('isSearching', !state.get('isSearching'));
    case SEARCH_PEOPLE_REQUEST:
      return state
        .set('isFetching', true)
        .set('isLastPage', false)
        .set('isSearching', true)
        .set('search', fromJS([]))
        .set('message', '');
    case SEARCH_PEOPLE_SUCCESS:
      const d = action.data.length > 20 ? action.data.slice(0, 20) : action.data;
      return state
        .set('isFetching', false)
        .set('searchData', action.data)
        .set('search', fromJS(d))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    case NEXT_PAGE_ADDITION:
      const start = 0;
      const end = state.get('search').toJS().length + 20;
      const pageData = state.get('searchData').length < end ? state.get('searchData') : state.get('searchData').slice(start, end);
      const isLast = state.get('searchData').length <= end ? true : false;
      return state
        .set('search', fromJS(pageData))
        .set('isLastPage', isLast);
    case SEARCH_PEOPLE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case SEARCH_PEOPLE_COUNT:
      return state
        .set('count', action.count);
    case NEXT_PAGE_REQUEST:
      return state
        .set('isFetching', true);
    case NEXT_PAGE_SUCCESS: {
      const target = state.get('isSearching') ? 'search' : 'people';
      return state
        .set('isFetching', false)
        .set(target, state.get(target).concat(action.data))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    }
    case NEXT_PAGE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case CLEAR_SEARCH_PEOPLE:
      return state
        .set('isFetching', false)
        .set('search', fromJS([]))
        .set('isLastPage', false)
        .set('isSearching', false);
    case SHOW_FILTERS:
      return state
        .set('showFilters', true);
    case HIDE_FILTERS:
      return state
        .set('showFilters', false);
    // case MAKER_LOCATION_REQUEST:
    //   return state
    //     .set('location', fromJS({}))
    //     .set('message', '');
    // case MAKER_LOCATION_SUCCESS:
    //   return state
    //     .set('location', fromJS(action.data))
    //     .set('message', '');
    // case MAKER_LOCATION_ERROR:
    //   return state
    //     .set('isFetching', false)
    //     .set('message', action.message);
    // case LANGUAGES_REQUEST:
    //   return state
    //     .set('languages', fromJS([]))
    //     .set('message', '');
    // case LANGUAGES_SUCCESS:
    //   return state
    //     .set('languages', fromJS(action.data))
    //     .set('message', '');
    // case LANGUAGES_ERROR:
    //   return state
    //     .set('isFetching', false)
    //     .set('message', action.message);
    // maker connect actions
    case CONNECT_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case CONNECT_SUCCESS:
      const target = state.get('isSearching') ? 'search' : 'people';
      const updatedPeople = state.get(target).update(
        state.get(target).findIndex((item) => {
          return item.get('id') === action.id;
        }),
        (item) => {
          return item.set('connectPending', true);
        }
      );
      return state
        .set('isFetching', false)
        .set(target, updatedPeople)
        .set('message', action.message);
    case CONNECT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    default:
      return state;
  }
}

export default peopleReducer;
