import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loadUser } from './users/state/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ngrx-blog';

  constructor(private readonly store: Store<AppState>) {
    this.store.dispatch(loadUser());
  }
}
