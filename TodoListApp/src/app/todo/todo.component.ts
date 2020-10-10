import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  todoList: any[];
  constructor(
    private service: TodoService
  ) { }

  ngOnInit(): void {
    this.service.getTodoList().snapshotChanges().subscribe(res => {
      this.todoList = [];
      res.forEach(e => {
        var x = e.payload.toJSON();
        x["$key"] = e.key;
        this.todoList.push(x);
      });

      this.todoList.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  onAdd(itemTitle) {
    this.service.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck(key: string, isChecked: boolean) {
    this.service.checkOrUnCheckTitle(key, !isChecked);
  }

  onDelete(key:string){
    this.service.removeTitle(key);
  }

}
