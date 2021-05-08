import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { config } from '../../../constant';
import { RepositoryService } from '../../../services/repository.service';
@Component({
  selector: 'app-pop-list',
  templateUrl: './pop-list.component.html',
  styleUrls: ['./pop-list.component.scss']
})
export class PopListComponent implements OnInit {

  photoApiEndPoint = config.PHOTO_ENDPOINT;
  public pop: any;
  popId;
  is_load = false;

  constructor(public router: Router, public userService: UserService, public repositoryService: RepositoryService, public route: ActivatedRoute){ }

  ngOnInit() {
    this.popId = this.route.snapshot.params['_id'];
    this.getAllPOPData(this.popId);
  }
  async getAllPOPData(id) {
    const response = await this.repositoryService.GetPopbyId(id);
    this.pop = response;
    if (this.pop) {
      this.is_load = true;
    }
    
  }
  async Cancle() {
    this.router.navigate(['./pop']);
  }
}
