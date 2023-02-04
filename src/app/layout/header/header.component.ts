import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <p>
      <mat-toolbar color="primary">
        <span>NGRX Angular Blog</span>
        <span class="example-spacer"></span>
        <button mat-button class="example-icon favorite-icon" aria-label="Users" routerLink="user">
          Users
        </button>
        <button mat-button class="example-icon" aria-label="Articles" routerLink="">
          Articles
        </button>
      </mat-toolbar>
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
