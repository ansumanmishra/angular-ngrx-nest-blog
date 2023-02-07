import { createReducer, on } from "@ngrx/store";
import { loadUsersSuccess, userActions } from "./user.action";
import { userInitialState } from "./user.state";

export const userReducer = createReducer(
    userInitialState,
    on(loadUsersSuccess, (state, action) => {        
        return {
            ...state,
            users: action.users
        }
    }),
    on(userActions.addUserSuccess, (state, action) => {
        return {
            ...state,
            users: [...state.users, action.user]
        }
    })
)