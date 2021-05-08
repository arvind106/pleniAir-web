import { Routes } from '@angular/router';
import { PopListComponent } from './pop-list/pop-list.component';
import { PopComponent } from '../../components/pop/pop.component';
import { EditPopComponent } from './edit-pop/edit-pop.component';
export const PopRoutes : Routes = [
    {
       
        path: '',
           
        children: [
          {
            path: '',
            component: PopComponent,
            data: {
                breadcrumb: 'New PleinAir Location',
                status: true
            }
        },
        {
            path: 'pop-list/:_id',
            component: PopListComponent,
            data: {
                breadcrumb: 'View New PleinAir Location',
            }
          },
          {
            path: 'edit-pop/:_id',
            component: EditPopComponent,
            data: {
                breadcrumb: 'Edit New PleinAir Location',
            }
          }
    ]

    }
]