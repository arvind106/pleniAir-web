import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { EditProfileComponent} from './edit-profile.component';
import {DataTableModule, ToggleButtonModule} from "primeng/primeng";
import { EditProfileRoutes} from './edit-profile.routing';
import { from } from 'rxjs';
import { GrowlModule } from 'primeng/growl';
@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      DataTableModule,
      RouterModule.forChild(EditProfileRoutes),
      ToggleButtonModule,
      GrowlModule
   
  
    ],
    declarations: [EditProfileComponent]
  })
  export class EditProfileModule {
  }
  