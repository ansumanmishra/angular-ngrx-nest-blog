import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthActions } from './state/auth.actions';
import { token, userData } from './state/auth.selector';
import { AuthState } from './state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser$ = this.store.select(userData);

  constructor(private readonly store: Store<AuthState>) {
    console.log('AuthService constructor');
    this.store.dispatch(AuthActions.pageEnter());
  }

  loginEnter({ email, password }: { email: string; password: string }) {
    this.store.dispatch(AuthActions.loginEnter({ email, password }));
  }

  login(email: string, password: string): Observable<AuthState> {
    const loggedInUser: AuthState = {
      name: 'John Doe',
      email: 'john@test.com',
      token: 'token',
    };
    return of(loggedInUser);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
