import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, DoCheck {
  isLoading=true;
  isError=false;
  _id = this.route.snapshot.paramMap.get("_id") || "";
  token = localStorage.getItem('todoitUserToken') || "";
  todo={
    title:"",
    body:"",
    tags:[]
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
  ) {
    this.getTodo()
   }

  ngOnInit(): void {
  }
  ngDoCheck(){
    if(this._id == this.route.snapshot.paramMap.get('_id')){
      return;
    }
    this._id = this.route.snapshot.paramMap.get('_id') || "";
    this.getTodo()
  }
  getTodo(){
    this.isLoading = true;
    this.isError=false;

    this.todoService.getTodoByID(this._id).subscribe(
      (res:any)=>{
        console.log(res)
        this.todo = res.todo;

        console.log(this.todo)
        this.isLoading = false;
        if(!this.todo){
          this.isError=true
        }
      },
      err=>{
        console.log(err)
        this.isError=true;
        this.isLoading = false;
      }
    )
  }
  drop(event: CdkDragDrop<[]>) {
    moveItemInArray(this.todo.tags, event.previousIndex, event.currentIndex);
  }

}
