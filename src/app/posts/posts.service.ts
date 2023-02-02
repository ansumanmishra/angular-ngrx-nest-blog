import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Post } from "../shared/models/post.model";
import { AppState } from "../store/app.state";
import { RouterStateUrl } from "../store/router/custom-route-serializer";
import { getCurrentRoute } from "../store/router/router.selector";
import { createPost, loadPosts } from "./state/posts.actions";
import { posts } from "./state/posts.state";

const post1 = new Post('post 1', 'Ngrx rocks!!', 1, 1);
const post2 = new Post('post 2', 'Angular rocks', 2, 2);

const allPosts: Post[] = [post1, post2];
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
        return of(allPosts);
    }

    getRoutes(): Observable<RouterStateUrl> {
        return this.store.select(getCurrentRoute);
    }

    addPost(formValue: Post): void {
        const postId = allPosts.length + 1;

        const post: Post = {
            article: formValue.article,
            desc: formValue.desc,
            userId: 2,
            id: postId
        }
        this.store.dispatch(createPost({post}));
    }

    createPost(post: Post): Observable<Post[]> {
        // Here it should call the service add the post and return all the posts
        return of([...allPosts, post]);
    }
}