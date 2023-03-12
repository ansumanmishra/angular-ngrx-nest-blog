import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly auth: AuthService
  ) {}

  loginEnter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginEnter),
      exhaustMap((action) => {
        const { email, password } = action;
        return this.auth.login(email, password).pipe(
          map((user) => AuthActions.loginSuccess({ token: user.token })),
          catchError((err) => {
            console.error('Something went wrong!');
            return of(AuthActions.loginFailure({ error: err }));
          })
        );
      })
    );
  });
}
