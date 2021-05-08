import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { config } from '../../constant';
import { CommonService } from '../../services/common.service';
import { RepositoryService } from '../../services/repository.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  photoApiEndPoint = config.USER_PHOTO;

  stauts = false;
  staust1 = true;
  public users: any;
  constructor(
    public router: Router,
    public userService: UserService,
    public common: CommonService,
    public repositoryService: RepositoryService,

  ) { }

  ngOnInit() {
    this.getAllUsersData();
  }
  async getAllUsersData() {
    this.users = await this.userService.GetUserData();
  }
  async blockUnblock(user) {
    if (user.isBlocked == true) {
      var json = {
        "isBlocked": false
      }
    } else if (user.isBlocked == false) {
      var json = {
        "isBlocked": true
      }
    }
    const userDetails = await this.userService.blockUnblockUser(json, user._id);
    const result = JSON.parse(JSON.stringify(userDetails));
    if (result.data) {
      this.getAllUsersData();
      if (result.data.isBlocked) {
        this.common.showError("User Blocked");
      }
      else if (!result.data.isBlocked) {
        this.common.showSuccess("User Unblocked");
      }
    }
  }
  async GoToEdit(id) {
    this.router.navigate(['./users/user-list', id]);
  }
  async Delete(id) {
    swal({
      title: 'Are you sure, you want to delete User?',
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
        var user = await this.userService.deleteuser(id);
        if (user) {
          
          this.getAllUsersData();
        }
      } else {
      }
    });
  }
  GetFavouritepop(id){
    this.router.navigate(['/users/get-fav-pop',id],{replaceUrl : true});
  }
  GetFavouritesession(id){
    this.router.navigate(['/users/get-fav-session',id],{replaceUrl:true});
  }
}