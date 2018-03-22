import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent{
  @Input() isChecked: boolean = false;
  @Input() todoDesc: string = '';
  @Output() emitterOnToggleTriggered = new EventEmitter<boolean>();
  @Output() emitterOnRemoveTriggered = new EventEmitter<boolean>();

  toggle() {
    this.emitterOnToggleTriggered.emit(true);
  }
  remove() {
    this.emitterOnRemoveTriggered.emit(true);
  }
}
