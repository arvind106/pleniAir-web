import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {config} from '../../../constant';
import {ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.scss']
})
export class SessionViewComponent implements OnInit {

  photoApiEndPoint = config.PHOTO_ENDPOINT;
  public session : any;
  allCurrency : any;
  sessionId : any;
  is_load = false;
  iscost = false;
  iscontact=false;

  constructor(
   
    public router: Router,
    public userService: UserService,
    public repositoryService : RepositoryService,
    public route : ActivatedRoute,
    private datePipe: DatePipe
   
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.params['_id'];
    this.getSessionbyId(this.sessionId);
  }

  async getSessionbyId(id)
  {
    this.session = await this.repositoryService.GetSessionbyId(id);
    if(this.session){
      this.is_load =true;
      if(this.session.cost == 'Free'){
        this.iscost = true;
      }
      if(this.session.cost == 'Contact Me'){
        this.iscontact = true;
      }
    }
   
  }
 
  async Cancle()
  {
    this.router.navigate(['./sessions'],{replaceUrl:true});
  }
}
