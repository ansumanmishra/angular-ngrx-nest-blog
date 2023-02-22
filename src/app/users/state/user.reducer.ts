import { UpdateNum } from '@ngrx/entity/src/models';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';
import { loadUsersSuccess, userActions, userApiActions } from './user.action';
import { adapter, userInitialState } from './user.state';

export const userReducer = createReducer(
  userInitialState,
  on(loadUsersSuccess, (state, action) => {
    return adapter.setAll(action.users, state);
  }),
  on(userActions.addUserSuccess, (state, action) => {
    return adapter.addOne(action.user, state);
  }),
  on(userActions.getSelectedUserSuccess, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
    };
  }),
  on(userActions.editUserSuccess, (state, action) => {
    const update: UpdateNum<User> = {
      id: action.user.id,
      changes: action.user,
    };
    return adapter.updateOne(update, state);
  }),
  on(userApiActions.deleteUserSuccess, (state, action) => {
    return adapter.removeOne(action.userId, state);
  })

  // OLD WAY
  //   on(userActions.editUserSuccess, (state, action) => {
  //     return {
  //       ...state,
  //       users: state.users.map((user) => {
  //         if (user.id === action.user.id) {
  //           return {
  //             ...user,
  //             name: action.user.name,
  //             age: action.user.age,
  //           };
  //         } else {
  //           return user;
  //         }
  //       }),
  //     };
  //   })
);
