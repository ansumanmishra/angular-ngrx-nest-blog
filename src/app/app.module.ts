import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { UsersComponent } from './users/users.component';
import { userReducer } from './users/state/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { USERS_STATE_NAME } from './users/state/user.state';
import { PostsComponent } from './posts/posts.component';
import { postsReducer } from './posts/state/posts.reducer';
import { POSTS_STATE_NAME } from './posts/state/posts.state';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      [USERS_STATE_NAME]: userReducer,
      [POSTS_STATE_NAME]: postsReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
