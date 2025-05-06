import {AfterContentInit, Component, ContentChildren, input, output, QueryList, signal, ViewChildren} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {BehaviorSubject} from 'rxjs';
import {StepComponent} from './step/step.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  imports: [ButtonComponent],
})
export class StepperComponent implements AfterContentInit {
  public stepCompletionStatus = input.required<{ [key: number]: boolean }>();

  public cancelNextStep = output<null | number>()

  public currentStep = 1;
  public steps: unknown[] = [];
  readonly stepChanges$ = new BehaviorSubject<number>(this.currentStep);

  @ContentChildren(StepComponent) stepComponents!: QueryList<StepComponent>;

  ngAfterContentInit(): void {
    this.steps = this.stepComponents.toArray().map(step => step.elementRef.nativeElement);
    this.updateStepVisibility();
  }

  registerStep(stepElement: unknown): void {
    if (!this.steps.includes(stepElement)) {
      this.steps.push(stepElement);
    }
  }

  public unregisterStep(stepElement: unknown): void {
    this.steps = this.steps.filter(el => el !== stepElement);
    this.updateStepVisibility();
  }

  public nextStep(): void {
    if (!this.stepCompletionStatus()[this.currentStep]) {
      this.cancelNextStep.emit(this.currentStep)
      return
    }
    this.cancelNextStep.emit(null)

    if (this.currentStep < this.steps.length) {
      this.currentStep++;
      this.stepChanges$.next(this.currentStep);
      this.updateStepVisibility();
    }
  }

  public prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepChanges$.next(this.currentStep);
      this.updateStepVisibility();
    }
  }

  private updateStepVisibility(): void {
    this.stepComponents.forEach((stepComponent, index) => {
      stepComponent.isActive.set(index + 1 === this.currentStep);
    });
  }

}
