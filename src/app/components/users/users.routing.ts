import { Routes } from '@angular/router';
import {UserListComponent} from '../users/user-list/user-list.component';
import { UsersComponent } from '../../components/users/users.component';


export const UsersRoutes: Routes = [
    {
        path: '',
           
        children: [
          {
            path: '',
            component: UsersComponent,
            data: {
                breadcrumb: 'Users',
                status: true
            }
        },
        
        {
            path: 'user-list/:_id',
            component: UserListComponent,
            data: {
                breadcrumb: 'View User',
            }
          },
         
    ]

    }
]
