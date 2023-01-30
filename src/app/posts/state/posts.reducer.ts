import { createReducer, on } from "@ngrx/store";
import * as PostPageActions from "./posts.actions";
import { initialStatePosts } from "./posts.state";

export const postsReducer = createReducer(
    initialStatePosts,
    on(PostPageActions.loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
);