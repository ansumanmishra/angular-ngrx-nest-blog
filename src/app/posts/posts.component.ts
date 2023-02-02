import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { RouterStateUrl } from '../store/router/custom-route-serializer';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  template: `
    <h2>Posts</h2>
    <ul *ngIf="(posts$ | async) as posts">
      <li *ngFor="let post of posts">
        {{post.article}}
      </li>
    </ul>

    <form action="" [formGroup]="form" (ngSubmit)="createPost()">
      <input type="text" formControlName="article" />
      <textarea name="" id="" cols="30" rows="10" formControlName="desc"></textarea>
      <button mat-button type="submit">CREATE</button>
    </form>
    
    <!-- <button mat-raised-button color="primary" [routerLink]="['/add-post']"> Add a New Post</button> -->

    <h4>Current route details:</h4>
    {{routeDetails$ | async | json}}
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  routeDetails$!: Observable<RouterStateUrl>;
  form!: FormGroup;
  
  constructor(private readonly postsService: PostsService, private readonly fb: FormBuilder) {
    this.postsService.getPostsAction();
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();    
    this.routeDetails$ = this.postsService.getRoutes();

    this.form = this.fb.group({
      article: [''],
      desc: [''],
    })
  }

  createPost() {
    const formValue: Post = this.form.value;
    this.postsService.addPost(formValue);
  }

}
