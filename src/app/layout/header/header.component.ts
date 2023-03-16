import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <p>
      <mat-toolbar color="primary">
        <span>NGRX Angular Blog</span>
        <span class="example-spacer"></span>
        <button
          mat-button
          class="example-icon favorite-icon"
          aria-label="Users"
          routerLink="users"
        >
          Users
        </button>
        <button
          mat-button
          class="example-icon"
          aria-label="Articles"
          routerLink="posts"
        >
          Articles
        </button>
        <span class="spacer"></span>
        <button
          mat-icon-button
          (click)="logout()"
          *ngIf="(loggedInUser$ | async)?.name"
        >
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>
    </p>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  loggedInUser$ = this.auth.loggedInUser$;

  constructor(private auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}
