import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { PostsService } from "../posts.service";
import { createPost, createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, loadPosts, loadPostsSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects {

    constructor(private readonly actions$: Actions, 
        private readonly postsService: PostsService) {

    }
    
    loadPosts = createEffect( () => {
        return this.actions$.pipe(
            ofType(loadPosts),
            mergeMap(action => {                
                return this.postsService.getPostsFromApi().pipe(
                    map(posts => {
                        // this.store.dispatch triggers the action even if the {dispath: false}
                        // So just call the action like action() while using {dispatch: false}
                        // return this.store.dispatch(getPostsSuccess({posts}));
                        return loadPostsSuccess({posts});
                    }
                ));
            })
            )
    });

    createPost$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(createPost),
            mergeMap(action => {
                return of(createPostSuccess({post: action.post}))
            })
        )
    });

    deletePost$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(deletePost),
            exhaustMap( action => {
                return this.postsService.deletePost(action.id).pipe(
                    map( data => {
                        if (data) {
                            return deletePostSuccess({id: action.id})
                        } else {
                            return deletePostFailure({message: 'Something went wrong!'});
                        }
                    }),
                    catchError(_ => {
                        return of(deletePostFailure({message: 'Something went wrong!'}));
                    })
                )
            })
        )
    })
}