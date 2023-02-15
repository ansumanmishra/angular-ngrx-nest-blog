import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

const LOAD_USERS = '[Users Page] Load Users';
const LOAD_USERS_SUCCESS = '[Users Page] Load Users Success';

export const loadUser = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(
  LOAD_USERS_SUCCESS,
  props<{ users: User[] }>()
);

export const userActions = createActionGroup({
  source: 'Users Page',
  events: {
    'Add User Enter': props<{ user: User }>(),
    'Add User Success': props<{ users: User[] }>(),
    'Add User Failure': props<{ error: string }>(),
    'Get Selected User': emptyProps(),
    'Get Selected User Success': props<{ user: User }>(),
    'Get Selected User Failuer': props<{ error: string }>(),
    'Edit User Enter': props<{ user: User }>(),
    'Edit User Success': props<{ user: User }>(),
    'Edit User Failure': props<{ error: string }>(),
  },
});

export const dummyAction = createAction('[Users Page] Dummy');
