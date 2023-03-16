import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.auth.loggedInUser$.pipe(
      map((user) => {
        if (user.name && user.email && user.token) {
          return true;
        } else {
          this.auth.logout();
          return false;
        }
      })
    );
  }
}
