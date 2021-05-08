import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RepositoryService } from '../../../services/repository.service';
import { DatePipe } from '@angular/common';
import { config } from '../../../constant';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss']
})
export class ViewAnnouncementComponent implements OnInit {

  announcementData = { 'title': '', 'description': '', 'date': '', 'photo': '' };
  photoApiEndPoint = config.PHOTO_ENDPOINT;
  selectDate: any;
  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute,
    public date: DatePipe
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['_id'];
    this.getannouncment(id);
  }
  async getannouncment(id) {
    const response = await this.repositoryService.getAnnoucement(id);
    if (response) {
      this.announcementData = response;
      const d = response.date;
      this.selectDate = this.date.transform(d, 'MM/dd/yyyy')
    }
  }
  async cancel() {
    this.router.navigate(['./announcement'], { replaceUrl: true });
  }
}
