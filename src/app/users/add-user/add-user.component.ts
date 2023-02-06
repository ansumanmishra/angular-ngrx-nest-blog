import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  template: `
    <form [formGroup]="addUserForm" class="form-container">
      <mat-form-field>
        <input matInput placeholder="Name" formControlName="name">
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="Age" formControlName="age">
      </mat-form-field>

      <button mat-raised-button (click)="addUser()" [disabled]="!addUserForm.valid">Add User</button>
    </form>

  `,
  styles: [`
    .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent {
  addUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly userService: UserService) {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  addUser() {
    this.userService.addUserEnter(this.addUserForm.value);
    this.addUserForm.reset();
  }
}
