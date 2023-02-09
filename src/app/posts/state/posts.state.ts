import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";

export const POSTS_STATE_NAME = 'posts';

export interface PostState {
    posts: Post[];
    postMesage: string | null;
    selectedPostId: number;
}

export const initialStatePosts: PostState = {
    posts: [],
    postMesage: null,
    selectedPostId: 0
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

export const selectedPostId = createSelector(
    postsSelector,
    state => state.selectedPostId
)

export const selectedPost = createSelector(
    posts,
    selectedPostId,
    (posts, id) => posts.find(post => post.id === id)
)