import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Post } from "../shared/models/post.model";
import { AppState } from "../store/app.state";
import { loadPosts } from "./state/posts.actions";
import { posts } from "./state/posts.state";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private readonly store: Store<AppState>) {

    }

    getPostsAction(): void {
        this.store.dispatch(loadPosts())
    }

    getAllPosts(): Observable<Post[]> {
        return this.store.select(posts);
    }

    getPostsFromApi(): Observable<Post[]> {
        const post1 = new Post(1, 'post 1', 'Ngrx rocks!!', 1);
        const post2 = new Post(2, 'post 2', 'Angular rocks', 2);

        const posts: Post[] = [post1, post2];

        return of(posts);
    }
}