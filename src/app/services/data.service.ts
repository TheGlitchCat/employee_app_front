import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlRoot = 'http://localhost:3000';
  urlRelations = 'http://localhost:3000/relations';
  urlEmployees = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }


  // Employees
  getEmployee(){
    return this.http.get(this.urlEmployees);
  }

  postEmployee(params){
    return this.http.post(this.urlEmployees, params);
  }

  putEmployee(employee_id, params){
    return this.http.put(this.urlEmployees + '/' + employee_id, params);
  }

  deleteEmployee(employee_id){
    return this.http.delete(this.urlEmployees + '/' + employee_id);
  }


  // Relations
  getRelations(){
    return this.http.get(this.urlRelations);
  }

  postRelations(params){
    return this.http.post(this.urlRelations, params);
  }

  putRelations(relations_id, params){
    return this.http.put(this.urlRelations + '/' + relations_id, params);
  }

  deleteRelations(relations_id){
    return this.http.delete(this.urlRelations + '/' + relations_id);
  }

  
  // GENERICS
  get(url: string){
    return this.http.get(url);
  }

  post(url, params){
    return this.http.post(url, params);
  }

  put(url, params){
    return this.http.put(url, params);
  }

  delete(url){
    return this.http.delete(url);
  }


}
