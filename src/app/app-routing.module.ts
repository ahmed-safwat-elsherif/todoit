import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component'
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {TodoGroupComponent} from './todo-group/todo-group.component'
import {TodoComponent} from './todo/todo.component';
import {ProfileComponent} from './profile/profile.component';
import {NotFoundComponent} from './not-found/not-found.component'
import { DefaultComponent } from './default/default.component';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { GroupTableComponent } from './group-table/group-table.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'failed', component: NotFoundComponent },
  // { path: 'dashboard', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path:'default',component:DefaultComponent,canActivate: [AuthGuard]},
      // {path: '', redirectTo: 'todo-groups'},
      {path: 'todo-group',  redirectTo:'default',pathMatch: 'full'},
      {path: 'todo-group/:_id',pathMatch: 'full', component: TodoGroupComponent},
      {path: 'todo/:_id',pathMatch: 'full', component: TodoComponent},
      {path:'table-groups',pathMatch: 'full',component:GroupTableComponent},
      {path:'table-todo',pathMatch: 'full',component:TodoTableComponent},
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
