import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-fav-pop',
  templateUrl: './fav-pop.component.html',
  styleUrls: ['./fav-pop.component.scss']
})
export class FavPopComponent implements OnInit {
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
    const response = await this.repositoryService.GetUserFavPOP();
    if(response){
   this.users = response;
    }
  }
  async GetFavouritepop(id){
    this.router.navigate(['./fav-pop/get-fav-pop',id],{replaceUrl:true});
    
  }

}
