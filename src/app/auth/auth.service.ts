import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthActions } from './state/auth.actions';
import { token } from './state/auth.selector';
import { AuthState } from './state/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly store: Store<AuthState>) {
    this.store.select(token).subscribe(console.log);
  }

  loginEnter({ email, password }: { email: string; password: string }) {
    this.store.dispatch(AuthActions.loginEnter({ email, password }));
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return of({ token: 'token' });
  }
}
