import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { RouterStateUrl } from '../store/router/custom-route-serializer';
import { UserService } from '../users/user.service';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  template: `
    <div style=" display: flex; flex-direction: row; ">
      <div style="width: 70%">
        <ng-container *ngIf="posts$ | async as posts">
          <mat-card class="example-card" *ngFor="let post of posts">
            <mat-card-header>
              <mat-card-title>{{ post.article }}</mat-card-title>
              <mat-card-subtitle>{{ post.username }}</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <p>
                {{ post.desc }}
              </p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button (click)="editPost(post)">EDIT</button>
              <button mat-button (click)="deletePost(post.id)">DELETE</button>
            </mat-card-actions>
          </mat-card>
        </ng-container>
      </div>
      <div style="width: 2%"></div>
      <div>
        <app-manage-posts
          [selectedPost]="selectedPost$ | async"
          [users]="users$ | async"
          (cancelEditEvent)="cancelEditPost()"
          (createPostEvent)="createPost($event)"
        ></app-manage-posts>
      </div>
    </div>

    <!-- <button mat-raised-button color="primary" [routerLink]="['/add-post']"> Add a New Post</button> -->

    <!-- <h4>Current route details:</h4>
    {{ routeDetails$ | async | json }} -->

    <app-snackbar
      *ngIf="postMessage$ | async as message"
      [message]="message"
    ></app-snackbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      mat-card {
        width: 100%;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      }

      mat-card-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 16px;
        background-color: #eee;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      mat-card-title {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }

      mat-card-subtitle {
        font-size: 14px;
        color: #666;
        margin: 0;
      }

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      mat-card-content {
        padding: 16px;
      }

      mat-card-actions {
        padding: 16px;
        display: flex;
        justify-content: flex-end;
      }

      button {
        margin-left: 8px;
      }

      button[color='primary'] {
        color: #fff;
        background-color: #007bff;
      }

      button[color='primary']:hover {
        background-color: #0062cc;
      }

      button[color='warn'] {
        color: #fff;
        background-color: #dc3545;
      }

      button[color='warn']:hover {
        background-color: #c82333;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  posts$ = this.postsService.postsForSelectedUserId$;
  routeDetails$!: Observable<RouterStateUrl>;
  form!: FormGroup;
  selectedPost$ = this.postsService.selectedPost$;
  postMessage$ = this.postsService.postMessage$;
  users$ = this.userService.users$;

  constructor(
    private readonly postsService: PostsService,
    private readonly snackBar: MatSnackBar,
    private readonly userService: UserService
  ) {
    this.postsService.getPostsAction();
  }

  ngOnInit(): void {
    this.routeDetails$ = this.postsService.getRoutes();
    // this.postsService.onUserSelected(3);
  }

  createPost(post: Post) {
    this.postsService.addPost(post);
  }

  editPost(post: Post) {
    this.postsService.editPostEnter(post);
  }

  deletePost(id: number | undefined) {
    this.postsService.handleDeletePost(id);
  }

  cancelEditPost() {
    this.postsService.cancelEdit();
  }
}
