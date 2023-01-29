import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  template: `
    <ul *ngIf="(posts$ | async) as posts">
      <li *ngFor="let post of posts">
        {{post.article}}
      </li>
    </ul>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private readonly postsService: PostsService) {
    this.postsService.getPostsAction();
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
  }

}
