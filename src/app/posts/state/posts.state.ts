import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

export const POSTS_STATE_NAME = 'posts';

export interface PostState {
    posts: Post[];
    postMesage: string | null;
}

export const initialStatePosts: PostState = {
    posts: [],
    postMesage: null
}

export const postsSelector = createFeatureSelector<PostState>(POSTS_STATE_NAME);

export const posts = createSelector(
    postsSelector,
    state => state.posts
);

export const postsError = createSelector(
    postsSelector,
    state => state.postMesage
)