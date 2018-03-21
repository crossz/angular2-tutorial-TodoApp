import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { UUID } from 'angular2-uuid';


import {Observable} from 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Todo } from '../domain/entities';

@Injectable()
export class TodoService {

  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({'Content-Type': 'application/json'});
  private userId: string;
  private _todos: BehaviorSubject<Todo[]>; 
  private dataStore: {  // todos的内存“数据库”
    todos: Todo[]
  };

  constructor(private http: Http) {
    this.dataStore = { todos: [] };
    this._todos = new BehaviorSubject<Todo[]>([]);
  }

  get todos(){
    return this._todos.asObservable();
  }

  // POST /todos
  addTodo(desc:string){
    let todoToAdd = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: this.userId
    };
    this.http
      .post(this.api_url, JSON.stringify(todoToAdd), {headers: this.headers})
      .map(res => res.json() as Todo)
      ._do(test=>{console.log(test)})
      .subscribe(todo => {
        this.dataStore.todos = [...this.dataStore.todos, todo];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // PATCH /todos/:id 
  toggleTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});
    return this.http
      .patch(url, JSON.stringify({completed: !todo.completed}), {headers: this.headers})
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0,i),
          updatedTodo,
          ...this.dataStore.todos.slice(i+1)
        ];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // DELETE /todos/:id
  deleteTodo(todo: Todo){
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    this.http
      .delete(url, {headers: this.headers})
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0,i),
          ...this.dataStore.todos.slice(i+1)
        ];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // GET /todos
  getTodos(){
    this.http.get(this.api_url)
      .map(res => res.json() as Todo[])
      ._do(t => console.log(t))
      .subscribe(todos => this.updateStoreAndSubject(todos));
  }
  // GET /todos?completed=true/false
  filterTodos(filter: string) {
    switch(filter){
      case 'ACTIVE': 
        this.http
          .get(`${this.api_url}?completed=false`)
          .map(res => res.json() as Todo[])
          .subscribe(todos => this.updateStoreAndSubject(todos));
          break;
      case 'COMPLETED': 
        this.http
          .get(`${this.api_url}?completed=true`)
          .map(res => res.json() as Todo[])
          .subscribe(todos => this.updateStoreAndSubject(todos));
          break;
      default:
        this.getTodos();
    }
  }
  toggleAll(){
    this.dataStore.todos.forEach(todo => this.toggleTodo(todo));
  }
  clearCompleted(){
    this.dataStore.todos
      .filter(todo => todo.completed)
      .forEach(todo => this.deleteTodo(todo));
  }
  private updateStoreAndSubject(todos) {
    this.dataStore.todos = [...todos];
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }
}
