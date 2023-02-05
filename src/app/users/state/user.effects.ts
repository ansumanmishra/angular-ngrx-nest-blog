import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "src/app/shared/models/user.model";
import { UserService } from "../user.service";

import * as UserActions from './user.action';

@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions, private userService: UserService) {}

    loadUsers$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap( (action) => {            
                return this.userService.getUsers().pipe(
                    map( (users) => {
                        return UserActions.loadUsersSuccess({users})
                    }),
                    catchError(err => {
                        console.error('Something went wrong!')
                        return of(UserActions.dummyAction());
                    })
                )
            })
        )
    });
}
