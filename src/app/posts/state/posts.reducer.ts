import { createFeature, createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/shared/models/post.model';
import {
  createPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  loadPostsSuccess,
  PostPageActions,
} from './posts.actions';

export const POSTS_STATE_NAME = 'posts';

export interface PostState {
  posts: Post[];
  postMesage: string | null;
  selectedPostId: number;
}

export const initialStatePosts: PostState = {
  posts: [],
  postMesage: null,
  selectedPostId: 0,
};

const postsReducer = createReducer(
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

export const postsFeature = createFeature({
  name: POSTS_STATE_NAME,
  reducer: postsReducer,
});
