import { Component, ViewChild } from '@angular/core';
import { NgModel, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('accountNgModel') accountNgModelRef: NgModel;

  title = 'form-test-practice';

  account = '';
  password = '';
  accountErrorMsg = '';
  passwordErrorMsg = '';

  onChangeAccount(account: string, errors: ValidationErrors): void {
    this.account = account;
    this.validationCheck(errors, 'account');
  }

  onChangePassword(password: string, errors: ValidationErrors): void {
    this.password = password;
    this.validationCheck(errors, 'password');
  }

  onLogin(): void {
  }

  private validationCheck(
    errors: ValidationErrors,
    fieldName: 'account' | 'password'
  ): void {
    let errorMsg = '';
    if (!errors) {
      errorMsg = '';
    } else if (errors.required) {
      errorMsg = 'REQUIRED!';
    } else if (errors.pattern) {
      errorMsg = 'Pattern Error';
    } else if (errors.minlength) {
      errorMsg = 'Password length must greater then 8';
    }
    this.setErrorMessage(fieldName, errorMsg);
  }

  private setErrorMessage(
    fieldName: 'account' | 'password',
    errorMsg: string,
  ): void {
    if (fieldName === 'account') {
      this.accountErrorMsg = errorMsg;
    } else {
      this.passwordErrorMsg = errorMsg;
    }
  }
}
