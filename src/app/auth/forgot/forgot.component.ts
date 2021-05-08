import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import * as EmailValidator from 'email-validator';
import {MessageService} from 'primeng/components/common/messageservice';
import { RepositoryService } from '../../services/repository.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  providers: [UserService,CommonService]
})
export class ForgotComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  forgotData = { email: '', role: '' };


  constructor(
    private router: Router,
    public common: CommonService,
    public userService: UserService,
    public repositoryService: RepositoryService,
     public messageServie:MessageService
 
 
    
    ) { }

  ngOnInit() {
    this.forgotData.email = '';
    this.forgotData.role = 'admin';
  }
  async forgotPassword() {

    if (this.forgotData.email == '') {
      this.common.showError('Please Enter Email');
      return;
    } else if (!EmailValidator.validate(this.forgotData.email)) {
      this.common.showError('Please Enter Valid Email');
      return;
    }
  
    const forgotData = await this.userService.ForgotPassword(this.forgotData);  
 
    if(forgotData){
      setTimeout(() => {
        this.router.navigate(['/auth/login'],{replaceUrl:true})
      }
      , 2000);
    }
    else
    {
      setTimeout(() => {
        this.router.navigate(['/auth/login'],{replaceUrl:true})
      }
      , 2000);
    

    }
   
    
    
    }
   
}
