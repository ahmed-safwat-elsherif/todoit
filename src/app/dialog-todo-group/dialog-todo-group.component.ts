import { Component, EventEmitter, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoGroupService } from '../services/todo-group.service';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dialog-todo-group',
  templateUrl: './dialog-todo-group.component.html',
  styleUrls: ['./dialog-todo-group.component.css']
})
export class DialogTodoGroupComponent implements OnInit {
  title = "untitled";
  body = "";
  type = "1";
  tags: Array<any> = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];
  isType = false;
  isTitle = false;
  isTitleLong = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public dialogRef: MatDialogRef<DialogTodoGroupComponent>,
    private todoService: TodoService,
    private todoGroupService: TodoGroupService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  addTodo() {
    console.log(this.tags);
    console.log(this.title);
    console.log(this.body);
    console.log(this.type);
    console.log(this.title.length)
    this.isTitle=false;
    this.isType = false;
    this.isTitleLong=false;
    if (this.title.length == 0) {
      this.isTitle = true;
      return;
    }
    if (this.title.length > 20) {
      this.isTitleLong = true;
      return;
    }
    if (this.type == "1") {
      this.todoGroupService.postNewTodoGroup({
        tags: this.tags,
        body: this.body,
        title: this.title
      }).subscribe(
        (res: any) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
      this.dialogRef.close();
    }
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  close() {
    this.dialogRef.close();
    this.title = "untitled";
    this.body = "";
    this.type = "1"
    this.tags = [
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
    ];
    this.isType = false;
    this.isTitle = false;
    this.isTitleLong = false;
  }
}
