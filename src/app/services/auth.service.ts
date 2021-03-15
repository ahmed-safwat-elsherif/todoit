import { Injectable } from '@angular/core';
import {UserService} from './user.service'
@Injectable({providedIn: "root"})
export class AuthService {
  constructor(
    public userService:UserService
  ) {}
  // ...
  public isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.userService.getProfile(localStorage.getItem('todoitUserToken')).subscribe(
      (res:any)=>{
        console.log(res.user)
        if(res.user){
          isAuthenticated = true;
        }
      },
      (err)=>{
        console.log(err);
        isAuthenticated = false;
      }
    )
    // const token = localStorage.getItem('todoitUserToken');
    // Check whether the token is expired and return
    // true or false
    return !isAuthenticated;
  }
}