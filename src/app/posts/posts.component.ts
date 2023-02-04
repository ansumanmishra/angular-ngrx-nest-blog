import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { RouterStateUrl } from '../store/router/custom-route-serializer';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  template: `
    <div style=" display: flex; flex-direction: row; ">
      <div style="width: 70%">
        <ng-container *ngIf="(posts$ | async) as posts">
          <mat-card class="example-card" *ngFor="let post of posts">
            <mat-card-header>
              <div mat-card-avatar class="example-header-image"></div>
              <mat-card-title>{{post.article}}</mat-card-title>
            </mat-card-header>

            <mat-card-content>
              <p>
                {{post.desc}}
              </p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button>EDIT</button>
              <button mat-button (click)="deletePost(post.id)">DELETE</button>
            </mat-card-actions>
          </mat-card>
        </ng-container>
      </div>
      <div style="width: 2%"></div>
      <div>
        <form action="" [formGroup]="form" (ngSubmit)="createPost()">
          <mat-card>
            <mat-card-header>
                <div mat-card-avatar class="example-header-image"></div>
                <mat-card-title>Create a new article</mat-card-title>
            </mat-card-header>
            <mat-card-content>
                <p>
                  <mat-form-field appearance="fill">
                    <mat-label>Article title</mat-label>
                    <input type="text" matInput placeholder="Enter article title" formControlName="article" />
                  </mat-form-field>
                </p>
                <p>
                  <mat-form-field appearance="fill">
                    <mat-label>Article Description</mat-label>
                    <textarea matInput rows="5" formControlName="desc"></textarea>
                  </mat-form-field>
                </p>                            
            </mat-card-content>
            <mat-card-actions>
              <button mat-button type="submit">CREATE</button>
              <button mat-button>CANCEL</button>
            </mat-card-actions>
          </mat-card>
        </form>
      </div>
    </div>
    
    <!-- <button mat-raised-button color="primary" [routerLink]="['/add-post']"> Add a New Post</button> -->

    <h4>Current route details:</h4>
    {{routeDetails$ | async | json}}

    <router-outlet></router-outlet>
  `,
  styles: [`
    .example-card {
      border: 1px solid #d7c9c9;
      border-radius: 3px;
      margin-bottom: 20px;
    }  
    
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {

  posts$!: Observable<Post[]>;
  routeDetails$!: Observable<RouterStateUrl>;
  form!: FormGroup;
  
  constructor(private readonly postsService: PostsService, private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar) {
    this.postsService.getPostsAction();
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();    
    this.routeDetails$ = this.postsService.getRoutes();

    this.form = this.fb.group({
      article: [''],
      desc: [''],
    });

    this.postsService.postMessage$.subscribe( msg => {
      if (msg) {
        this.snackBar.open(msg!, undefined, {duration: 2000});
      }
    });
  }

  createPost() {
    const formValue: Post = this.form.value;
    this.postsService.addPost(formValue);
  }

  deletePost(id: number | undefined) {
    this.postsService.handleDeletePost(id);
  }

}
