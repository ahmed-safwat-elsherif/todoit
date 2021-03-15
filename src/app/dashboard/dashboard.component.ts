import { Component, OnDestroy, OnInit,Output } from '@angular/core';
import { TodoGroupService } from '../services/todo-group.service';
import {TodoService} from '../services/todo.service';
import {UserService} from '../services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogTodoGroupComponent} from '../dialog-todo-group/dialog-todo-group.component'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  user={
    fullname:"Ahmed Safwat",
    email:"alsherif333@gmail.com",
  }

  public groups=[];
  solos=[];
  
  constructor(
    private todoService:TodoService,
    private todoGroupService:TodoGroupService,
    private userService:UserService,
    private dialog: MatDialog,
    private router:Router,
    private route: ActivatedRoute,
  ) { }
  solosLimit=30;
  solosSkip=0;
  groupsLimit=30;
  groupsSkip=0;
  sideBarIsGroupLoading = true;
  sideBarIsGroupError = false;

  sideBarIsSoloLoading = true;
  sideBarIsSoloError = false;
  
  dashboardIsLoading= true;
  subscriberTodoGroups;
  subscriberTodos;
  ngOnInit(): void {
    /// Fetch all solo todos
    this.userService.getProfile(localStorage.getItem('todoitUserToken')).subscribe(
      (res:any)=>{
        this.user.fullname = `${res.user.firstName} ${res.user.lastName}`; 
        this.user.email = `${res.user.email}`; 
      },
      err=>{
        console.log(err)
      }
    )
    this.subscriberTodoGroups = this.todoService.getTodos(this.solosLimit,this.solosSkip)
    this.subscriberTodoGroups.subscribe(
      (res:any)=>{
        this.solos = res.todos;
        this.sideBarIsGroupLoading = false;
        this.sideBarIsGroupError = false;
        
        this.dashboardIsLoading= false;
      },
      err=>{
        this.sideBarIsGroupLoading = false;
        this.sideBarIsGroupError = true;
        this.dashboardIsLoading= false;
        console.log(err)
      }
    )
    
    // Fetch all group todos
    this.subscriberTodos = this.todoGroupService.getTodoGroups(this.groupsLimit,this.groupsSkip)
    this.subscriberTodos.subscribe(
      (res:any)=>{
        this.groups = res.todoGroups;
        this.sideBarIsSoloLoading = false;
        this.dashboardIsLoading= false;
        this.sideBarIsSoloError = false;
      },
      err=>{
        console.log(err)
        this.sideBarIsSoloLoading = false;
        this.sideBarIsSoloError = true;
        this.dashboardIsLoading= false;
      }
    )
  }
  signout(){
    localStorage.setItem('todoitUserToken','empty');
    this.router.navigate(['login']);
  }
  onTodoCreated(e){
    console.log(e)
  }
  openDialogTodo(){
    const dialogRef = this.dialog.open(DialogTodoGroupComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  ngOnDestroy(){
  }
  toGroupTable(){
    this.router.navigate([`dashboard/table-groups`]);
  }
  toTodoTable(){
    this.router.navigate(['dashboard/table-todo'])
  }

}
