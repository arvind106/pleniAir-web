import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {config} from '../../../constant';
import {ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';

@Component({
  selector: 'app-get-fav-pop',
  templateUrl: './get-fav-pop.component.html',
  styleUrls: ['./get-fav-pop.component.scss']
})
export class GetFavPopComponent implements OnInit {

  pops = [];
  userId : any;
  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService : RepositoryService,
    public route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['_id'];
    this.getfavpop(this.userId);
  }
 async getfavpop(id){
   const data = {
    "where":{
      "userId":id,
      "is_favorite": true,
      "is_deleted": false
    }
   }
   const response = await this.userService.getFavPop(data);
   this.pops = response;
  }
  viewPop(id){
    this.router.navigate(['./pop/pop-list', id], { replaceUrl: true });
  }
}
