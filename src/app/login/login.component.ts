import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {
  isLoad = "hide";
  loading = false;
  credentialsError="hide";
  userCredentials={};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,) { 
      // this.userService.getProfile(localStorage.getItem('todoitUserToken')).subscribe(
      //   (res:any)=>{
      //     console.log(res)
      //     if(res.success){
      //       this.router.navigate(['dashboard']);
      //     }
      //   },
      //   err=>{
      //     console.log(err)
      //   }
      // )
    }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    
  }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,validateEmail]),
    password: new FormControl('',[Validators.required]),
  });
  get _form(){return this.loginForm.controls;}

  /************ */
  goLogin(){
    this.userCredentials = {
      "email":this._form.email.value,
      "password":this._form.password.value,
    }
    this.isLoad=""
    this.loading = true;
    this.userService.postLogin(this.userCredentials).subscribe(
      (res:any)=>{
        console.log(res)
        this.loading = false;
        this.isLoad="hide"
        if(res.success){
          localStorage.setItem('todoitUserToken',res.token);
          localStorage.getItem('todoitUserToken');
          this.router.navigate(['dashboard']);
        }
      },
      (err) =>{
        if(err.error.exists){
        }
        this.loading = false;
        this.isLoad = "hide";
        this.credentialsError="";
        this.loginForm.controls['password'].setValue("");
        console.log(err.error)
      });
  }
}
function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return EMAIL_REGEXP.test(c.value) ? null : {
    emailNotValid: true
  };
}
