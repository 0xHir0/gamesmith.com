/*
 * Modal reducer
 */

import { fromJS } from 'immutable';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from './constants';

const initialState = fromJS({
  isOpen: false,
  id: '',
  name: '',
  title: '',
  message: '',
  receiverID: '',
  data: {},
  email: '',
  image: null,
});

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return state
        .set('id', action.id)
        .set('name', action.name)
        .set('title', action.title)
        .set('message', action.message)
        .set('receiverID', action.receiverID)
        .set('isOpen', true)
        .set('data', action.data)
        .set('email', action.email)
        .set('image', action.image);
    case CLOSE_MODAL:
      return state
        .set('id', '')
        .set('name', '')
        .set('title', '')
        .set('message', '')
        .set('receiverID', '')
        .set('isOpen', false)
        .set('data', '')
        .set('email', '')
        .set('image', null);
    default:
      return state;
  }
}

export default modalReducer;
