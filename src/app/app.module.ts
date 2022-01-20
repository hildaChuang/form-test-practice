import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DynamicFormByNgFormComponent } from './components/dynamic-form-by-ng-form/dynamic-form-by-ng-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormByNgFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
