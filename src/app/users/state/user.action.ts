import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";

const LOAD_USERS = '[Users Page] Load Users';
const LOAD_USERS_SUCCESS = '[Users Page] Load Users Success';

export const loadUser = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users: User[]}>());
