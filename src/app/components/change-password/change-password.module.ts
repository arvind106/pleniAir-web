import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {DataTableModule, ToggleButtonModule} from "primeng/primeng";
import {ChangePasswordRoutes} from './change-password.routing';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(ChangePasswordRoutes),
      DataTableModule,
      ToggleButtonModule,
     
  
    ],
    declarations: [ChangePasswordComponent]
  })
  export class ChangePasswordModule { }