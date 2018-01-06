import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';

// import { AuthGuardService } from '../core/auth-guard.service'; // disable login

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo/ALL',
    pathMatch: 'full'
  },
  {
    path: 'todo/:filter',
    // canActivate: [AuthGuardService], // disable login
    component: TodoComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TodoRoutingModule { }
