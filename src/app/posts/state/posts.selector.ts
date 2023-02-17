import { createSelector } from '@ngrx/store';
import { Post } from 'src/app/shared/models/post.model';
import { postsFeature } from './posts.reducer';

export const {
  name,
  reducer,
  selectPostMesage,
  selectPosts,
  selectPostsState,
  selectSelectedPostId,
} = postsFeature;

export const selectedPost = createSelector(
  selectPosts,
  selectSelectedPostId,
  (posts, id) => posts.find((post: Post) => post.id === id)
);

// OLD Selectors without using createFeature API

// export const postsSelector = createFeatureSelector<PostState>(POSTS_STATE_NAME);

// export const selectPosts = createSelector(
//   postsSelector,
//   (state) => state.posts
// );

// export const selectPostMesage = createSelector(
//   postsSelector,
//   (state) => state.postMesage
// );

// export const selectedPostId = createSelector(
//   postsSelector,
//   (state) => state.selectedPostId
// );

// export const selectedPost = createSelector(
//   selectPosts,
//   selectedPostId,
//   (posts, id) => posts.find((post) => post.id === id)
// );
