import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, userActions } from './user.action';
import { adapter, userInitialState } from './user.state';

export const userReducer = createReducer(
  userInitialState,
  on(loadUsersSuccess, (state, action) => {
    return adapter.setAll(action.users, state);
  }),
  on(userActions.addUserSuccess, (state, action) => {
    return {
      ...state,
      users: [...action.users],
    };
  }),
  on(userActions.getSelectedUserSuccess, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
    };
  })
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
