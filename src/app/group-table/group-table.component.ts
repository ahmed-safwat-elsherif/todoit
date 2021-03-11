import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoGroupService } from '../services/todo-group.service';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.css']
})
export class GroupTableComponent implements OnInit {
  public groups=[];
  solos=[];
  
  constructor(
    private todoGroupService:TodoGroupService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

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
