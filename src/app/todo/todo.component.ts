import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from './todo.service';


// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  private desc: String;

  


  constructor(
    @Inject('todoService') private service,
    private route: ActivatedRoute,
    private router: Router) {
      this.desc = 'hello world.';


      console.log(this.route.params)
      // get param method 1
      console.log(this.route.snapshot.paramMap.get('filter')); 
      // get param method 2
      this.route.paramMap.subscribe(  
        params => {
          this.desc = params.get('filter');
          console.log(this.desc);
        }
      );

      

      this.service.filterTodos(this.desc);

  


      // Observable.from(this.route.params)
      this.route.params
      ._do( val => console.log(val))
        .pluck('filter')
        .subscribe(filter => {
          this.service.filterTodos(filter);
          console.log(this.service.todos);
        })
  


    }

  ngOnInit() {

  }

  textChanges(value) {
    this.desc = value;
    console.log(value);
  }


}
