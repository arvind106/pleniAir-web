import { Component, OnInit } from '@angular/core';
import {Router, Params} from '@angular/router';
import {RepositoryService} from '../../services/repository.service';
import { CommonService } from '../../services/common.service'
import {UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
pwd : FormGroup;
submitted = false;
passwordData ={
  email:  "",
  oldPassword: "",
  newPassword: ""
};
  constructor(
    private fb : FormBuilder,
    private router : Router,
    private common : CommonService,
    private repositoryService : RepositoryService,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.pwd = this.fb.group(
      {
        old_pwd : [""],
        new_pwd : [""],
        confrim_pwd : [""]
      },
    );
  }
  get f()
  {
    return this.pwd.controls;
  }
  Cancel()
  {
    this.router.navigate(['/dashboard'],{replaceUrl:true}); 
  }
  async onSubmit(data)
  {
    this.submitted = true;
   if (this.pwd.get('old_pwd').value.length <= 0) {
      this.common.showError('Please Enter Old Password');
      return;
    }
    else if (this.pwd.get('new_pwd').value.length <= 0) {
      this.common.showError('Please Enter New Password');
      return;
    }
    else if (this.pwd.get('confrim_pwd').value.length <= 0) {
      this.common.showError('Please Enter Confirm Password');
      return;
    }
    else if (this.pwd.get('new_pwd').value != this.pwd.get('confrim_pwd').value) {
      this.common.showError('New Password and Confirm Password Must Match.');
      return;
    }
    else if (this.pwd.get('new_pwd').value == this.pwd.get('old_pwd').value) {
      this.common.showError('New Password Must be not same as Old Password.');
      return;
    }
    else if (this.pwd.get('confrim_pwd').value == this.pwd.get('old_pwd').value) {
      this.common.showError('Confirm Password Must be not same as Old Password.');
      return;
    }
   const email = localStorage.getItem('email');
   this.passwordData.email = email;
   this.passwordData.oldPassword = this.pwd.get('old_pwd').value;
   this.passwordData.newPassword = this.pwd.get('new_pwd').value;
   const savePassword= await this.userService.changePassword(this.passwordData);

   if(savePassword != null){
    this.pwd.patchValue({
      old_pwd : "",
      new_pwd : "",
      confrim_pwd : ""
    });
    setTimeout(() => {
      this.router.navigate(['/auth/login'],{replaceUrl:true});
    }, 500);
   }
   else{
    this.pwd.patchValue({
      old_pwd : "",
      new_pwd : "",
      confrim_pwd : ""
    });
   }
}
}
