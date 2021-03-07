import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseURL = "https://todoit-app-api.herokuapp.com/api";
  constructor(
    private http:HttpClient
  ) { }
  token = localStorage.getItem('todoitUserToken')
  getTodos(limit,skip){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.get(`${this.baseURL}/todos/?limit=${limit}&skip=${skip}`,httpOptions)
  }
}
