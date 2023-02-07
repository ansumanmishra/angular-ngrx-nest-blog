import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AdminActions from './admin.actions';


@Injectable()
export class AdminEffects {

  adminAdmins$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AdminActions.adminAdmins),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AdminActions.adminAdminsSuccess({ data })),
          catchError(error => of(AdminActions.adminAdminsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
