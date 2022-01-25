import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormByReactiveFormComponent } from './dynamic-form-by-reactive-form.component';

describe('DynamicFormByReactiveFormComponent', () => {
  let component: DynamicFormByReactiveFormComponent;
  let fixture: ComponentFixture<DynamicFormByReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormByReactiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormByReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
