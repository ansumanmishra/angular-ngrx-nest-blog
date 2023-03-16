import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserContainerComponent } from './users/user-container.component';
import { UsersComponent } from './users/list-users/users.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    component: UserContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'add',
        component: AddUserComponent,
      },
      {
        path: 'edit/:id',
        component: AddUserComponent,
      },
    ],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
