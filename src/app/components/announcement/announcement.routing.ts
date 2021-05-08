import { Routes } from '@angular/router';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';
import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';
export const AnnouncementRoutes: Routes = [
    {
        path: '',
        children: [
          {
            path: '',
            component: AnnouncementComponent,
            data: {
              breadcrumb: ' Public Announcement',
              status: true
            }
          },
          {
            path: 'add-announcement',
            component: AddAnnouncementComponent,
            data: {
              breadcrumb: 'Add Announcement',
              status: true
            }
          },
          {
            path: 'edit-announcement/:_id',
            component: EditAnnouncementComponent,
            data: {
              breadcrumb: 'Edit Announcement',
              status: true
            }
          },
          {
            path: 'view-announcement/:_id',
            component: ViewAnnouncementComponent,
            data: {
              breadcrumb: 'View Announcement',
              status: true
            }
          },
        ]
      }
];
