import { postsReducer } from "../posts/state/posts.reducer";
import { POSTS_STATE_NAME } from "../posts/state/posts.state";
import { Post } from "../shared/models/post.model";
import { User } from "../shared/models/user.model"
import { userReducer } from "../users/state/user.reducer";
import { USERS_STATE_NAME } from "../users/state/user.state";

export interface AppState {
    [USERS_STATE_NAME]: User[];
    [POSTS_STATE_NAME]: Post[];
}

export const appReducer = {
    [USERS_STATE_NAME]: userReducer,
    [POSTS_STATE_NAME]: postsReducer
}