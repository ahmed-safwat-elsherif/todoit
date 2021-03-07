import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component'
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {TodoGroupComponent} from './todo-group/todo-group.component'
import {TodoComponent} from './todo/todo.component';
import {ProfileComponent} from './profile/profile.component';
import {NotFoundComponent} from './not-found/not-found.component'
const routes: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'failed', component: NotFoundComponent },
  // { path: 'dashboard', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      // {path: '', redirectTo: 'todo-groups'},
      {path: 'todo-group', redirectTo:'dashboard',pathMatch: 'full'},
      {path: 'todo-group/:_id', component: TodoGroupComponent},
      {path: 'todo/:_id', component: TodoComponent},
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
