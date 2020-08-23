import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {Employee, Relations} from '../../models/models.model';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {

  msgText: string;

  relations: object = [];
  employees: object = [];

  relationForm: FormGroup;

  option = 'Send';

  card = {
    employee_id: '',
    boss_id: '',
  };

  isLoaded = false;

  constructor(protected service: DataService, protected fb: FormBuilder) {

    this.relationForm = this.fb.group({
      employee_id: null,
      boss_id: null
    });

  }

  ngOnInit() {

    this.service.getRelations().subscribe((data) => {
      console.log(data);
      this.relations = data as Relations[];
    }, (error) => {
      this.msgText = error.message;
    }, () =>{
      this.isLoaded = true;
    });
    //this.service.getAuthors().subscribe((data) => {
    //  this.authors = data as Author[];
    //});
  }

  showRelation(relation){
    console.log(relation.employee_id, relation.boss_id);
    this.relationForm = this.fb.group({
      id: relation.id,
      employee_id: relation.employee_id,
      boss_id: relation.boss_id
    });
    this.card.employee_id = relation.employee_id;
    this.card.boss_id = relation.boss_id;
    this.option = 'Edit';
  }

  deleteRelation(relation){
    console.log(relation.employee_id, relation.boss_id);
    this.service.deleteRelations(relation.id).subscribe((data) => {
      console.log(data);
    }, (error) => {this.msgText = error.message;}, () => {
      this.reloadData();
    });

  }

  onSubmit(data){
    console.log(data);
    if (this.option == 'Send'){
      this.service.postRelations(data).subscribe((data) => {
      }, (error) => {this.msgText = error.message; console.log(error)}, () => {
        this.reloadData();
      });
    }

    if (this.option == 'Edit'){
      this.service.putRelations(data.id, data).subscribe((data) => {},
        (error) => {this.msgText = error.message;},
        () => {this.reloadData()});
    }


    this.option = 'Send';
  }

  reloadData(){
    this.resetItems();
    this.service.getRelations().subscribe((data) => {
      this.relations = data as Relations[]
    }, (error) => {
      this.msgText = error.message;
    }, () => {
      this.isLoaded = true;
    });
  }

  resetItems(){
    this.relations = [];
    this.isLoaded = false;
    this.card = {
      employee_id: '',
      boss_id: '',
    };

    this.relationForm = this.fb.group({
      employee_id: null,
      boss_id: null
    });
  }

}
