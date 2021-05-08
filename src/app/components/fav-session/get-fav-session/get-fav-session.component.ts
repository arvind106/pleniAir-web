import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {config} from '../../../constant';
import {ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';

@Component({
  selector: 'app-get-fav-session',
  templateUrl: './get-fav-session.component.html',
  styleUrls: ['./get-fav-session.component.scss']
})
export class GetFavSessionComponent implements OnInit {
Sessions : any;
userId : any;

  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService : RepositoryService,
    public route : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['_id'];
    this.getfavsession(this.userId);
  }
  async getfavsession(id){
    const data = {
     "where":{
       "userId":id,
       "is_favorite": true,
       "is_deleted": false
     }
    }
    const response = await this.userService.getFavSession(data);
    this.Sessions = response;
   }
   viewSession(id){
    this.router.navigate(['./sessions/session-view', id], { replaceUrl: true });
   }
}
