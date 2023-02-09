import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Post } from "../shared/models/post.model";
import { AppState } from "../store/app.state";
import { RouterStateUrl } from "../store/router/custom-route-serializer";
import { getCurrentRoute } from "../store/router/router.selector";
import { deletePost, PostPageActions } from "./state/posts.actions";
import { posts, postsError, selectedPost } from "./state/posts.state";

const post1 = new Post('Angular v15 is now available!', `Over the past year we removed Angular’s legacy compiler and rendering pipeline which enabled the development of a series of developer experience improvements in the past couple of months. Angular v15 is the culmination of this with dozens of refinements which lead to better developer experience and performance.`, 1, 1);
const post2 = new Post('Advancements in the Angular Router', `The Angular team has been busy making some meaningful updates to the Angular router that are available as of Angular v14.2. We’re pleased to share some recent improvements. Read on to learn more.`, 2, 2);

const allPosts: Post[] = [post1, post2];
@Injectable({
    providedIn: 'root'
})
export class PostsService {
    postMessage$ = this.store.select(postsError);
    selectedPost$ = this.store.select(selectedPost);

    constructor(private readonly store: Store<AppState>) {

    }

    getPostsAction(): void {
        this.store.dispatch(PostPageActions.loadPosts())
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
        this.store.dispatch(PostPageActions.createPost({post}));
    }

    createPost(post: Post): Observable<Post[]> {
        // Here it should call the service add the post and return all the posts
        return of([...allPosts, post]);
    }

    handleDeletePost(id: number | undefined): void {
        // Here the actual http call will happen
        this.store.dispatch(deletePost({id: id!}));
    }

    deletePost(id: number): Observable<boolean> {
        return of(true);
    }

    editPostEnter(post: Post) {
        this.store.dispatch(PostPageActions.editPostEnter({post}));
    }

    cancelEdit(): void {
        this.store.dispatch(PostPageActions.cancelEdit());
    }

}