import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';

import { AuthGuardService } from '../core/auth-guard.service'; // enable login

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo/ALL',
    pathMatch: 'full'
  },
  {
    path: 'todo/:filter',
    canActivate: [AuthGuardService], // enable login
    component: TodoComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TodoRoutingModule { }
