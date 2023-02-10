import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-manage-posts',
  template: `
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
              <input
                type="text"
                matInput
                placeholder="Enter article title"
                formControlName="article"
              />
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
          <button mat-button type="submit" [disabled]="!form.valid">
            {{ selectedPost ? 'EDIT' : 'CREATE' }}
          </button>
          <button mat-button type="button" (click)="cancelEditPost()">
            CANCEL
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePostsComponent implements OnInit, OnChanges {
  form!: FormGroup;

  @Input() selectedPost!: Post | null | undefined;
  @Output() cancelEditEvent: EventEmitter<void> = new EventEmitter();
  @Output() createPostEvent: EventEmitter<Post> = new EventEmitter();

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedPost'].currentValue !==
      changes['selectedPost'].previousValue
    ) {
      this.syncForm();
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      id: [''],
      article: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  syncForm() {
    if (this.selectedPost) {
      this.form.setValue({
        id: this.selectedPost?.id,
        article: this.selectedPost?.article,
        desc: this.selectedPost?.desc,
      });
    } else {
      this.form.setValue({
        id: '',
        article: '',
        desc: '',
      });
    }
  }

  createPost() {
    const formValue: Post = this.form.value;
    this.createPostEvent.emit(formValue);

    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  cancelEditPost() {
    this.cancelEditEvent.emit();
  }
}
