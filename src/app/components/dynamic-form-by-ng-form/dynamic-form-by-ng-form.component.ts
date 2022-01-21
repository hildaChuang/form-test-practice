import { Component, OnInit } from '@angular/core';
import { NgForm, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-by-ng-form',
  templateUrl: './dynamic-form-by-ng-form.component.html',
  styleUrls: ['./dynamic-form-by-ng-form.component.css']
})
export class DynamicFormByNgFormComponent implements OnInit {

  employees: EmployeeModel[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onDebug(form: NgForm): void {
    console.log('---- onDebug ----');
    console.log('form:', form);
    console.log('employees:', this.employees);
    // console.log('errorMsgForName:', this.employees.errorMsgForName);
    // console.log('errorMsgForAge:', this.employee.errorMsgForAge);
    console.log('---- ---- ----');
  }

  getErrorMsg(errors: ValidationErrors | null): string {
    // console.log('errors:', errors);
    let errorMsg: string = null;
    if (errors?.required) {
      errorMsg = 'Required!';
    } else if (errors?.minlength) {
      errorMsg = 'Length must be Grater than 2.';
    }
    return errorMsg;
  }

  onAddEmployee(): void {
    this.employees.push({} as EmployeeModel);
  }

  onDeleteEmployee(index: number): void {
    this.employees.splice(index, 1);
  }

  /**
   * @description Name changed
   *
   * @param name - target name
   * @param errors - ngModel errors
   * @param employee - target employee
   * @memberOf DynamicFormByNgFormComponent
   */
  onChangeName(
    name: string,
    errors: ValidationErrors | null,
    employee: EmployeeModel
  ): void {
    employee.name = name;
    employee.errorMsgForName = this.getErrorMsg(errors);
  }

  /**
   * @description Age changed
   *
   * @param age - target age
   * @param errors - ngModel errors
   * @param employee - target employee
   * @memberOf DynamicFormByNgFormComponent
   */
  onChangeAge(
    age: number,
    errors: ValidationErrors | null,
    employee: EmployeeModel
  ): void {
    employee.age = age;
    employee.errorMsgForAge = this.getErrorMsg(errors);
  }

  onSubmit(employee: EmployeeModel): void {
    // do submit
  }

  /**
   * @description 根據索引來重新渲染有異動的節點，可以解決校能問題，DOM 只會繪製異動的部分
   * ref. https://angular.tw/api/common/NgForOf
   *
   * @param index - index of data
   * @return index - index
   * @memberOf DynamicFormByNgFormComponent
   */
  trackByIndex(index: number): number {
    return index;
  }

}

export type EmployeeModel = {
  name: string;
  gender: string;
  age: number;
  errorMsgForName: string;
  errorMsgForAge: string;
};
