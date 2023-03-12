import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  name: string;
  email: string;
  token: string;
}

const initialState: AuthState = {
  name: '',
  email: '',
  token: '',
};

export const AUTH_STATE_NAME = 'auth';
export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => {
    console.log('AuthActions.loginsuccess', token);
    return {
      ...state,
      token,
    };
  })
);
