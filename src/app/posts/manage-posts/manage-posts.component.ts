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
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-manage-posts',
  template: `
    <form action="" [formGroup]="form" (ngSubmit)="createPost()">
      <mat-card>
        <mat-card-header>
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
          <p>
            <mat-form-field>
              <mat-label>Select User</mat-label>
              <mat-select formControlName="userId">
                <mat-option *ngFor="let user of users" [value]="user.id">
                  {{ user.name }}
                </mat-option>
              </mat-select>
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
  styles: [
    `
      mat-card {
        width: 100%;
        margin: 0;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      }

      mat-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background-color: #eee;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      mat-card-title {
        font-size: 24px;
        margin: 0;
      }

      mat-card-subtitle {
        font-size: 14px;
        color: #666;
        margin: 0;
      }

      mat-form-field {
        width: 100%;
        margin: 16px;
      }

      mat-label {
        font-size: 16px;
        color: #333;
      }

      mat-icon {
        color: #666;
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
export class ManagePostsComponent implements OnInit, OnChanges {
  form!: FormGroup;

  @Input() selectedPost!: Post | null | undefined;
  @Input() users!: User[] | null;
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
      userId: ['', Validators.required],
    });
  }

  syncForm() {
    if (this.selectedPost) {
      this.form.setValue({
        id: this.selectedPost?.id,
        article: this.selectedPost?.article,
        desc: this.selectedPost?.desc,
        userId: this.selectedPost?.userId,
      });
    } else {
      this.form.setValue({
        id: '',
        article: '',
        desc: '',
        userId: '',
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
