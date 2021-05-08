import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopListComponent } from './pop-list/pop-list.component';
import { PopRoutes } from './pop.routing';
import { from } from 'rxjs';
import { PopComponent } from '../../components/pop/pop.component';
import { EditPopComponent } from './edit-pop/edit-pop.component';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(PopRoutes),
      SharedModule
    ],
    declarations: [
        PopListComponent,PopComponent, EditPopComponent
       
    ]
  })
  export class PopModule { }