import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { TodoGroupService } from '../services/todo-group.service';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-add-todo',
  templateUrl: './dialog-add-todo.component.html',
  styleUrls: ['./dialog-add-todo.component.css']
})
export class DialogAddTodoComponent implements OnInit {
  title = "untitled";
  body = "";
  tags: Array<any> = [
    { name: 'Lemon' },
    { name: 'Lime' },
    { name: 'Apple' },
  ];
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
    public dialogRef: MatDialogRef<DialogAddTodoComponent>,
    private todoService: TodoService,
    private todoGroupService: TodoGroupService,
    private route:ActivatedRoute,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this._id = this.data.todoGroupId;
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
  addTodo() {
    console.log(this.tags);
    console.log(this.title);
    console.log(this.body);
    console.log(this.title.length)
    this.isTitle=false;
    this.isTitleLong=false;
    if (this.title.length == 0) {
      this.isTitle = true;
      return;
    }
    if (this.title.length > 20) {
      this.isTitleLong = true;
      return;
    }
    this.todoGroupService.postNewTodo({
      todoGroupId:this._id,
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
    let currentUrl = `/dashboard/todo/${this._id}`;
    console.log(currentUrl)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
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
