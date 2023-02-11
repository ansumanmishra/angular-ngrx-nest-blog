import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export interface UserState {
  users: User[];
  selectedUser: User | undefined;
}

export const userInitialState: UserState = {
  users: [],
  selectedUser: undefined,
};

export const USERS_STATE_NAME = 'users';

const getUsersState = createFeatureSelector<UserState>(USERS_STATE_NAME);

export const getUsers = createSelector(
  getUsersState,
  (state: UserState) => state.users
);

export const getSelectedUser = createSelector(
  getUsersState,
  (state: UserState) => state.selectedUser
);
