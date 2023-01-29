import { createAction } from "@ngrx/store";

export const GET_USERS_ACTION = '[Users Page] Get Users';

export const getUser = createAction(GET_USERS_ACTION);