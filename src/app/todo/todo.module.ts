import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module'

import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoService } from './todo.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import { MdlModule } from '@angular-mdl/core';


import { StoreModule } from '@ngrx/store';
import { todoReducer, todoFilterReducer } from '../reducers/todo.reducer';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MdlModule,
    TodoRoutingModule,
    StoreModule.forRoot({ 
      todos: todoReducer, 
      todoFilter: todoFilterReducer
    })
  ],
  declarations: [
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent,
    TodoItemComponent,
    TodoListComponent
  ],
  providers: [
    {provide: 'todoService', useClass: TodoService}
    ],
})
export class TodoModule {}
