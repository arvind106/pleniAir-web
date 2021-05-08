import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginRoutingModule} from './login-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { BasicLoginComponent } from './basic-login/basic-login.component';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [BasicLoginComponent]
})
export class LoginModule { }
