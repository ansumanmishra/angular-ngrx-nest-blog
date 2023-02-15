import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonService } from 'src/app/shared/services/common.service';
import { AppState } from 'src/app/store/app.state';
import { userActions } from '../state/user.action';
import { getSelectedUser } from '../state/user.state';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  template: `
    <button routerLink="/user" mat-button>Back</button>
    <form [formGroup]="addUserForm" class="form-container">
      <mat-form-field>
        <input matInput placeholder="Name" formControlName="name" />
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Age" formControlName="age" />
      </mat-form-field>
      <ng-container *ngIf="userId$ | async as userId; else addUserBlock">
        <button
          mat-raised-button
          (click)="addEditUser(userId)"
          [disabled]="!addUserForm.valid"
        >
          Edit User
        </button>
      </ng-container>

      <ng-template #addUserBlock>
        <button
          mat-raised-button
          (click)="addEditUser()"
          [disabled]="!addUserForm.valid"
        >
          Add User
        </button>
      </ng-template>

      <button mat-raised-button routerLink="/users">Cancel</button>
    </form>
  `,
  styles: [
    `
      .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  userId$ = this.commonService.userId$;

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly commonService: CommonService,
    private store: Store<AppState>
  ) {
    this.addUserForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(userActions.getSelectedUser());

    this.store.select(getSelectedUser).subscribe((user) => {
      if (user) {
        this.addUserForm.setValue({
          id: user.id,
          name: user.name,
          age: user.age,
        });
      }
    });
  }

  addEditUser(userId?: number) {
    this.userService.addEditUserEnter(this.addUserForm.value, userId);
    this.addUserForm.reset();
  }
}
