import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../shared/models/post.model';
import { RouterStateUrl } from '../store/router/custom-route-serializer';
import { getCurrentRoute } from '../store/router/router.selector';
import { deletePost, PostPageActions } from './state/posts.actions';
import { PostState } from './state/posts.reducer';
import { postsViewModel } from './state/posts.selector';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postsViewModel$ = this.store.select(postsViewModel);
  private userSelectedSubject$ = new BehaviorSubject<number>(0);

  //   postsForSelectedUserId$ = this.userSelectedSubject$.pipe(
  //     switchMap((userId) =>
  //       userId
  //         ? this.store.select(postsByUserId(userId))
  //         : this.store.select(postsWithusers)
  //     )
  //   );

  constructor(
    private readonly store: Store<PostState>,
    private readonly http: HttpClient
  ) {}

  getPostsAction(): void {
    this.store.dispatch(PostPageActions.loadPosts());
  }

  getPostsFromApi(): Observable<Post[]> {
    return this.http
      .get<Post[]>(environment.baseUrl + '/posts')
      .pipe(delay(1000));
  }

  getRoutes(): Observable<RouterStateUrl> {
    return this.store.select(getCurrentRoute);
  }

  addPost(formValue: Post): void {
    const post: Post = {
      article: formValue.article,
      desc: formValue.desc,
      userId: formValue.userId,
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

  onUserSelected(userId: number) {
    this.userSelectedSubject$.next(userId);
  }
}
