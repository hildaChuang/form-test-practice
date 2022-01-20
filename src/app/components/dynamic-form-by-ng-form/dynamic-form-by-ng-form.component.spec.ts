import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormByNgFormComponent } from './dynamic-form-by-ng-form.component';

describe('DynamicFormByNgFormComponent', () => {
  let component: DynamicFormByNgFormComponent;
  let fixture: ComponentFixture<DynamicFormByNgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormByNgFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormByNgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
