import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  });

});
