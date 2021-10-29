/*
 * Games reducer
 */

import { fromJS } from 'immutable';
import { curry, orderBy } from 'lodash';
import { getUserData } from 'utils';
import {
  GAMES_REQUEST,
  GAMES_SUCCESS,
  GAMES_ERROR,
  MAKER_GAMES_REQUEST,
  MAKER_GAMES_SUCCESS,
  MAKER_GAMES_ERROR,
  MAKER_GAMES_ADD,
  MAKER_GAMES_DELETE,
  SEARCH_GAMES_REQUEST,
  SEARCH_GAMES_SUCCESS,
  SEARCH_GAMES_ERROR,
  TOGGLE_SEARCH,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  START_SPINNER, // temp while BE search route not implemented
  TOGGLE_PARTNER,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  isLastPage: false,
  data: [],
  user: getUserData() || {},
  games: [],
  search: [],
  message: '',
  makerGameIds: [],
  partners:[],
  togglePartner: false,
  query: "",
});

const isMatch = curry((query, game) => new RegExp(query, 'i').test(game.get('name')));
// this is implementaion is temporary; it is set up this way to mirror
// how searching is done for makers and jobs and to make refactoring faster
// when the appropriate route for searchgame is implemented on the BE
function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case GAMES_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case GAMES_SUCCESS:
      return state
        .set('isFetching', false)
        .set('data', fromJS(action.data))
        .set('games', fromJS(orderBy(action.data, ['id'])))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    case GAMES_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case  MAKER_GAMES_REQUEST:
      return state
        .set('message', '');
    case  MAKER_GAMES_SUCCESS:
      return state
        .set('makerGameIds', fromJS(action.data))
        .set('message', '');
    case  MAKER_GAMES_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case  MAKER_GAMES_ADD:
      const target = state.get('isSearching') ? 'search' : 'games';
      const AddedGame = state.get(target).toJS().filter(game => game.id == action.data[0].id )
      var updatedState = state.get(target).toJS().filter(game => game.id != action.data[0].id )
      const user = state.get('user').toJS();
      if(AddedGame.length != 0) {
        AddedGame[0].makers = AddedGame[0].makers.concat([{id :action.data[0].id,  firstName: user.firstName, lastName: user.lastName}])
        AddedGame[0].makerCount = AddedGame[0].makers.length;
      }
      updatedState = orderBy(updatedState.concat(action.data[0]), ['id'])
      return state
        .set('isFetching', false)
        .set('makerGameIds', state.get('makerGameIds').concat(action.data[0].id))
        .set(target, fromJS(updatedState))
        .set('message', '');
    case  MAKER_GAMES_DELETE:
      const targetState = state.get('isSearching') ? 'search' : 'games';
      var filterGames = state.get(targetState).toJS().filter(game => game.id != action.gameId )
      var targetGame = state.get(targetState).toJS().filter(game => game.id == action.gameId )
      targetGame[0].makerCount = targetGame[0].makerCount - 1;
      targetGame[0].makers = targetGame[0].makers.filter(maker => maker.id !=  action.makerId)
      var filterCredits = state.get('makerGameIds').filter(mc => mc != action.gameId)
      return state
        .set('isFetching', false)
        .set('makerGameIds', filterCredits)
        .set(targetState, fromJS(orderBy(filterGames.concat(targetGame), ['id'])))
        .set('message', '');
    case TOGGLE_SEARCH:
      return state
        .set('isSearching', !state.get('isSearching'));
    case SEARCH_GAMES_REQUEST:
      return state
        .set('isFetching', true)
        .set('isLastPage', false)
        .set('query', action.payload.query)
        .set('search', fromJS([]))
        .set('message', '');
    case SEARCH_GAMES_SUCCESS:
      return state
        .set('isFetching', false)
        .set('search', fromJS(action.data))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    case SEARCH_GAMES_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case NEXT_PAGE_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case NEXT_PAGE_SUCCESS: {
      const data = state.get('data');
      const target = state.get('isSearching') ? 'search' : 'games';
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
    case TOGGLE_PARTNER:
      return state
        .set('togglePartner', !state.get('togglePartner'));
    default:
      return state;
  }
}

export default gamesReducer;
