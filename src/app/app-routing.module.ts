import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserContainerComponent } from './users/user-container.component';
import { UsersComponent } from './users/list-users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserContainerComponent,
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
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
