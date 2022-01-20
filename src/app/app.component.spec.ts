import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// 單元測試要驗證的是某一函式在不同情況下的執行結果是否符合預期
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
    // TestBed.configureTestingModule 來模擬真實使用情境
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ]
      // compileComponents 實際執行
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

  describe('Unit testing', () => {

    describe('onChangeAccount', () => {

      it('should set account value', () => {
        // Arrange
        const account = 'test@example.com';
        const errors = null;
        // Act
        component.onChangeAccount(account, errors);
        // Assert
        expect(component.account).toBe(account);
      });

      it('should set the required error message into "accountErrorMsg" when account value is empty', () => {
        // Arrange
        const account = null;
        const errors = {required: true};
        const errorMsg = 'REQUIRED!';
        // Act
        component.onChangeAccount(account, errors);
        // Assert
        expect(component.accountErrorMsg).toBe(errorMsg);
      });

      it('should set the pattern error message into "accountErrorMsg" when account pattern is not correct', () => {
        // Arrange
        const account = 'test123';
        const errors = {
          pattern: {
            actualValue: 'test123',
            requiredPattern: '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b',
          },
        };
        const errorMsg = 'Pattern Error';
        // Act
        component.onChangeAccount(account, errors);
        // Assert
        expect(component.accountErrorMsg).toBe(errorMsg);
      });

      it('should set empty string error message into "accountErrorMsg" when account is correct', () => {
        // Arrange
        const account = 'test123@example.com';
        const errors = null;
        const errorMsg = '';
        // Act
        component.onChangeAccount(account, errors);
        // Assert
        expect(component.accountErrorMsg).toBe(errorMsg);
      });

    });

    describe('onChangePassword', () => {

      it('should set password value', () => {
        // Arrange
        const password = 'abcd12345';
        const errors = null;
        // Act
        component.onChangePassword(password, errors);
        // Assert
        expect(component.password).toBe(password);
      });

      it('should set the required error message into "passwordErrorMsg" when password value is empty', () => {
        // Arrange
        const password = null;
        const errors = {required: true};
        const errorMsg = 'REQUIRED!';
        // Act
        component.onChangePassword(password, errors);
        // Assert
        expect(component.passwordErrorMsg).toBe(errorMsg);
      });

      it('should set the minlength error message into "passwordErrorMsg" when password length is less than 8', () => {
        // Arrange
        const password = 'test123';
        const errors = {
          minlength: {
            actualLength: 7,
            requiredLength: 8,
          },
        };
        const errorMsg = 'Password length must greater then 8';
        // Act
        component.onChangePassword(password, errors);
        // Assert
        expect(component.passwordErrorMsg).toBe(errorMsg);
      });

      it('should set empty string error message into "passwordErrorMsg" when password is correct', () => {
        // Arrange
        const password = 'abcd12345';
        const errors = null;
        const errorMsg = '';
        // Act
        component.onChangePassword(password, errors);
        // Assert
        expect(component.passwordErrorMsg).toBe(errorMsg);
      });

    });
  });

  describe('Template (Integration) testing', () => {
    let compiledComponent: HTMLElement;

    beforeEach(() => {
      // 讓 Angular 將畫面進行渲染
      fixture.detectChanges();
      // 取得渲染後的元素
      compiledComponent = fixture.nativeElement;
    });

    describe('Account input field', () => {
      let accountInputElement: HTMLInputElement;

      beforeEach(() => {
        // 拿到 account DOM 元素
        accountInputElement = compiledComponent.querySelector('#account');
      });

      it('should have attribute "type", and the value is "email"', () => {
        // Arrange
        const attrName = 'type';
        const attrValue = 'email';
        // Assert
        expect(accountInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "name", and the value is "account"', () => {
        const attrName = 'name';
        const attrValue = 'account';
        expect(accountInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "pattern", and the value is "\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b"', () => {
        const attrName = 'pattern';
        const attrValue = '\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b';
        expect(accountInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "required"', () => {
        const attrName = 'required';
        expect(accountInputElement.hasAttribute(attrName)).toBeTrue();
      });

      it('should binding the value of property "account"', () => {
        // Arrange
        const account = 'everything';
        // Action
        component.account = account;
        fixture.detectChanges();
        // Assert
        expect(accountInputElement.getAttribute('ng-reflect-model')).toBe(account);
      });

      it('should trigger function "onChangeAccount" when the value changed', () => {
        // Arrange
        spyOn(component, 'onChangeAccount');
        const accountNgModel = component.accountNgModelRef;
        // Action
        accountInputElement.value = 'everything';
        accountInputElement.dispatchEvent(new Event('ngModelChange'));
        // Assert
        // expect(component.onChangeAccount).toHaveBeenCalled();
        expect(component.onChangeAccount).toHaveBeenCalledWith(accountNgModel.value, accountNgModel.errors);
      });

    });

    describe('Password input field', () => {
      let passwordInputElement: HTMLInputElement;

      beforeEach(() => {
        passwordInputElement = compiledComponent.querySelector('#password');
      });

      it('should have attribute "type", and the value is "password"', () => {
        const attrName = 'type';
        const attrValue = 'password';
        expect(passwordInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "name", and the value is "password"', () => {
        const attrName = 'name';
        const attrValue = 'password';
        expect(passwordInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "required"', () => {
        const attrName = 'required';
        expect(passwordInputElement.hasAttribute(attrName)).toBeTrue();
      });

      it('should have attribute "maxlength", and the value is "16"', () => {
        const attrName = 'maxlength';
        const attrValue = '16';
        expect(passwordInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should have attribute "minlength", and the value is "8"', () => {
        const attrName = 'minlength';
        const attrValue = '8';
        expect(passwordInputElement.getAttribute(attrName)).toBe(attrValue);
      });

      it('should binding the value of property "password"', () => {
        const password = 'abcd1234';
        // 在 component 帶入初始值
        component.password = password;
        // 模擬偵測到資料變動
        fixture.detectChanges();

        expect(passwordInputElement.getAttribute('ng-reflect-model')).toBe(password);
      });

      it('should trigger function "", and the value is "onChangePassword" when the value changed', () => {
        spyOn(component, 'onChangePassword');
        const passwordNgModel = component.passwordNgModelRef;
        // 相當於使用者輸入的動作
        passwordInputElement.value = 'abcd1234';
        // 使用者輸入後觸發 ngModelChange
        passwordInputElement.dispatchEvent(new Event('ngModelChange'));

        // component 的 onChangePassword 有被觸發，並且包含參數
        expect(component.onChangePassword).toHaveBeenCalledWith(passwordNgModel.value, passwordNgModel.errors);
      });

    });

    describe('Error message', () => {
      it('should binding the value of property "accountErrorMsg" in the template', () => {
        // Arrange
        const errorMsg = 'Error Msg';
        // 取得 html 元素
        const targetElement = compiledComponent.querySelector('#account + .error-message');
        // Action
        // 設定 errorMsg 給 accountErrorMsg
        component.accountErrorMsg = errorMsg;
        // 觸發偵測資料異動
        fixture.detectChanges();
        // Assert
        expect(targetElement?.textContent).toBe(errorMsg);
      });

      it('should binding the value of property "passwordErrorMsg" in the template', () => {
        const errorMsg = 'Error Msg';
        const targetElement = compiledComponent.querySelector('#password + .error-message');

        component.passwordErrorMsg = errorMsg;
        fixture.detectChanges();

        expect(targetElement?.textContent).toBe(errorMsg);
      });
    });

    describe('Login button', () => {
      let loginBtnElement: HTMLButtonElement;

      beforeEach(() => {
        loginBtnElement = compiledComponent.querySelector('button');
      });

      it('should have attribute "type", the value is "submit"', () => {
        const attrName = 'type';
        const attrValue = 'submit';
        expect(loginBtnElement.getAttribute(attrName)).toBe(attrValue);
      });

      xit('should have attribute "disabled" when the form value status is invalid', () => {
        const attrName = 'disabled';
        expect(loginBtnElement.hasAttribute(attrName)).toBeTrue();
        // expect(loginBtnElement.getAttribute(attrName)).toBeTrue();
      });

      describe('When the form status is valid', () => {
        beforeEach(() => {
          component.account = 'abcd@example.com';
          component.password = 'abcd1234';
          fixture.detectChanges();
        });

        it('should not have attribute "disabled"', () => {
          const attrName = 'disabled';
          expect(loginBtnElement.hasAttribute(attrName)).toBeFalse();
        });

        it('should trigger function "onLogin"', () => {
          // Arrange
          spyOn(component, 'onLogin');
          // Action
          loginBtnElement.click();
          // Assert
          expect(component.onLogin).toHaveBeenCalled();
        });
      });

    });
  });

});
