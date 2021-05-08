import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { config } from '../../constant';
import { CommonService } from '../../services/common.service';
import { RepositoryService } from '../../services/repository.service';
@Component({
  selector: 'app-fav-session',
  templateUrl: './fav-session.component.html',
  styleUrls: ['./fav-session.component.scss']
})
export class FavSessionComponent implements OnInit {

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
      "where":{
      	"is_deleted":true,
          }
}
    const response = await this.repositoryService.getUserforFavSession(data);
    if(response){
    this.users = response;
     }
  }
  async GetFavouritesession(id){
    this.router.navigate(['./fav-session/get-fav-session',id],{replaceUrl : true});
    
  }
}
