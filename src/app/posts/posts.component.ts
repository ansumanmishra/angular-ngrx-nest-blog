import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { RouterStateUrl } from '../store/router/custom-route-serializer';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  template: `
    <div style=" display: flex; flex-direction: row; ">
      <div style="width: 70%">
        <ng-container *ngIf="posts$ | async as posts">
          <mat-card class="example-card" *ngFor="let post of posts">
            <mat-card-header>
              <div mat-card-avatar class="example-header-image"></div>
              <mat-card-title>{{ post.article }}</mat-card-title>
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
          (cancelEditEvent)="cancelEditPost()"
          (createPostEvent)="createPost($event)"
        ></app-manage-posts>
      </div>
    </div>

    <!-- <button mat-raised-button color="primary" [routerLink]="['/add-post']"> Add a New Post</button> -->

    <h4>Current route details:</h4>
    {{ routeDetails$ | async | json }}

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .example-card {
        border: 1px solid #d7c9c9;
        border-radius: 3px;
        margin-bottom: 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  routeDetails$!: Observable<RouterStateUrl>;
  form!: FormGroup;
  selectedPost$ = this.postsService.selectedPost$;

  constructor(
    private readonly postsService: PostsService,
    private readonly snackBar: MatSnackBar
  ) {
    this.postsService.getPostsAction();
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
    this.routeDetails$ = this.postsService.getRoutes();

    this.postsService.postMessage$.subscribe((msg) => {
      if (msg) {
        this.snackBar.open(msg!, undefined, { duration: 2000 });
      }
    });
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
