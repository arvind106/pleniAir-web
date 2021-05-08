import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';

@Component({
  selector: 'app-get-booking',
  templateUrl: './get-booking.component.html',
  styleUrls: ['./get-booking.component.scss']
})
export class GetBookingComponent implements OnInit {

  bookings : [];
  userId : any;
  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService : RepositoryService,
    public route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['_id'];
    this.getBookings(this.userId);
  }
  async getBookings(id){
    const data = {
      "where":{
      	"is_deleted":false,
      	"userId":id
          }
}
    const response = await this.repositoryService.getBookings(data);
    this.bookings = response;
 
   }
   viewSession(id){
    this.router.navigate(['./sessions/session-view', id], { replaceUrl: true });
   }
}
