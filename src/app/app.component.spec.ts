import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * 測試集合 (Test suite)；作用域 (Scoping)
 * @param 1 test suite description
 * @param 2 test case
 */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  /**
   * beforeAll - 在執行 所有 測試案例之前，會先執行這裡面的程式碼。
   * beforeEach - 在執行 每一個 測試案例之前，會先執行這裡面的程式碼。
   * afterAll - 在執行 所有 測試案例之後，會先執行這裡面的程式碼。
   * afterEach - 在執行 每一個 測試案例之後，會先執行這裡面的程式碼。
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  /**
   * it: 測試案例 (Test case)
   * @param 1 test case description
   * @param 2 execute test case code
   */
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('Unit test', () => {
    describe('getErrorMsg', () => {
      it('should get empty string when the value is correct', () => {
        // Arrange
        const formControl = new FormControl('');
        const expectMsg = '';
        // Action
        const message = component.getErrorMsg(formControl);
        // Assert
        expect(message).toBe(expectMsg);
      });

      it('should get empty string when the value is empty and the formControl is pristine', () => {
        const formControl = new FormControl('', Validators.required);
        const expectMsg = '';
        const message = component.getErrorMsg(formControl);
        expect(message).toBe(expectMsg);
      });

      it('should get "REQUIRED!" when the value is empty string and formControl status is dirty', () => {
        const formControl = new FormControl('', Validators.required);
        const expectMsg = 'REQUIRED!';

        formControl.markAsDirty();
        const message = component.getErrorMsg(formControl);

        expect(message).toBe(expectMsg);
      });

      it('should get "Pattern Error" when the value is "anything"', () => {
        const pattern = '/^\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b$/gi';
        const formControl = new FormControl(
          'anything',
          Validators.pattern(pattern)
        );
        const expectMsg = 'Pattern Error';
        formControl.markAsDirty();

        const message = component.getErrorMsg(formControl);
        expect(message).toBe(expectMsg);
      });

      it('should get "Password length must greater then 8" when the value is "abcd"', () => {
        const formControl = new FormControl('abcd', Validators.minLength(8));
        const expectMsg = 'Password length must greater then 8';

        formControl.markAsDirty();
        const message = component.getErrorMsg(formControl);

        expect(message).toBe(expectMsg);
      });

      it('should get "Password length must less then 16" when the value is "abcde12345abcde12345"', () => {
        const formControl = new FormControl('abcde12345abcde12345', Validators.maxLength(16));
        const expectMsg = 'Password length must less then 16';

        formControl.markAsDirty();
        const message = component.getErrorMsg(formControl);

        expect(message).toBe(expectMsg);
      });
    });

    describe('formGroup', () => {
      it('should be undefined before initial', () => {
        expect(component.form).toBeFalsy();
      });

      describe('after initial', () => {
        beforeEach(() => {
          fixture.detectChanges();
        });

        it('should be instance of FormGroup', () => {
          expect(component.form).toBeInstanceOf(FormGroup);
        });

        it('should have two form controls', () => {
          const formControls = component.form.controls;
          const controlLength = Object.keys(formControls).length;

          expect(controlLength).toBe(2);
        });

        describe('accountFormControl', () => {
          it('should have the required validator', () => {
            const error = component.accountCtrl.errors;
            expect(error.required).toBeTrue();
          });

          it('should have the pattern validator', () => {
            component.accountCtrl.setValue('abc');
            const error = component.accountCtrl.errors;
            const expectPattern = '/^\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b$/gi';

            expect(error.pattern.requiredPattern).toBe(expectPattern);
          });
        });

        describe('passwordFormControl', () => {
          it('should have the required validator', () => {
            const error = component.passwordCtrl.errors;
            expect(error.required).toBeTrue();
          });

          it('should have the minlength validator', () => {
            component.passwordCtrl.setValue('123');
            const error = component.passwordCtrl.errors;

            expect(error.minlength.requiredLength).toBe(8);
          });

          it('should have the maxlength validator', () => {
            component.passwordCtrl.setValue('1234567890abcdefg');
            const error = component.passwordCtrl.errors;

            expect(error.maxlength.requiredLength).toBe(16);
          });
        });
      });
    });
  });

  describe('Integration test', () => {
    let compiledElement: HTMLElement;

    beforeEach(() => {
      // 讓 Angular 將畫面進行渲染
      fixture.detectChanges();
      // 取得渲染後的元素
      compiledElement = fixture.nativeElement;
    });

    describe('account input field', () => {
      let accountInputElement: HTMLInputElement;

      beforeEach(() => {
        accountInputElement = compiledElement.querySelector('#account');
      });

      it('should have attribute "type", and the value is "email"', () => {
        const attrName = 'type';
        const attrValue = 'email';

        expect(accountInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should binding with formControl "accountCtrl"', () => {
        const account = 'anything';

        component.accountCtrl.patchValue(account);
        fixture.detectChanges();

        expect(accountInputElement.value).toBe(account);
      });
    });

    describe('password input field', () => {
      let passwordElement: HTMLInputElement;

      beforeEach(() => {
        passwordElement = compiledElement.querySelector('#password');
      });

      it('should have attribute "type", and the value is "password"', () => {
        const attrName = 'type';
        const attrValue = 'password';

        expect(passwordElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should binding with formControl "passwordCtrl"', () => {
        const password = '123456789';

        component.passwordCtrl.patchValue(password);
        fixture.detectChanges();

        expect(passwordElement.value).toBe(password);
      });
    });

    describe('error message', () => {
      it('should binding error message "REQUIRED!" whit the error of "accountCtrl"', () => {
        const account = '';
        const expectMsg = 'REQUIRED!';
        const targetElement = compiledElement.querySelector('#account + .error-message');

        component.accountCtrl.setValue(account);
        component.accountCtrl.markAsDirty();
        fixture.detectChanges();

        expect(targetElement?.textContent).toBe(expectMsg);
      });

      it('should binding error message "Password length must greater then 8" with the error of "passwordCtrl"', () => {
        const password = '1234';
        const expectMsg = 'Password length must greater then 8';
        const targetElement = compiledElement.querySelector('#password + .error-message');

        component.passwordCtrl.setValue(password);
        component.passwordCtrl.markAsDirty();
        fixture.detectChanges();

        expect(targetElement?.textContent).toBe(expectMsg);
      });
    });

    describe('Login button', () => {
      let buttonElement: HTMLButtonElement;
      beforeEach(() => {
        buttonElement = compiledElement.querySelector('button');
      });

      it('should have attribute "type", and the value is "submit"', () => {
        const attrName = 'type';
        const attrValue = 'submit';

        expect(buttonElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "disabled" when form status is invalid', () => {
        const attrName = 'disabled';

        expect(buttonElement.hasAttribute(attrName)).toBeTrue();
      });

      describe('form status is valid', () => {
        beforeEach(() => {
          component.accountCtrl.setValue('abc@example.com');
          component.passwordCtrl.setValue('1234asdf');
          fixture.detectChanges();
        });

        it('should not have attribute "disabled" when form status is valid', () => {
          const attrName = 'disabled';

          expect(buttonElement.hasAttribute(attrName)).toBeFalsy();
        });

        it('should trigger function "onLogin" after click button', () => {
          spyOn(component, 'onLogin');
          buttonElement.click();
          expect(component.onLogin).toHaveBeenCalled();
        });
      });

    });
  });

});
