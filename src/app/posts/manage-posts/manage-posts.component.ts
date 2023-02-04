import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/shared/models/post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-manage-posts',
  template: `
    <form action="" [formGroup]="form" (ngSubmit)="createPost()">
      <input type="text" formControlName="article" />
      <textarea name="" id="" cols="30" rows="10" formControlName="desc"></textarea>
      <button mat-button type="submit">CREATE</button>
    </form>
    
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagePostsComponent implements OnInit {
  form!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly postsService: PostsService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      article: [''],
      desc: [''],
    });
  }

  createPost() {
    const formValue: Post = this.form.value;
    this.postsService.addPost(formValue);
  }
}
