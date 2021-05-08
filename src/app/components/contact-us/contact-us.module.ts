import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { ContactUsComponent } from '../../components/contact-us/contact-us.component';
import {ContactUsRoutes} from './contact-us.routing';

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(ContactUsRoutes),
      SharedModule
    ],
    declarations: [ContactUsComponent
    ]
  })
  export class ContactUsModule { }
  