import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/shared/models/features.model';
import { User } from '../../shared/models/user.model';

export interface UserState extends EntityState<User> {
  selectedUser: User | undefined;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const userInitialState: UserState = adapter.getInitialState({
  selectedUser: undefined,
});

export const USERS_STATE_NAME = Features.User;

const getUsersState = createFeatureSelector<UserState>(USERS_STATE_NAME);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const getSelectedUserId = (state: UserState) => state.selectedUser;

export const selectAllUsers = createSelector(getUsersState, selectAll);
export const selectedUser = createSelector(getUsersState, getSelectedUserId);
