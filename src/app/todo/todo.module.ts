import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module'

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';

import { MdlModule } from '@angular-mdl/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MdlModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoComponent
  ],
  providers: [
    {provide: 'todoService', useClass: TodoService}
    ],
})
export class TodoModule {}
