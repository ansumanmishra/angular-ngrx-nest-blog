import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './store/app.state';
import { UserEffects } from './users/state/user.effects';
import { UsersComponent } from './users/list-users/users.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-route-serializer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './users/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserContainerComponent } from './users/user-container.component';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './auth/state/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserContainerComponent,
    HeaderComponent,
    AddUserComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
