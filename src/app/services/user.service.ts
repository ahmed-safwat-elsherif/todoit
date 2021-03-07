import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = "https://todoit-app-api.herokuapp.com/api"
  constructor(private http: HttpClient) { }
  postRegister(registerInfo):Observable<{}>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(`${this.baseURL}/users/register`,registerInfo,httpOptions);
  }
  postLogin(userCredentials){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(`${this.baseURL}/users/login`,userCredentials,httpOptions);

  }
  getProfile(token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':token
      })
    };
    return this.http.get(`${this.baseURL}/users/profile`,httpOptions)
  }
  postUpdate(){
  }
  postUpdatePass(){
  }
}
