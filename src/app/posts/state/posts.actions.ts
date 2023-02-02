import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

const LOAD_POSTS = '[Post Page] Load Posts';
const LOAD_POSTS_SUCCESS = '[Post Page] Load Posts Success';
const LOAD_POSTS_FAILURE = '[Post Page] Load Posts Failure';

const CREATE_POST = '[Post API] Create Post';
const CREATE_POST_SUCCESS = '[Post Page] Create Post Success';
const CREATE_POST_FAILURE = '[Post Page] Create Post Failure';

export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{posts: Post[]}>());
export const createPost = createAction(CREATE_POST, props<{post: Post}>());
export const createPostSuccess = createAction(CREATE_POST_SUCCESS, props<{post: Post}>());