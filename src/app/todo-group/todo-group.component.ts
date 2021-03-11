import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TodoGroupService } from '../services/todo-group.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import {DialogAddTodoComponent} from '../dialog-add-todo/dialog-add-todo.component'
import {TodoService} from '../services/todo.service'
import { DialogEditTodoComponent } from '../dialog-edit-todo/dialog-edit-todo.component';
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
    todos:[],
    status:""
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoGroupService: TodoGroupService,
    private dialog: MatDialog,
    private todoService: TodoService
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
  openDialog(id){
    this.dialog.open(DialogAddTodoComponent,{
      data: {
        todoGroupId: id,
      }
    });
  }
  openEditDialog(id){
    this.dialog.open(DialogEditTodoComponent,{
      data: {
        _id: id,
        title:this.todoGroup.title,
        body:this.todoGroup.body,
        tags:this.todoGroup.tags,
        status:this.todoGroup.status,
        flag:2
      }
    });
  }
  changeStatus(id){
    let todo = this.todos.find(todo=>todo?._id==id);
    console.log(id,todo._id);
    todo.status = (todo.status == "in progress")? "done":"in progress";
    let {title, body, tags, _id,status}= todo
    this.todoService.patchTodo(id,{title, body, tags, _id,status}).subscribe(
      (res:any)=>{
        console.log(res);
      },
      err=>{
        console.log(err)
      }
    )
  }
  toTodoInfo(id){
    this.router.navigate([`dashboard/todo/${id}`]);
  }
  deleteTodo(id){
    console.log(id)
    
    this.todoService.deleteTodo(id).subscribe(
      (res:any)=>{
        console.log(res)
        let newTodo = this.todos.filter(todo=>todo._id!=id);
        this.allTodo = newTodo;
      },
      (err)=>{
        console.log(err)
      }
    )
  }
}
