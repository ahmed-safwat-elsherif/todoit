import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {
  public todos=[];
  solos=[];
  
  constructor(
    private todoService:TodoService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

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
      },
      err=>{
        this.isLoading = false;
        this.isError = true;
        console.log(err)
      }
    )
    // Fetch all todo todos
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
