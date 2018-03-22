import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../domain/entities';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  _todos: Todo[] = [];

  // ## the simple way
  @Input() todos : Todo[] = [...this._todos];
  // ## the way for more logics
  // @Input()
  // set todos(todos:Todo[]){
  //   this._todos = [...todos];
  // }
  // get todos() {
  //   return this._todos;
  // }

  @Output() emitterOnRemoveTodo = new EventEmitter<Todo>();
  @Output() emitterOnToggleTodo = new EventEmitter<Todo>();
  @Output() emitterOnToggleAll = new EventEmitter<boolean>();

  onRemoveTriggeredFunc(todo: Todo) {
    this.emitterOnRemoveTodo.emit(todo);
  }
  onToggleTriggeredFunc(todo: Todo) {
    this.emitterOnToggleTodo.emit(todo);
  }
  onToggleAllTriggeredFunc() {
    this.emitterOnToggleAll.emit(true);
  }
}
