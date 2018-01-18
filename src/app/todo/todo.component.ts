import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from '../domain/entities';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
// import 'rxjs/Rx';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private desc: String;

  todos : Observable<Todo[]>;
  atest$ : BehaviorSubject<any>;

  constructor(
    @Inject('todoService') private service,
    private route: ActivatedRoute,
    private router: Router) {

      // ## example to retrive route.params
      console.log(this.route.params)
      // method 1: 
      console.log(this.route.snapshot.paramMap.get('filter'));
      // method 2:
      this.route.paramMap.subscribe(
        params => {
          this.desc = params.get('filter');
          console.log(this.desc);
        }
      );

      // ## this is the rxjs 5 feature, i.e. have to import these rxjs operator one by one.
      // ## Otherwise, make all of these operator ready by using "Observable.from()" or import all operators from 'rxjs/Rx'.
      // Observable.from(this.route.params)
      this.route.params
      ._do( val => console.log(val))
        .pluck('filter')
        .subscribe(filter => {
          this.service.filterTodos(filter);
          this.todos = this.service.todos;
        })
  
    }

  ngOnInit() {

  }

  textChanges(value) {
    this.desc = value;
    console.log(value);
  }

  addTodo(desc: string) {
    this.service.addTodo(desc);
  }
  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }
  removeTodo(todo: Todo) {
    this.service.deleteTodo(todo);
  } 
  toggleAll(){
    this.service.toggleAll();
  }
  clearCompleted(){
    this.service.clearCompleted();
  }
}
