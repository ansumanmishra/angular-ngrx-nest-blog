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

  pageEnter$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.pageEnter),
        tap((_) => {
          const user = JSON.parse(sessionStorage.getItem('user') || '{}');

          if (user.name && user.email && user.token) {
            this.router.navigate(['users']);
          }
        })
      );
    },
    { dispatch: false }
  );

  loginEnter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginEnter),
      exhaustMap((action) => {
        const { email, password } = action;
        return this.auth.login(email, password).pipe(
          map((user) => {
            // store the user details and token in session storage
            // to keep user logged in between page refreshes
            sessionStorage.setItem('user', JSON.stringify(user));
            return AuthActions.loginSuccess({ user });
          }),
          catchError((err) => {
            return of(AuthActions.loginFailure({ error: err.error.message }));
          })
        );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((_) => this.router.navigate(['login']))
      );
    },
    { dispatch: false } // Don't dispatch any actions
  );

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
