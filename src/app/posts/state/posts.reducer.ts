import { createReducer, on } from '@ngrx/store';
import {
  createPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  loadPostsSuccess,
  PostPageActions,
} from './posts.actions';
import { initialStatePosts, posts } from './posts.state';

export const postsReducer = createReducer(
  initialStatePosts,
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
      postMesage: null,
    };
  }),
  on(createPostSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
      postMesage: action.message,
      selectedPostId: 0,
    };
  }),
  on(deletePostSuccess, (state, { id }) => {
    return {
      ...state,
      posts: state.posts.filter((post) => post.id !== id),
      postMesage: 'Post deleted successfully',
    };
  }),
  on(deletePostFailure, (state, action) => {
    return {
      ...state,
      postMesage: action.message,
    };
  }),
  on(PostPageActions.editPostEnter, (state, action) => {
    return {
      ...state,
      selectedPostId: action.post.id || 0,
    };
  }),
  on(PostPageActions.cancelEdit, (state, action) => {
    return {
      ...state,
      selectedPostId: 0,
    };
  })
);
