import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../shared/models/user.model";

export interface UserState {
    users: User[]
};

export const userInitialState: UserState = {
    users: [],
}

export const USERS_STATE_NAME = 'users';

const getUsersState = createFeatureSelector<UserState>(USERS_STATE_NAME);

export const getUsers = createSelector(
    getUsersState,
    (state: UserState) => state.users
);
