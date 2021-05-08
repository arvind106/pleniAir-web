/*****************
* @Project - Pleinair
* @Comapny - Samcom Technobrains.
* @author - Viraj Anil Gujar (#VAG)
* @email - viraj@samcomtechnobrains.com
* @Created_Date - Unknown
* @Updated_Date - 30-May-19
* For Admin panel login.
******************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { config } from '../../constant';
import swal from 'sweetalert2';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})

export class SessionsComponent implements OnInit {
  photoApiEndPoint = config.USER_PHOTO;
  public Sessions=[];
  status: boolean = false;
  status1: boolean = false
  is_load = false;
  keys: any;
  isPublic = true;

  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    public common: CommonService,

  ) { }

  ngOnInit() {
      this.getPublicSession();
  }

  async getPublicSession() {
    this.status = true;
    this.isPublic = true;
    this.status1 = false;
    const data = {
      "where":{  
       "SessionType":"public",
       "is_deleted": false
        },
        "sort":{"create_date":-1},
     };
     const sessions = await this.userService.GetSessionDatabyType(data);
     if(sessions && sessions.length>0){
       this.Sessions = sessions
     }else{
       this.Sessions =[];
     }
   }

  async getPrivateSession() {
    this.status = false;
    this.isPublic = false;
    this.status1 = true;
    const data = {
      "where": {
        "SessionType": "private",
        "is_deleted": false
      },
      "sort":{"create_date":-1},
    };
    const privateSession = await this.userService.GetSessionDatabyType(data);
    if(privateSession && privateSession.length>0){
      this.Sessions = privateSession;
    }else{
      this.Sessions = [];
    }    

  }
  async GoToEditUser(id) {
    this.router.navigate(['./sessions/session-view', id], { replaceUrl: true });
  }
  async deleteSession(id) {
    swal({
      title: 'Are you sure, you want to delete New PleinAir Session?',
      // text: 'You not be able to revert this!',
      type: 'warning',
      width: '600px',
      showCancelButton: true,
      confirmButtonColor: '#9fa670',
      confirmButtonText: 'DELETE',
      cancelButtonText: 'CANCEL',
      cancelButtonColor: '#e74c3c',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-outline-primary mr-sm'
    }).then(async (result) => {
      if (result.value) {
        var session = await this.repositoryService.deletesession(id);
        if (session) {
          this.common.showSuccess("New PleinAir Session Deleted");
          if (session.SessionType == 'public') {
            this.ngOnInit();
          } else {
            this.getPrivateSession();
          }
        } else {
        }
      } 
    });
  }
  async editSession(id) {
    this.router.navigate(['./sessions/edit-session', id], { replaceUrl: true });
  }

}
