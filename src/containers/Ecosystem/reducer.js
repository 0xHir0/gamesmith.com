/*
 * Studios reducer
 */

import { fromJS } from 'immutable';
import { curry } from 'lodash';
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
  UPDATE_PARTNERS,
  TOGGLE_PARTNER,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  isLastPage: false,
  data: [],
  categstudios: [],
  search: [],
  message: '',
  partners: [],
  togglePartner: false,

});

const isMatch = curry((query, studio) => new RegExp(query, 'i').test(studio.get('name')));
// this is implementaion is temporary; it is set up this way to mirror
// how searching is done for studios and to make refactoring faster
// when the appropriate route for searchstudio is implemented on the BE
function ecosystemReducer(state = initialState, action) {
  switch (action.type) {
    case STUDIO_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case STUDIO_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', fromJS(action.data))
        .set('categstudios', fromJS(action.data))
        .set('isLastPage', action.data.length < 20)
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
        .set('isLastPage', false)
        .set('search', fromJS([]))
        .set('message', '');
    case SEARCH_STUDIO_SUCCESS:
      return state
        .set('isFetching', false)
        .set('search', fromJS(action.data))
        .set('isLastPage', action.data.length < 20)
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
      const target = state.get('isSearching') ? 'search' : 'categstudios';
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
    case START_SPINNER:
      return state
        .set('isFetching', true);
    case UPDATE_PARTNERS:
      return state
        .set('partners', fromJS(action.payload));
    case TOGGLE_PARTNER:
      return state
        .set('togglePartner', !state.get('togglePartner'));
    default:
      return state;
  }
}

export default ecosystemReducer;
