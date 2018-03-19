import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from './todo.service';
// import { Todo } from '../domain/entities';

import { Store } from '@ngrx/store';
import {
  FETCH_FROM_API
} from '../actions/todo.action'
import { AppState, Todo, Auth } from '../domain/state';

// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';
// import {combineLatest} from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';




import { ChangeDetectorRef } from '@angular/core';



@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  todos : Observable<Todo[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject('todoService') private service,
    private store$: Store<AppState>, 
    private route: ActivatedRoute) {
      const fetchData$ = this.service.getTodos()
        .flatMap(todos => {
          this.store$.dispatch({type: FETCH_FROM_API, payload: todos});
          return this.store$.select('todos')
        })
        .startWith([]);
      const filterData$ = this.route.params.pluck('filter')
        .do(value => {
          const filter = value as string;
          this.store$.dispatch({type: filter});
        })
        .flatMap(_ => this.store$.select('todoFilter'));
      this.todos = Observable.combineLatest(
        fetchData$,
        filterData$,
        (todos: Todo[], filter: any) => todos.filter(filter)
      )
    }
    

  ngAfterViewInit() {
    // this.message = 'all done loading :)'
    this.cdr.detectChanges();
  }


  addTodo(desc: string) {
    this.service.addTodo(desc);
  }
  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }
  removeTodo(todo: Todo) {
    this.service.removeTodo(todo);
  } 
  toggleAll(){
    this.service.toggleAll();
  }
  clearCompleted(){
    this.service.clearCompleted();
  }
}

