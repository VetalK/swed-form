import {Component, input, output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      class="button"
      [ngClass]="'button-' + color()"
      (click)="action.emit()"
      [disabled]="disabled()"
    >
      <ng-content></ng-content>
    </button>`,
  styleUrl: './button.component.scss',
  imports: [NgClass]
})
export class ButtonComponent {
  readonly color = input<'primary' | 'secondary' | 'warning' | 'error'>('primary')
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);

  protected readonly action = output<void>();
}
