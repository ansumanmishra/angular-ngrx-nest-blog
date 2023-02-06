import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";

const LOAD_USERS = '[Users Page] Load Users';
const LOAD_USERS_SUCCESS = '[Users Page] Load Users Success';

export const loadUser = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users: User[]}>());

export const userActions = createActionGroup({
    source: 'Users Page',
    events: {
        'Add User Enter': props<{ user: User }>(),
        'Add User Success': props<{ user: User }>(),
        'Add User Failure': props<{ error: string }>(),
    }
})

export const dummyAction = createAction('[Users Page] Dummy')
