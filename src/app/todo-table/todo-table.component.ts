import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {
  public todos=[];
  solos=[];
  public allTodo=[];
  
  constructor(
    private todoService:TodoService,
    private router:Router,
    private route: ActivatedRoute
  ) { }
  range = new FormGroup({
    start: new FormControl('2021-03-15T22:00:00.000Z'),
    end: new FormControl('2021-03-16T22:00:00.000Z')
  });
  todosLimit=30;
  todosSkip=0;
  isLoading = true;
  isError = false;
  
  subscriberTodotodos;
  subscriberTodos;
  ngOnInit(): void {
    /// Fetch all solo todos
    this.isError = false;
    this.isLoading = true;
    this.subscriberTodotodos = this.todoService.getTodos(this.todosLimit,this.todosSkip)
    this.subscriberTodotodos.subscribe(
      (res:any)=>{
        // console.log(res)
        this.isLoading = false;
        this.isError = false;
        this.todos = res.todos;
        this.allTodo = res.todos;
      },
      err=>{
        this.isLoading = false;
        this.isError = true;
        console.log(err)
      }
    )
    // Fetch all todo todos
  }
  getDate(e){
    let dStart = new Date(this.range.value.start)
    let dEnd = new Date(this.range.value.end);
    if(dEnd.getTime() == 0){
      this.todos = this.allTodo;
      return;
    }
    let todoGroup = this.allTodo.filter(todo=>{
      var todoCreateAt = new Date(todo.createdAt); // 10:09 to
      console.log(todoCreateAt.getTime())
      console.log(dStart.getTime())
      console.log(dEnd.getTime())
      console.log(((todoCreateAt.getTime() >= dStart.getTime()) && (todoCreateAt.getTime() <= dEnd.getTime())))

      return ((todoCreateAt.getTime() >= dStart.getTime()) && (todoCreateAt.getTime() <= dEnd.getTime())); 
    })
    this.todos = todoGroup;
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
        this.todos = newTodo;
      },
      (err)=>{
        console.log(err)
      }
    )
  }

}
