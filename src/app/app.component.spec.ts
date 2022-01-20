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
  });

});
