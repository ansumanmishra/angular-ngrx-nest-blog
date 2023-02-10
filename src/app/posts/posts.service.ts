import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../shared/models/post.model';
import { AppState } from '../store/app.state';
import { RouterStateUrl } from '../store/router/custom-route-serializer';
import { getCurrentRoute } from '../store/router/router.selector';
import { deletePost, PostPageActions } from './state/posts.actions';
import { posts, postsError, selectedPost } from './state/posts.state';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postMessage$ = this.store.select(postsError);
  selectedPost$ = this.store.select(selectedPost);

  constructor(
    private readonly store: Store<AppState>,
    private readonly http: HttpClient
  ) {}

  getPostsAction(): void {
    this.store.dispatch(PostPageActions.loadPosts());
  }

  getAllPosts(): Observable<Post[]> {
    return this.store.select(posts);
  }

  getPostsFromApi(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.baseUrl + '/posts');
  }

  getRoutes(): Observable<RouterStateUrl> {
    return this.store.select(getCurrentRoute);
  }

  addPost(formValue: Post): void {
    const post: Post = {
      article: formValue.article,
      desc: formValue.desc,
      userId: 2,
      id: formValue?.id,
    };
    this.store.dispatch(PostPageActions.createPost({ post }));
  }

  createPost(post: Post): Observable<Post[]> {
    return this.http.post<Post[]>(
      environment.baseUrl + '/posts/createOrUpdate',
      {
        post,
      }
    );
  }

  handleDeletePost(id: number | undefined): void {
    // Here the actual http call will happen
    this.store.dispatch(deletePost({ id: id! }));
  }

  deletePost(id: number): Observable<boolean> {
    return this.http.delete<boolean>(environment.baseUrl + '/deletePost/' + id);
  }

  editPostEnter(post: Post) {
    this.store.dispatch(PostPageActions.editPostEnter({ post }));
  }

  cancelEdit(): void {
    this.store.dispatch(PostPageActions.cancelEdit());
  }
}
