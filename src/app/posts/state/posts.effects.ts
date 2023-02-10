import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Post } from 'src/app/shared/models/post.model';
import { PostsService } from '../posts.service';
import {
  createPostFailure,
  createPostSuccess,
  deletePost,
  deletePostFailure,
  deletePostSuccess,
  loadPostsSuccess,
  PostPageActions,
} from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly postsService: PostsService
  ) {}

  loadPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostPageActions.loadPosts),
      mergeMap((action) => {
        return this.postsService.getPostsFromApi().pipe(
          map((posts) => {
            // this.store.dispatch triggers the action even if the {dispath: false}
            // So just call the action like action() while using {dispatch: false}
            // return this.store.dispatch(getPostsSuccess({posts}));
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostPageActions.createPost),
      concatMap((action) => {
        return this.postsService.createPost(action.post).pipe(
          map((posts: Post[]) => {
            return createPostSuccess({
              posts,
              message: action.post.id
                ? 'Post edited successfully'
                : 'Post created successfully',
            });
          }),
          catchError((_) => {
            return of(createPostFailure({ message: 'Something went wrong!' }));
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      exhaustMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data: boolean) => {
            if (data) {
              return deletePostSuccess({ id: action.id });
            } else {
              return deletePostFailure({ message: 'Something went wrong!' });
            }
          }),
          catchError((_) => {
            return of(deletePostFailure({ message: 'Something went wrong!' }));
          })
        );
      })
    );
  });
}
