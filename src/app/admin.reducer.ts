import { Action, createReducer, on } from '@ngrx/store';
import * as AdminActions from './admin.actions';

export const adminFeatureKey = 'admin';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,

  on(AdminActions.adminAdmins, state => state),
  on(AdminActions.adminAdminsSuccess, (state, action) => state),
  on(AdminActions.adminAdminsFailure, (state, action) => state),

);
