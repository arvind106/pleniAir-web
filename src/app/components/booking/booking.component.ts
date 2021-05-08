import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public users = [];

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
    const data = {
      "isdeleted":false
    }
    const response = await this.repositoryService.getBookingUser(data);
    if(response){
   this.users = response;
    }
  }
  async getBookingDetails(id){
    this.router.navigate(['./booking/get-booking',id],{replaceUrl:true});
    
  }
}
