import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../shared/models/user.model";

export interface UserState {
    users: User[]
};

export const userInitialState: UserState = {
    users: [],
}

const getUsersState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    getUsersState,
    (state: UserState) => state.users
);
