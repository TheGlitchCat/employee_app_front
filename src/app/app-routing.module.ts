import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmployeesComponent} from './components/employees/employees.component';
import {RelationsComponent} from './components/relations/relations.component';


const routes: Routes = [
  {path: '', redirectTo: 'authors', pathMatch: 'full'},
  {path: 'employees', component: EmployeesComponent},
  {path: 'relations', component: RelationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
