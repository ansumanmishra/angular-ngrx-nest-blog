import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthActions } from './state/auth.actions';
import { authError, userData } from './state/auth.selector';
import { AuthState } from './state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedInUser$ = this.store.select(userData);
  authError$ = this.store.select(authError);

  constructor(
    private readonly store: Store<AuthState>,
    private readonly http: HttpClient
  ) {}

  loginEnter({ email, password }: { email: string; password: string }) {
    this.store.dispatch(AuthActions.loginEnter({ email, password }));
  }

  login(email: string, password: string): Observable<AuthState> {
    return this.http.post<AuthState>(environment.baseUrl + '/auth', {
      email,
      password,
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
