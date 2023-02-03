import { createReducer, on } from "@ngrx/store";
import * as PostPageActions from "./posts.actions";
import { initialStatePosts, posts } from "./posts.state";

export const postsReducer = createReducer(
    initialStatePosts,
    on(PostPageActions.loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts,
        }
    }),
    on(PostPageActions.createPostSuccess, (state, action) => {
        return {
            ...state,
            posts: [...state.posts, action.post],
            postMesage: 'Post created successfully'
        }
    }),
    on(PostPageActions.deletePostSuccess, (state, {id}) => {
        return {
            ...state,
            posts: state.posts.filter(post => post.id !== id)
        }
    }),
    on(PostPageActions.deletePostFailure, (state, action) => {
        return {
            ...state,
            postMesage: action.message
        }
    })
);