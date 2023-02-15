import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { getCurrentRoute } from 'src/app/store/router/router.selector';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userId$ = this.store
    .select(getCurrentRoute)
    .pipe(map((route) => route.params['id']));
  constructor(private readonly store: Store<AppState>) {}
}
