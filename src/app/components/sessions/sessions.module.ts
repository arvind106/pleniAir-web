import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { SessionRoutes } from './sessions.routing';
import { FormsModule } from '@angular/forms';
import { SessionsComponent } from '../../components/sessions/sessions.component';
import { SessionViewComponent } from '../../components/sessions/session-view/session-view.component';
import { EditSessionComponent } from './edit-session/edit-session.component';




@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SessionRoutes),
      SharedModule,
      FormsModule,
    ],
    declarations: [SessionsComponent, SessionViewComponent, EditSessionComponent]
  })
  export class SessionsModule { }