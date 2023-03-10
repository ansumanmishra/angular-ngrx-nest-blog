import { createFeature, createReducer, on } from '@ngrx/store';
import { Features } from 'src/app/shared/models/features.model';
import { Post } from 'src/app/shared/models/post.model';
import {
  createPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  loadPostsSuccess,
  PostPageActions,
} from './posts.actions';
export interface PostState {
  posts: Post[];
  postMesage: string | null;
  selectedPostId: number;
  loading: boolean;
}

const initialStatePosts: PostState = {
  posts: [],
  postMesage: null,
  selectedPostId: 0,
  loading: false,
};

const postsReducer = createReducer(
  initialStatePosts,
  on(PostPageActions.loadPosts, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
      postMesage: null,
      loading: false,
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
  name: Features.Post,
  reducer: postsReducer,
});
