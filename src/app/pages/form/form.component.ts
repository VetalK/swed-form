import {Component, computed, inject, signal} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {StepperComponent} from '../../components/stepper/stepper.component';
import {StepComponent} from '../../components/stepper/step/step.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: 'form.component.scss',
  imports: [CardComponent, StepperComponent, StepComponent, ReactiveFormsModule]
})
export class FormComponent {
  private readonly fb = inject(FormBuilder);

  public readonly mainForm = this.fb.nonNullable.group({
    product: ['', Validators.required],
    insurance: [false],
    sms_alerts: [false],
    branch: ['', Validators.required],
    notes: ['', Validators.required],
    referral: ['', Validators.required],
  });
  public readonly isProductStepComplete = toSignal(this.mainForm.controls.product.valueChanges.pipe(map(value => !!value)), {initialValue: false});
  public readonly isInsuranceStepInvalid = toSignal(this.mainForm.controls.insurance.valueChanges.pipe(map(value => value)), {initialValue: false});
  public readonly isSmsAlertStepComplete = toSignal(this.mainForm.controls.sms_alerts.valueChanges.pipe(map(value => value)), {initialValue: false});
  public readonly isBranchStepComplete = toSignal(this.mainForm.controls.branch.valueChanges.pipe(map(value => !!value)), {initialValue: false});
  public readonly isNotesStepComplete = toSignal(this.mainForm.controls.notes.valueChanges.pipe(map(value => !!value)), {initialValue: false});
  public readonly isReferralStepComplete = toSignal(this.mainForm.controls.referral.valueChanges.pipe(map(value => !!value)), {initialValue: false});
  public readonly errorIndex = signal<null | number>(null);

  public stepCompletionStatus = computed(() => {
    return {
      1: true,
      2: this.isProductStepComplete(),
      3: this.isInsuranceStepInvalid() || this.isSmsAlertStepComplete(),
      4: this.isBranchStepComplete(),
      5: this.isNotesStepComplete(),
      6: this.isReferralStepComplete(),
    }
  })

  protected setError(value: number | null) {
    this.errorIndex.set(value);
  }

}
