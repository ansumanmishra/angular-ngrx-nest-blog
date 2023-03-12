import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const authSelector = createFeatureSelector<AuthState>('auth');

export const token = createSelector(
  authSelector,
  (state: AuthState) => state.token
);
