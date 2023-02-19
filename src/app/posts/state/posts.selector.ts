import { createSelector } from '@ngrx/store';
import { Post, PostsWithUser } from 'src/app/shared/models/post.model';
import { selectAllUsers } from 'src/app/users/state/user.state';
import { postsFeature } from './posts.reducer';

export const {
  name,
  reducer,
  selectPostMesage,
  selectPosts,
  selectSelectedPostId,
} = postsFeature;

export const selectedPost = createSelector(
  selectPosts,
  selectSelectedPostId,
  (posts, id) => posts.find((post: Post) => post.id === id)
);

export const postsWithusers = createSelector(
  selectPosts,
  selectAllUsers,
  (posts, users) => {
    return posts.map((post) => {
      return {
        ...post,
        username: users.find((user) => user.id === post.userId)?.name,
      } as PostsWithUser;
    });
  }
);

export const postsByUserId = (userId: number) => {
  return createSelector(postsWithusers, (posts) =>
    posts.filter((post) => post.userId === userId)
  );
};

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
