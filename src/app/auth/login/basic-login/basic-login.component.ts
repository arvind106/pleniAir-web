import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  loginData = { email: '', password: '' };
  data: any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  // translatePipe = new this.translatePipe();

  constructor(public router: Router, public userService: UserService, public common: CommonService) { }

  ngOnInit() {
    this.loginData.email = '';
    this.loginData.password = '';
    localStorage.clear();
  }
 

  async doLogin() {
    // return false;
    if (this.loginData.email.length <= 0) {
      this.common.showError('Please Enter Email');
      return;
    } else if (!EmailValidator.validate(this.loginData.email)) {
      this.common.showError('Please Enter Valid Email');
      return;
    }
    else if (this.loginData.password.length <= 0) {
      this.common.showError('Please Enter Password');
      return;
    }

    const user = await this.userService.login(this.loginData);
   if (user != null) {
         this.router.navigate(['./dashboard'], { replaceUrl: true });

   }
  }

}
