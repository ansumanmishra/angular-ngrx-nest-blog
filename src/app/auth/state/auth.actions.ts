import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Page enter': emptyProps(),
    'Login enter': props<{ email: string; password: string }>(),
    'Login success': props<{ user: AuthState }>(),
    'Login failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
  },
});
