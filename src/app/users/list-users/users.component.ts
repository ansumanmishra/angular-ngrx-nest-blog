import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/user.model';
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
        font-family: Arial, sans-serif;
        font-size: 14px;
      }

      .table th,
      .table td {
        padding: 8px;
        text-align: left;
        vertical-align: top;
        border: 1px solid #ddd;
      }

      .table th {
        background-color: #f2f2f2;
        font-weight: bold;
        color: #444;
        text-transform: uppercase;
      }

      .table tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      .mat-icon {
        margin-right: 8px;
        vertical-align: middle;
      }

      button {
        cursor: pointer;
        display: inline-block;
        padding: 8px 16px;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #444;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        text-decoration: none;
        transition: background-color 0.2s ease;
      }

      button:hover {
        background-color: #f9f9f9;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  displayedColumns = ['number', 'name', 'age', 'viewPosts', 'action'];
  dataSource$: Observable<User[]> = this.userService.users$;

  constructor(
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

  deleteUser(id: number) {
    this.userService.deleteEnter(id);
  }
}
