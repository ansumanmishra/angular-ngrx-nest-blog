import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, filter, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { UserService } from "../user.service";
import { dummyAction, loadUser, loadUsersSuccess, userActions } from "./user.action";
import { getUsers } from "./user.state";

@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions, private userService: UserService,
        private router: Router, private readonly store: Store<AppState>) {}

    loadUsers$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(loadUser),
            withLatestFrom(this.store.select(getUsers)),
            filter(([action, users]) => !users || users.length === 0),
            switchMap( ([action, users]) => { 
                return this.userService.getUsers().pipe(
                    map( (users) => loadUsersSuccess({users})),
                    catchError(err => {
                        console.error('Something went wrong!')
                        return of(dummyAction());
                    })
                )
            })
        )
    });

    createUser$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(userActions.addUserEnter),
            exhaustMap(action => {
                return this.userService.createUser(action.user).pipe(
                    map(data => userActions.addUserSuccess({user: action.user}))
                )
            })
        )
    });

    redirectUser$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(userActions.addUserSuccess),
            tap(_ => this.router.navigate(['/user']))
        )
    }, {dispatch: false})

}
