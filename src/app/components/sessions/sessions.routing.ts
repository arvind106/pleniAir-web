import { Routes } from '@angular/router';
import { SessionsComponent } from '../../components/sessions/sessions.component';
import { SessionViewComponent } from '../../components/sessions/session-view/session-view.component';
import { EditSessionComponent } from './edit-session/edit-session.component';


export const SessionRoutes: Routes = [
    {
        
            path: '',
           
            children: [
              {
                path: '',
                component: SessionsComponent,
                data: {
                    breadcrumb: ' New PleinAir Session',
                    status: true
                }
            },
            {
                path: 'session-view/:_id',
                component: SessionViewComponent,
                data: {
                    breadcrumb: 'View New PleinAir Session',
                }
              },
              {
                path: 'edit-session/:_id',
                component: EditSessionComponent,
                data: {
                    breadcrumb: 'Edit New PleinAir Session',
                }
              },
             
        ]

    }
]

