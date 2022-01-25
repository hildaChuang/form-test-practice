import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-by-reactive-form',
  templateUrl: './dynamic-form-by-reactive-form.component.html',
  styleUrls: ['./dynamic-form-by-reactive-form.component.css']
})
export class DynamicFormByReactiveFormComponent implements OnInit {

  form: FormGroup | undefined;

  get employeeAry(): FormArray {
    return this.form?.get('employee') as FormArray;
  }

  get isFormValid(): boolean {
    return this.employeeAry.controls.length > 0 && this.form.valid;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDebug(): void {
    console.log('---- onDebug ----');
    console.log('employee:', this.employeeAry);
    console.log('employee.value:', this.employeeAry.value);
    console.log('-----------------');
  }

  getErrorMsg(ctrlName: string, index: number): string {
    const control = this.employeeAry.at(index).get(ctrlName);
    if (!control || !control.errors || control.pristine) {
      return '';
    } else if (control.errors.required) {
      return 'REQUIRED!!';
    } else if (control.errors.minlength) {
      return 'Should greater than 2 char';
    } else if (control.errors.maxlength) {
      return 'Should less than 10 char';
    }
  }

  onAddGroup(): void {
    this.employeeAry.push(this.createFormGroup());
  }

  onRemoveGroup(index: number): void {
    this.employeeAry.removeAt(index);
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      employee: this.formBuilder.array([])
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10)
        ]
      ],
      gender: [null, Validators.required],
      age: [null, Validators.required]
    });
  }

}
