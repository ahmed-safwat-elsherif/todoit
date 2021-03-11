import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoGroupService {
  baseURL = "https://todoit-app-api.herokuapp.com/api";
  constructor(
    private http:HttpClient,
  ) { }
  token = localStorage.getItem('todoitUserToken');
  postNewTodoGroup(body){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.post(`${this.baseURL}/todoGroups/todogroup`,body,httpOptions)
  }
  getTodoGroups(limit,skip){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.get(`${this.baseURL}/todoGroups/?limit=${limit}&skip=${skip}`,httpOptions)
  }
  postDeleteTodoGroup(todoGroupID){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.delete(`${this.baseURL}/todoGroups/todogroup/${todoGroupID}`,httpOptions)
  }
  getTodoGroup(todoGroupID){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.get(`${this.baseURL}/todoGroups/todogroup/${todoGroupID}`,httpOptions)
  }
  patchTodoGroup(todoGroupID,updates){
    /**
     * {
        "title":"new title", 
        "body":"asdfasd", 
        "tags":["sdfsdf"],
        "status":"done"
        }
     */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.patch(`${this.baseURL}/todoGroups/todogroup/${todoGroupID}`,updates,httpOptions)
  }
  postNewTodo(body){
    /**BODY :
     * "todoGroupId":"60387388ba5fb126b836c19f", 
      "title":"This is a title sdf", 
      "body": "This is a body", 
      "tags" : ["tag 1", "tag 2"]
     */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.post(`${this.baseURL}/todoGroups/new/todo`,body,httpOptions)
  }
  postExistingTodo(body){
    /**
     * BODY :
      {
          "todoGroupId":"60387388ba5fb126b836c19f"
      }
    */
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':this.token
      })
    };
    return this.http.post(`${this.baseURL}/todoGroups/new/todo`,body,httpOptions)
  }
}
