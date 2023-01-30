import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

const LOAD_POSTS = '[Post Page] Load Posts';
const LOAD_POSTS_SUCCESS = '[Post Page] Load Posts Success';
const LOAD_POSTS_FAILURE = '[Post Page] Load Posts Failure';

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{posts: Post[]}>());