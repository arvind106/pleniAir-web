import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { UserListComponent } from '../users/user-list/user-list.component';
import {UsersRoutes } from './users.routing';
import { UsersComponent } from '../../components/users/users.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(UsersRoutes),
      SharedModule
    ],
    declarations: [
        UserListComponent,UsersComponent, 
       
    ]
  })
  export class UsersModule { }