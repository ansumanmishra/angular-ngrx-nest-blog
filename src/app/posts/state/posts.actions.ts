import { createAction } from "@ngrx/store";

export const GET_POSTS_ACTION = '[Post Page] Get Posts';

export const getPosts = createAction(GET_POSTS_ACTION);