import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';
import { AppState } from '../store/app.state';
import { loadUser } from './state/user.action';
import { getUsers } from './state/user.state';

@Component({
  selector: 'app-users',
  template: `
    <mat-table class="table" [dataSource]="dataSource$">
      <ng-container matColumnDef="number">
        <mat-header-cell *matHeaderCellDef> # </mat-header-cell>
        <mat-cell *matCellDef="let element; let i = index"> {{i + 1}} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.name}} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="age">
        <mat-header-cell *matHeaderCellDef> Age </mat-header-cell>
        <mat-cell *matCellDef="let element"> {{element.age}} </mat-cell>
      </ng-container>

      <ng-container matColumnDef="viewPosts">
        <mat-header-cell *matHeaderCellDef> View Posts </mat-header-cell>
        <mat-cell *matCellDef="let element">
          <button mat-raised-button (click)="viewPosts(element)">View Posts</button>
        </mat-cell>
      </ng-container>

      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>

  `,
  styles: [`
    .table {
      width: 100%;
      border-collapse: collapse;
    }

    .table th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
    }

    .table th {
      background-color: #f2f2f2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  displayedColumns = ['number', 'name', 'age', 'viewPosts'];
  dataSource$: Observable<User[]> = this.store.select(getUsers);

  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(loadUser());
  }

  viewPosts(_t45: any) {
    throw new Error('Method not implemented.');
  }
}
