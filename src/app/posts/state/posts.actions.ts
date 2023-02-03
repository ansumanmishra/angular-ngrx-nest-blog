import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

const LOAD_POSTS = '[Post Page] Load Posts';
const LOAD_POSTS_SUCCESS = '[Post Page] Load Posts Success';
const LOAD_POSTS_FAILURE = '[Post Page] Load Posts Failure';

const CREATE_POST = '[Post API] Create Post';
const CREATE_POST_SUCCESS = '[Post Page] Create Post Success';
const CREATE_POST_FAILURE = '[Post Page] Create Post Failure';

const DELETE_POST = '[Post API] Delete Post';
const DELETE_POST_SUCCESS = '[Post Page] Delete Post Success';
const DELETE_POST_FAILURE = '[Post API] Delete Post Failure';

// export const loadPosts = createAction(LOAD_POSTS);
export const loadPostsSuccess = createAction(LOAD_POSTS_SUCCESS, props<{posts: Post[]}>());
// export const createPost = createAction(CREATE_POST, props<{post: Post}>());
export const createPostSuccess = createAction(CREATE_POST_SUCCESS, props<{post: Post}>());
export const deletePost = createAction(DELETE_POST, props<{id: number}>());
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS, props<{id: number}>());
export const deletePostFailure = createAction(DELETE_POST_FAILURE, props<{message: string}>());

// Creating actions using createActionGroup API
export const PostPageActions = createActionGroup({
    source: 'Post Page',
    events: {
        'Load Posts': emptyProps(),
        'Create Post': props<{post: Post}>()
    }
})