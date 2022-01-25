import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormByReactiveFormComponent } from './components/dynamic-form-by-reactive-form/dynamic-form-by-reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormByReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
