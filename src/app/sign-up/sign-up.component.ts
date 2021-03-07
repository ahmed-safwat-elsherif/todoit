import { Component, OnInit,OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {FormControl,FormGroup, Validators,FormBuilder, AbstractControl,ValidatorFn} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserService} from '../services/user.service';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit,OnChanges,AfterViewInit {
  @ViewChild('aa') span:ElementRef;
  @ViewChild('email') emailDom:ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,) { }
  isExists=false;
  loading = false;
  isLoad = "hide";
  registerInfo={};
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    // console.log(this.span)
    // this.span?.nativeElement.classList.add('ng-untouched')
    // console.log(this.emailDom.nativeElement)
    // this.emailDom.nativeElement.classList.remove('ng-untouched')
    // this.emailDom.nativeElement.classList.add('ng-touched')
    // this.emailDom.nativeElement.setAttribute('aria-describedby',"mat-error-0 mat-error-1")
  }
  signupForm = new FormGroup({
    email: new FormControl('',[Validators.required,validateEmail]),
    password: new FormControl('',[Validators.required,validatePassword]),
    confirmPassword: new FormControl('',[Validators.required,checkConfirmPassword]),
    firstname: new FormControl('',[Validators.required,validateFullname]),
    lastname: new FormControl('',[Validators.required,validateFullname]),
  });
  ngOnChanges(){
  }
  /************ */
  goSignup(){
    if(!this.signupForm.valid){
      return;
    }
    
    this.registerInfo = {
      "email":this._form.email.value,
      "password":this._form.password.value,
      "firstName":this._form.firstname.value,
      "lastName":this._form.lastname.value
    }
    console.log(this.registerInfo)
    this.loading = true;
    this.isLoad = "";
    this.isExists=false;
    this.userService.postRegister(this.registerInfo).subscribe(
    (res:any)=>{
      console.log(res)
      this.loading = false;
      this.isLoad="hide"
      if(res.success){
        this.router.navigate(['login']);  
      }
    },
    (err) =>{
      if(err.error.exists){
        this.isExists=true;
      }
      this.isLoad = "hide";
      this.loading = false;
      console.log(err.error)
    });
  }
  get _form(){return this.signupForm.controls;}
}
function validateEmail(c: FormControl) {
  let EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return EMAIL_REGEXP.test(c.value) ? null : {
    emailNotValid: true
  };
}
function validateFullname(c: FormControl){
  return (c.value.length < 3)? {min:true}: null;
}

function validatePassword(c:FormControl){

  let passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

  return passReg.test(c.value) ? null : {
    passwordWeak: true
  };
}

function checkConfirmPassword(control:FormControl){
  let form = control.parent;
  let password = form?.controls['password'].value;
  let confirmPassword = form?.controls['confirmPassword'].value;
  if(password != confirmPassword){
    return {notMatch:true};
  }
  return null;
}