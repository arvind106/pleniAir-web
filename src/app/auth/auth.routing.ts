import { Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
        data: {
          breadcrumb: 'Login'
        }
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        data: {
          breadcrumb: 'Forgot'
        }
      },
       
      
  
    ]
  }
]

