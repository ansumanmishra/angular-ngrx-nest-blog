import { createAction, props } from '@ngrx/store';

export const adminAdmins = createAction(
  '[Admin] Admin Admins'
);

export const adminAdminsSuccess = createAction(
  '[Admin] Admin Admins Success',
  props<{ data: any }>()
);

export const adminAdminsFailure = createAction(
  '[Admin] Admin Admins Failure',
  props<{ error: any }>()
);
