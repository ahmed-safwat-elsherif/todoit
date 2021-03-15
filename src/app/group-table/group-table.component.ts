import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoGroupService } from '../services/todo-group.service';
import {FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css']
})
export class GroupTableComponent implements OnInit {
  public groups=[];
  solos=[];
  public allTodoGroups=[];

  constructor(
    private todoGroupService:TodoGroupService,
    private router:Router,
    private route: ActivatedRoute
  ) { }
  range = new FormGroup({
    start: new FormControl('2021-03-15T22:00:00.000Z'),
    end: new FormControl('2021-03-16T22:00:00.000Z')
  });
  groupsLimit=30;
  groupsSkip=0;
  isLoading = true;
  isError = false;
  
  subscriberTodoGroups;
  subscriberTodos;

  ngOnInit(): void {
    /// Fetch all solo todos
    this.isError = false;
    this.isLoading = true;
    this.subscriberTodoGroups = this.todoGroupService.getTodoGroups(this.groupsLimit,this.groupsSkip)
    this.subscriberTodoGroups.subscribe(
      (res:any)=>{
        // console.log(res)
        this.isLoading = false;
        this.isError = false;
        this.groups = res.todoGroups;
        this.allTodoGroups = res.todoGroups;
      },
      err=>{
        this.isLoading = false;
        this.isError = true;
        console.log(err)
      }
    )
    // Fetch all group todos
  }
  changeStatus(id){
    let group = this.groups.find(group=>group?._id==id);
    console.log(id,group._id);
    group.status = (group.status == "in progress")? "done":"in progress";
    let {title, body, tags, _id,status}= group
    this.todoGroupService.patchTodoGroup(id,{title, body, tags, _id,status}).subscribe(
      (res:any)=>{
        console.log(res);
      },
      err=>{
        console.log(err)
      }
    )
  }
  getDate(e){
    let dStart = new Date(this.range.value.start)
    let dEnd = new Date(this.range.value.end);
    if(dEnd.getTime() == 0){
      this.groups = this.allTodoGroups;
      return;
    }
    let todoGroup = this.allTodoGroups.filter(todo=>{
      var todoCreateAt = new Date(todo.createdAt); // 10:09 to
      console.log(todoCreateAt.getTime())
      console.log(dStart.getTime())
      console.log(dEnd.getTime())
      console.log(((todoCreateAt.getTime() >= dStart.getTime()) && (todoCreateAt.getTime() <= dEnd.getTime())))

      return ((todoCreateAt.getTime() >= dStart.getTime()) && (todoCreateAt.getTime() <= dEnd.getTime())); 
    })
    this.groups = todoGroup;
  }
  toGroupInfo(id){
    this.router.navigate([`dashboard/todo-group/${id}`]);
  }
  toTodoInfo(id){
    this.router.navigate(['dashboard/table-todo'])
  }
  deleteTodo(id){
    console.log(id)
    
    this.todoGroupService.postDeleteTodoGroup(id).subscribe(
      (res:any)=>{
        console.log(res)
        let newGroup = this.groups.filter(group=>group._id!=id);
        this.groups = newGroup;
      },
      (err)=>{
        console.log(err)
      }
    )
  }
}

function dateCompare(createAt:any,from:any,to:any){
  // console.log(createAt)
  // console.log(from)
  // console.log(to)
  var todoCreateAt = new Date(createAt), // 10:09 to
      fromDate = new Date(from),
      toDate = new Date(to);
  console.log(todoCreateAt)
  console.log(todoCreateAt.getTime())
  console.log(fromDate.getTime())
  console.log(toDate.getTime())
  console.log(((todoCreateAt.getTime() >= fromDate.getTime()) && (todoCreateAt.getTime() <= toDate.getTime())))
  return ((todoCreateAt.getTime() >= fromDate.getTime()) && (todoCreateAt.getTime() <= toDate.getTime())); 
}