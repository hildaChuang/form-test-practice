import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'form-test-practice';

  form: FormGroup;

  get accountCtrl(): FormControl {
    return this.form.get('account') as FormControl;
  }

  get passwordCtrl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  onLogin(): void {
  }

  getErrorMsg(formCtrl: FormControl): string {
    let errorMsg: string;
    if (!formCtrl.errors || formCtrl.pristine) {
      errorMsg = '';
    } else if (formCtrl.errors.required) {
      errorMsg = 'REQUIRED!';
    } else if (formCtrl.errors.pattern) {
      errorMsg = 'Pattern Error';
    } else if (formCtrl.errors.minlength) {
      errorMsg = 'Password length must greater then 8';
    } else if (formCtrl.errors.maxlength) {
      errorMsg = 'Password length must less then 16';
    }
    return errorMsg;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      account: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/gi)
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.maxLength(16),
        ]
      ]
    });

  }
}
