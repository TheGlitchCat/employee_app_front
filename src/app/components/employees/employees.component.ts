import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Employee} from '../../models/models.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  msgText: string;

  employees: Object = [];

  employeeForm: FormGroup;

  option = 'Send';

  card = {
    name: ''
  };

  isLoaded = false;

  constructor(protected service: DataService, protected fb: FormBuilder) {

    this.employeeForm = this.fb.group({
      name: '',
      funct: ''
    });

  }

  ngOnInit() {

    console.log('Hello?');

    this.service.getEmployee().subscribe((data) => {
      console.log(data);
      this.employees = data as Employee[];
    }, (error) => {
      this.msgText = error.message;
    }, () => {
      this.isLoaded = true;
    });

  }

  showEmployee(employee){
    console.log(employee.id,employee.name, employee.funct);
    this.employeeForm = this.fb.group({
      id: employee.id,
      name: employee.name,
      funct: employee.funct
    });
    this.card.name = employee.name;
    this.option = 'Edit';
  }

  deleteEmployee(employee){
    console.log(employee.name, employee.funct);
    this.service.deleteEmployee(employee.id).subscribe((data) => {
      console.log(data)
    }, (error) => {this.msgText = error.message;}, () => {
      this.reloadData();
    });

  }

  onSubmit(data){
    console.log(data);
    if (this.option == 'Send'){
      this.service.postEmployee(data).subscribe((data) => {
      }, (error) => {this.msgText = error.message; console.log(error)}, () => {
        this.reloadData();
      });
    }

    if (this.option == 'Edit'){
      
      this.service.putEmployee(data.id, data).subscribe((data) => {},
        (error) => {this.msgText = error.message;},
        () => {this.reloadData()});
    }

    this.option = 'Send';
  }

  reloadData(){
    this.resetItems();
    this.service.getEmployee().subscribe((data) => {
      this.employees = data as Employee[]
    }, (error) => {
      this.msgText = error.message;
    }, () => {
        this.isLoaded = true;
    });
  }

  resetItems(){
    this.employees = [];
    this.isLoaded = false;
    this.card = {
      name: ''
    };

    this.employeeForm = this.fb.group({
      name: null,
      funct: ''
    });
  }

}
