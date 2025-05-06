import {Component, input} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" >
      <div class="header" [class.error]="hasError()"></div>
      <div class="body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './card.component.scss',
  imports: []
})
export class CardComponent {
  public hasError = input<boolean>();
}
