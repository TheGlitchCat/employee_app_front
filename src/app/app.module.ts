import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { DataService } from './services/data.service';
import { MsgComponent } from './components/msg/msg.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { RelationsComponent } from './components/relations/relations.component';

@NgModule({
  declarations: [
    AppComponent,
    MsgComponent,
    EmployeesComponent,
    RelationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DataService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
