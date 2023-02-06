import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "src/app/shared/models/user.model";
import { UserService } from "../user.service";
import { dummyAction, loadUser, loadUsersSuccess, userActions } from "./user.action";

@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions, private userService: UserService) {}

    loadUsers$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(loadUser),
            switchMap( (action) => {            
                return this.userService.getUsers().pipe(
                    map( (users) => {
                        return loadUsersSuccess({users})
                    }),
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
            switchMap(action => {
                return this.userService.createUser(action.user).pipe(
                    map(data => userActions.addUserSuccess({user: action.user}))
                )
            })
        )
    });
    
}
