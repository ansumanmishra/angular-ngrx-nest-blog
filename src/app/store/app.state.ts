import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { User } from "../shared/models/user.model";
import { userReducer } from "../users/state/user.reducer";
import { USERS_STATE_NAME } from "../users/state/user.state";

export interface AppState {
    [USERS_STATE_NAME]: User[];
    router: RouterReducerState<any>;
}

export const appReducer = {
    [USERS_STATE_NAME]: userReducer,
    router: routerReducer
}