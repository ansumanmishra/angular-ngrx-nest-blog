import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AppState } from 'src/app/store/app.state';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { UserService } from '../user.service';
import {
  dummyAction,
  loadUser,
  loadUsersSuccess,
  userActions,
  userApiActions,
} from './user.action';
import { selectAllUsers } from './user.state';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private userService: UserService,
    private router: Router,
    private readonly store: Store<AppState>
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUser),
      withLatestFrom(this.store.select(selectAllUsers)),
      filter(([action, users]) => !users || users.length === 0),
      switchMap(([action, users]) => {
        return this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((err) => {
            console.error('Something went wrong!');
            return of(dummyAction());
          })
        );
      })
    );
  });

  loadSelectedUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getSelectedUser),
      withLatestFrom(this.store.select(getCurrentRoute)),
      filter(([action, route]) => route.params['id'] !== undefined),
      mergeMap(([action, route]) => {
        const id: number = route.params['id'];
        return this.userService.getSelectedUser(id).pipe(
          map((user: User) => userActions.getSelectedUserSuccess({ user })),
          catchError((error) =>
            of(
              userActions.getSelectedUserFailuer({
                error: 'Something went wrong!',
              })
            )
          )
        );
      })
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.addUserEnter),
      exhaustMap((action) => {
        return this.userService
          .createUser(action.user)
          .pipe(map((data) => userActions.addUserSuccess({ user: data })));
      })
    );
  });

  editUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.editUserEnter),
      exhaustMap((action) => {
        return this.userService.editUser(action.user).pipe(
          map((data) => {
            return userActions.editUserSuccess({ user: action.user });
          }),
          catchError((err) =>
            of(userActions.editUserFailure({ error: 'Failed to update user' }))
          )
        );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.deleteUser),
      mergeMap((action) => {
        return this.userService.deleteUser(action.userId).pipe(
          map((data) =>
            userApiActions.deleteUserSuccess({ userId: action.userId })
          ),
          catchError((err) =>
            of(
              userApiActions.deleteUserFailure({
                error: 'Failed to delete user',
              })
            )
          )
        );
      })
    );
  });

  redirectUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(userActions.addUserSuccess, userActions.editUserSuccess),
        tap((_) => this.router.navigate(['/users']))
      );
    },
    { dispatch: false }
  );
}
