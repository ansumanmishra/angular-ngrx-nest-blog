import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly auth: AuthService,
    private readonly router: Router
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

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((_) => this.router.navigate(['users']))
      );
    },
    { dispatch: false }
  );
}
