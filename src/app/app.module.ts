import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from './services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/components/common/api';
import { ApiServiceService } from './services/api-service.service';
import { CommonService } from './services/common.service';
import { RepositoryService } from './services/repository.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { GooglePlaceModule } from '../../node_modules/ngx-google-places-autocomplete';
import { MomentModule } from 'angular2-moment/moment.module';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { AuthGuard } from './auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {AuthServiceService} from './auth-service.service';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { FaqComponent } from './components/faq/faq.component';
import { AddFaqComponent } from './components/faq/add-faq/add-faq.component';
import {NgxEditorModule} from 'ngx-editor';
import {ToastModule} from 'primeng/toast';
import { EditFaqComponent } from './components/faq/edit-faq/edit-faq.component';
import { DatePipe } from '@angular/common';

import { BookingComponent } from './components/booking/booking.component';
import { FavSessionComponent } from './components/fav-session/fav-session.component';
import { FavPopComponent } from './components/fav-pop/fav-pop.component';
import { GetFavPopComponent } from './components/fav-pop/get-fav-pop/get-fav-pop.component';
import { GetFavSessionComponent } from './components/fav-session/get-fav-session/get-fav-session.component';
import { GetBookingComponent } from './components/booking/get-booking/get-booking.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    AboutUsComponent,
    BreadcrumbsComponent,
    AuthComponent,
    //ContactUsComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    FaqComponent,
    AddFaqComponent,
    EditFaqComponent,
    BookingComponent,
    FavSessionComponent,
    FavPopComponent,
    GetFavPopComponent,
    GetFavSessionComponent,
    GetBookingComponent,
    // DataTableModule

   
   
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    GrowlModule,
    ConfirmDialogModule,
    HttpClientModule,
    NgxSpinnerModule,
    MomentModule,
    ReactiveFormsModule,
    ToastModule,
    NgxEditorModule,
 
 
  
  ],
  providers: [
    HttpClient,
    MessageService,
    ApiServiceService,
    CommonService,
    RepositoryService,
    AuthServiceService,
    ConfirmationService,
    AuthGuard,
    UserService,
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
