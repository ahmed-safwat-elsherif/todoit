import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TodoGroupService } from '../services/todo-group.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
// import {HttpParams} from '@angular/common/http'
@Component({
  selector: 'app-todo-group',
  templateUrl: './todo-group.component.html',
  styleUrls: ['./todo-group.component.css']
})
export class TodoGroupComponent implements OnInit,OnChanges,DoCheck {
  isLoading=true;
  isError=false;
  todos=[];
  allTodo=[];
  _id = this.route.snapshot.paramMap.get("_id") || "";
  token = localStorage.getItem('todoitUserToken') || "";
  todoGroup={
    title:"",
    body:"",
    tags:[],
    todos:[]
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoGroupService: TodoGroupService,
  ) {

    this.getGroup()
   }
  ngDoCheck(){
    if(this._id == this.route.snapshot.paramMap.get('_id')){
      return;
    }
    this._id = this.route.snapshot.paramMap.get('_id') || "";
    this.getGroup()
    
  }
  ngOnInit(): void {
  }
  ngOnChanges(){
  }
  getGroup(){
    this.isLoading = true;
    this.isError=false;

    this.todoGroupService.getTodoGroup(this._id).subscribe(
      (res:any)=>{
        console.log(res)
        this.todoGroup = res.todoGroup;
        this.todos = res.todos;
        this.allTodo = res.todos;
        console.log(this.todos)
        this.isLoading = false;
        if(!this.todoGroup){
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

  applyFilter(event){
    if(event.target.value==""){
      this.todos = this.allTodo
      return
    }
    this.todos = this.allTodo.filter((todo)=>{
      console.log("todo: ",todo.title,"event: ",event.target.value)
      return todo.title.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }
  gotoTodo(_id){
    console.log(_id)
    this.router.navigate(['dashboard/todo',_id])
  }
  drop(event: CdkDragDrop<[]>) {
    moveItemInArray(this.todoGroup.tags, event.previousIndex, event.currentIndex);
  }
}
