import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { config } from '../../../constant';
import { RepositoryService } from '../../../services/repository.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  photoApiEndPoint = config.USER_PHOTO;
  user: object;
  userId: any;
  is_load = false;
  constructor(
    public router: Router,
    public userService: UserService,
    public route: ActivatedRoute,
    public repositoryService: RepositoryService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['_id'];
    this.getUserData(this.userId);
  }
  async getUserData(id) {
    const response = await this.userService.getUserbyId(id);
    if (response) {
      this.user =response;
      this.is_load = true;
    }
  }
  Cancel() {
    this.router.navigate(['./users']);
  }
}
