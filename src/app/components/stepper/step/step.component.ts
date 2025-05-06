import {Component, ElementRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {StepperComponent} from '../stepper.component';

@Component({
  selector: 'app-step',
  template: `
    <div class="form-step" [class.active]="isActive()">
        <ng-content></ng-content>
    </div>`,
  styles: `
    .form-step {
      display: none;
      padding: 20px;

      &.active {
        display: block;
      }
    }`,
})
export class StepComponent implements OnInit, OnDestroy {
  private readonly stepper: StepperComponent = inject(StepperComponent, {host: true})
  readonly elementRef: ElementRef = inject(ElementRef);

  public readonly isActive = signal(false);

  private readonly destroy$ = new Subject<void>();


  ngOnInit(): void {
    this.stepper.stepChanges$
    .pipe(takeUntil(this.destroy$))
    .subscribe((currentStep: any) => {
      this.isActive.set(currentStep === this.stepper.steps.indexOf(this.elementRef.nativeElement) + 1);
    });

    this.stepper.registerStep(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stepper.unregisterStep(this.elementRef.nativeElement);
  }
}
