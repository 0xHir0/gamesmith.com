/*
 * Forum actions
 */

 import {
  FORUM_LOGIN_REQUEST,
  FORUM_LOGIN_SUCCESS,
  FORUM_LOGIN_ERROR,
 } from './constants';

 // forum action creators
 export function forumLoginRequest(data) {
   return {
     type: FORUM_LOGIN_REQUEST,
     payload: data,
   };
 }

 export function forumLoginSuccess(data) {
   return {
     type: FORUM_LOGIN_SUCCESS,
     data,
   };
 }

 export function forumLoginError(error) {
   return {
     type: FORUM_LOGIN_ERROR,
     payload: error,
   };
 }
