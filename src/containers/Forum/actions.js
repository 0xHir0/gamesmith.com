/*
 * Forum actions
 */

 import {
   FORUM_REQUEST,
   FORUM_SUCCESS,
   FORUM_ERROR,
 } from './constants';

 // forum action creators
 export function forumRequest(data) {
   return {
     type: FORUM_REQUEST,
     payload: data,
   };
 }

 export function forumSuccess(data) {
   return {
     type: FORUM_SUCCESS,
     data,
   };
 }

 export function forumError(error) {
   return {
     type: FORUM_ERROR,
     payload: error,
   };
 }
