import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutes } from './auth.routing';
import {SharedModule} from '../shared/shared.module';
import { GrowlModule } from 'primeng/growl';
import { RouterModule } from '@angular/router';
import { ForgotComponent} from './forgot/forgot.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonService } from '../services/common.service';
import {MessagesModule} from 'primeng/messages';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    SharedModule,
     GrowlModule,
     ConfirmDialogModule,
     MessagesModule
  ],
  declarations: [ForgotComponent,
   
],
providers: [CommonService

]
})
export class AuthModule { }
