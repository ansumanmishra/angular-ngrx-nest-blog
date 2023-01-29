import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../shared/models/post.model';
import { getPosts } from './state/posts.actions';
import { posts, PostState } from './state/posts.state';

@Component({
  selector: 'app-posts',
  template: `
    <ul *ngIf="(posts$ | async) as posts">
      <li *ngFor="let post of posts">
        {{post.article}}
      </li>
    </ul>
      posts works!
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]> = this.store.select(posts);

  constructor(private readonly store: Store<PostState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(getPosts());
  }

}
