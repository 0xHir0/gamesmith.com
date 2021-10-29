/*
 * Game reducer
 */

import { fromJS } from "immutable";
import {
  GAME_REQUEST,
  GAME_SUCCESS,
  GAME_ERROR,
  GAME_INFORMATION_REQUEST,
  GAME_INFORMATION_SUCCESS,
  GAME_INFORMATION_ERROR,
  GAME_MAKERS_REQUEST,
  GAME_MAKERS_SUCCESS,
  GAME_MAKERS_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CONNECT_SUCCESS,
  MAKER_EXPERIENCE_REQUEST,
  MAKER_EXPERIENCE_ERROR,
  TOGGLE_SEARCH,
  SEARCH_GAME_MAKER_REQUEST,
  SEARCH_GAME_MAKER_SUCCESS,
  SEARCH_GAME_MAKER_ERROR,
  CLEAR_GAMES,
} from "./constants";

const initialState = fromJS({
  isFetching: false,
  isInfoFetching: false,
  isSearching: false,
  isLastPage: false,
  game: {},
  gameInformation: {},
  makers: [],
  search: [],
  message: "",
});

function makersReducer(state = initialState, action) {
  switch (action.type) {
    case GAME_REQUEST:
      return state
        .set("isFetching", true)
        .set("isSearching", false)
        .set("message", "");
    case GAME_SUCCESS:
      return state
        .set("isFetching", false)
        .set("game", fromJS(action.data))
        .set("message", "");
    case GAME_ERROR:
      return state.set("isFetching", false).set("message", action.message);
    case GAME_INFORMATION_REQUEST:
      return state
        .set("isInfoFetching", true)
        .set("isSearching", false)
        .set("message", "");
    case GAME_INFORMATION_SUCCESS:
      return state
        .set("isInfoFetching", false)
        .set("gameInformation", action.data)
        .set("message", "");
    case GAME_INFORMATION_ERROR:
      return state.set("isInfoFetching", false).set("message", action.message);
    case GAME_MAKERS_REQUEST:
      return state.set("isFetching", true).set("message", "");
    case GAME_MAKERS_SUCCESS:
      return state
        .set("isFetching", false)
        .set("makers", fromJS(action.data))
        .set("isLastPage", action.data.length < 20)
        .set("message", "");
    case GAME_MAKERS_ERROR:
      return state.set("isFetching", false).set("message", action.message);
    case MAKER_EXPERIENCE_REQUEST:
      return state.set("message", "");
    case MAKER_EXPERIENCE_ERROR:
      return state.set("message", action.message);
    case NEXT_PAGE_REQUEST:
      return state.set("isFetching", true);
    case NEXT_PAGE_SUCCESS: {
      const target = state.get("isSearching") ? "search" : "makers";
      return state
        .set("isFetching", false)
        .set(target, state.get(target).concat(action.data))
        .set("isLastPage", action.data.length < 20)
        .set("message", "");
    }
    case NEXT_PAGE_ERROR:
      return state.set("isFetching", false).set("message", action.message);
    // maker connect actions
    case CONNECT_SUCCESS:
      const target = "makers";
      const updatedMaker = state.get(target).update(
        state.get(target).findIndex(function (item) {
          return item.get("id") === action.id;
        }),
        function (item) {
          return item.set("connectPending", true);
        }
      );
    case TOGGLE_SEARCH:
      return state.set("isSearching", !state.get("isSearching"));
    case SEARCH_GAME_MAKER_REQUEST:
      return state
        .set("isFetching", true)
        .set("isLastPage", false)
        .set("search", fromJS([]))
        .set("message", "");
    case SEARCH_GAME_MAKER_SUCCESS:
      return state
        .set("isFetching", false)
        .set("search", fromJS(action.data))
        .set("isLastPage", action.data.length < 20)
        .set("message", "");
    case SEARCH_GAME_MAKER_ERROR:
      return state.set("isFetching", false).set("message", action.message);
    case CLEAR_GAMES:
      return state
        .set("search", fromJS([]))
        .set("makers", fromJS([]))
        .set("game", fromJS([]));
    default:
      return state;
  }
}

export default makersReducer;
