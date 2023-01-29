import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/shared/models/post.model";
import { getPosts } from "./posts.actions";
import { initialStatePosts } from "./posts.state";

const post1 = new Post(1, 'post 1', 'Ngrx rocks', 1);
const post2 = new Post(2, 'post 2', 'Angular rocks', 2);

const posts: Post[] = [post1, post2];

export const postsReducer = createReducer(
    initialStatePosts,
    on(getPosts, (state => {
        return {
            ...state,
            posts
        }
    }))
);