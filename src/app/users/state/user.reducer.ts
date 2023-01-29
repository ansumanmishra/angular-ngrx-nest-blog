import { createReducer, on } from "@ngrx/store";
import { User } from "../shared/models/user.model";
import { getUser } from "./user.action";
import { userInitialState } from "./user.state";

const users: User[] = [
    {
      name: 'bryan',
      age: 25
    },
    {
      name: 'nicole',
      age: 26
    }
  ]

export const userReducer = createReducer(
    userInitialState,
    on(getUser, (state) => {        
        return {
            ...state,
            users: users
        }
    })
)