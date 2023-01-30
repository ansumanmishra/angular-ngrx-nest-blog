import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.action";
import { userInitialState } from "./user.state";

export const userReducer = createReducer(
    userInitialState,
    on(UserActions.loadUsersSuccess, (state, action) => {        
        return {
            ...state,
            users: action.users
        }
    })
)