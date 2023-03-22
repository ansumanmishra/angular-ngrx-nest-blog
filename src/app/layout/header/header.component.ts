import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <p>
      <mat-toolbar color="primary">
        <span
          ><a routerLink="/" style="color: #ffffff;">NGRX Angular Blog</a></span
        >
        <span class="example-spacer"></span>
        <button
          mat-button
          class="example-icon favorite-icon"
          aria-label="Users"
          routerLink="users"
          *ngIf="(loggedInUser$ | async)?.name"
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
          *ngIf="(loggedInUser$ | async)?.name; else login"
        >
          <mat-icon>logout</mat-icon>
        </button>
        <ng-template #login>
          <button mat-icon-button routerLink="/login">
            <mat-icon>login</mat-icon>
          </button>
        </ng-template>
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
