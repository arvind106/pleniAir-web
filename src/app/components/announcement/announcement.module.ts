import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { AnnouncementComponent } from '../announcement/announcement.component';
import {AnnouncementRoutes} from './announcement.routing';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { CalendarModule } from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import { GrowlModule } from 'primeng/growl';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import {FileUploadModule} from 'primeng/fileupload';
import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(AnnouncementRoutes),
      SharedModule,
      CalendarModule,
      EditorModule,
      GrowlModule,
      FileUploadModule
    ],
    declarations: [AnnouncementComponent, AddAnnouncementComponent, EditAnnouncementComponent, ViewAnnouncementComponent
    ]
  })
  export class AnnouncementModule { }
  