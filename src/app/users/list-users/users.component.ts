import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../shared/models/post.model';

import { User } from '../../shared/models/user.model';
import { AppState } from '../../store/app.state';
import { loadUser } from '../state/user.action';
import {
  selectAll,
  selectAllUsers,
  selectTotal,
  UserState,
} from '../state/user.state';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  template: `
    <button mat-button routerLink="/users/add">Add New User</button>
    <mat-table class="table" [dataSource]="dataSource$">
      <ng-container matColumnDef="number">
        <mat-header-cell *matHeaderCellDef> # </mat-header-cell>
        <mat-cell *matCellDef="let element; let i = index">
          {{ i + 1 }}
        </mat-cell>
      </ng-container>

      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.name }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="age">
        <mat-header-cell *matHeaderCellDef> Age </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{ element.age }} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="viewPosts">
        <mat-header-cell *matHeaderCellDef> View Posts </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <button mat-raised-button (click)="viewPosts(element)">
            View Posts
          </button>
        </mat-cell>
      </ng-container>

      <ng-container matColumnDef="action">
        <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <button mat-raised-button (click)="editUser(element.id)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-raised-button (click)="deleteUser(element.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns"></mat-row>
    </mat-table>
  `,
  styles: [
    `
      .table {
        width: 100%;
        border-collapse: collapse;
      }

      .table th,
      td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }

      .table th {
        background-color: #f2f2f2;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  displayedColumns = ['number', 'name', 'age', 'viewPosts', 'action'];
  dataSource$: Observable<User[]> = this.userService.users$;

  constructor(
    private readonly store: Store<UserState>,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  viewPosts(user: User) {
    // console.log(post);
    //this.router.navigate(['posts', {id: user.}]);
  }

  editUser(id: string) {
    this.router.navigate(['users/edit', id]);
  }

  deleteUser(id: string) {}
}
