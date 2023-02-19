import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: 'app-snackbar',
})
export class Snackbar implements OnChanges {
  @Input() message!: string;

  constructor(private readonly snackbar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.snackbar.open(this.message, undefined, { duration: 2000 });
  }
}
