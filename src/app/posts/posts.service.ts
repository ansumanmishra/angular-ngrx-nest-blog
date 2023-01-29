import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Post } from "../shared/models/post.model";
import { getPosts } from "./state/posts.actions";
import { posts } from "./state/posts.state";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private readonly store: Store) {

    }

    getPostsAction(): void {
        this.store.dispatch(getPosts())
    }

    getAllPosts(): Observable<Post[]> {
        return this.store.select(posts);
    }
}