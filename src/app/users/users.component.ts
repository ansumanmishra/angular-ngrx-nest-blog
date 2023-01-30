import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';
import { AppState } from '../store/app.state';
import { getUser } from './state/user.action';
import { getUsers } from './state/user.state';

@Component({
  selector: 'app-users',
  template: `
    <ul *ngIf="users$ | async as users">
      <li *ngFor="let user of users">{{user.name}}</li>
    </ul>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  users$: Observable<User[]> = this.store.select(getUsers);

  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(getUser());
  }
}
