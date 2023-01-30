import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, of, switchMap } from "rxjs";
import { User } from "src/app/shared/models/user.model";

import * as UserActions from './user.action';

@Injectable()
export class UserEffects {
    constructor(private readonly actions$: Actions) {}

    loadUsers$ = createEffect( () => {
        return this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap( (action) => {            
                const users: User[] = [
                    {
                    name: 'bryan',
                    age: 25
                    },
                    {
                    name: 'nicole',
                    age: 26
                    }
                ]
                return of(users).pipe(
                    map( (users) => {
                        return UserActions.loadUsersSuccess({users})
                    })
                )
            })
        )
    });
}
