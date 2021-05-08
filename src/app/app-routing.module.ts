import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthGuard } from './auth.guard';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FaqComponent } from './components/faq/faq.component';
import { AddFaqComponent } from './components/faq/add-faq/add-faq.component';
import { EditFaqComponent } from './components/faq/edit-faq/edit-faq.component';
import { BookingComponent } from './components/booking/booking.component';
import { FavSessionComponent } from './components/fav-session/fav-session.component';
import { FavPopComponent } from './components/fav-pop/fav-pop.component';
import { GetFavPopComponent } from './components/fav-pop/get-fav-pop/get-fav-pop.component';
import { GetFavSessionComponent } from './components/fav-session/get-fav-session/get-fav-session.component';
import { GetBookingComponent } from './components/booking/get-booking/get-booking.component';
const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }, {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
              {
              path: 'faq',
            component: FaqComponent,
            data : {
              breadcrumb: 'FAQ'
              },
            },
            {
              path: 'edit-faq/:_id',
            component: EditFaqComponent,
            data : {
              breadcrumb: ' Edit FAQ'
              }
            },
            {
              path: 'add-faq',
            component: AddFaqComponent,
            data : {
              breadcrumb: ' Add FAQ'
              }
            },
            {
              path :'fav-pop/get-fav-pop/:_id',
              component : GetFavPopComponent,
              data : {
                breadcrumb : 'Favourite New PleinAir Location Details'
              }
            },
            {
              path :'fav-session/get-fav-session/:_id',
              component : GetFavSessionComponent,
              data : {
                breadcrumb : 'Favourite New PleinAir Session Details'
              }
            },
            {
              path :'booking/get-booking/:_id',
              component : GetBookingComponent,
              data : {
                breadcrumb : 'Booking Details'
              }
            },
            {
              path:'sessions',
              loadChildren :'./components/sessions/sessions.module#SessionsModule'
            },
              {
                path : 'pop',
                loadChildren : './components/pop/pop.module#PopModule'
              },
              {
                path: 'change-password',
                loadChildren: './components/change-password/change-password.module#ChangePasswordModule'
              },
            
              {
                path: 'users',
                loadChildren: './components/users/users.module#UsersModule'
              },
              {
                path: 'edit-profile',
                loadChildren: './components/edit-profile/edit-profile.module#EditProfileModule'
              },
              {
                path: 'announcement',
                loadChildren: './components/announcement/announcement.module#AnnouncementModule'
              },{
                path: 'booking',
                children: [
                  
                  {
                    path: 'booking',
                        component : BookingComponent,
                        data :{
                          breadcrumb : 'Booking Details'
                        }
                      }
                    ]
                  },
                  {
                    path: 'favourite',
                    children: [
                      {
                        path: 'fav-session',
                            component : FavSessionComponent,
                            data :{
                              breadcrumb : 'Favourite New PleinAir Session'
                            }
                          },
                      {
                        path:'fav-pop',
                            component : FavPopComponent,
                            data :{
                              breadcrumb : 'Favourite New PleinAir Location'
                            }
                          },]
                      },
              {
                path: 'manage',
                children: [
                  {
                    path: 'about-us',
                  component: AboutUsComponent,
                  data : {
                    breadcrumb: 'About Us'
                    }
                  }, 
                  {
                    path: 'privacy-policy',
                    component: PrivacyPolicyComponent,
                    data : {
                      breadcrumb: 'Privacy Policy'
                      }
                    },
                    {
                      path: 'terms-conditions',
                    component: TermsConditionsComponent,
                    data : {
                      breadcrumb: 'Terms and Conditions'
                      }
                    },
                    {
                      path: 'faq',
                    component: FaqComponent,
                    data : {
                      breadcrumb: 'FAQ'
                      },
                    },
                    {
                      path: 'contact-us',
                    loadChildren: './components/contact-us/contact-us.module#ContactUsModule'
                    },
                ]
            },
              
        ]
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule'
            }, 
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard/dashboard-default'
    }
    // ,
    // {
    //   path: 'contact-us',
    //   redirectTo: 'contact-us/contact-us-default'
    // }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
