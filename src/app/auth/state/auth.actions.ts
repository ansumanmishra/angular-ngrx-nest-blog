import { createActionGroup, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login enter': props<{ email: string; password: string }>(),
    'Login success': props<{ token: string }>(),
    'Login failure': props<{ error: string }>(),
  },
});
