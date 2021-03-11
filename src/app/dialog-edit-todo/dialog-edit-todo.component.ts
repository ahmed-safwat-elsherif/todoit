import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { TodoGroupService } from '../services/todo-group.service';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dialog-edit-todo',
  templateUrl: './dialog-edit-todo.component.html',
  styleUrls: ['./dialog-edit-todo.component.css']
})
export class DialogEditTodoComponent implements OnInit {

  title = "untitled";
  flag;
  status;
  body = "";
  tags: Array<any> = [];
  isTitle = false;
  isTitleLong = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  _id = this.route.snapshot.paramMap.get("_id") || "";
  token = localStorage.getItem('todoitUserToken') || "";
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    public dialogRef: MatDialogRef<DialogEditTodoComponent>,
    private todoService: TodoService,
    private todoGroupService: TodoGroupService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this._id = this.data._id;
    this.title = this.data.title;
    this.body = this.data.body;
    this.tags = this.data.tags;
    this.status = this.data.status
    this.flag = this.data.flag
    console.log(this._id)
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
  updateItem(flag) {
    let title = this.title,
      body = this.body,
      tags = this.tags,
      _id = this._id,
      status = this.status;
    console.log(flag)
    var currentUrl = "";
    if (flag == 1) {
      this.todoService.patchTodo(_id, { title, body, tags, _id, status }).subscribe(
        (res: any) => {
          console.log(res);
          currentUrl = `/dashboard/todo/${this._id}`;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
          console.log(currentUrl)
          this.close()
        },
        err => {
          currentUrl = `/dashboard`
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
          console.log(currentUrl)
          console.log(err)
        }
      )
    } else {
      this.todoGroupService.patchTodoGroup(_id, { title, body, tags, _id, status }).subscribe(
        (res: any) => {
          console.log(res);
          currentUrl = `/dashboard/todo-group/${this._id}`
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
          console.log(currentUrl)
          this.close()
        },
        err => {
          currentUrl = `/dashboard`
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
          console.log(currentUrl)
          console.log(err)
        }
      )
    }
    console.log(currentUrl)

  }
  close() {
    this.dialogRef.close();
    this.title = "untitled";
    this.body = "";
    this.tags = [
      { name: 'Lemon' },
      { name: 'Lime' },
      { name: 'Apple' },
    ];
    this.isTitle = false;
    this.isTitleLong = false;
  }

}
