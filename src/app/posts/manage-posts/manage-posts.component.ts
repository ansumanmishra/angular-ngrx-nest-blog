import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-manage-posts',
  template: `
    <p>
      manage-posts works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagePostsComponent {

}
