import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service'
import { RepositoryService } from '../../services/repository.service';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  announcementList: any;
  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    private common: CommonService,
  ) { }

  ngOnInit() {
    this.getAnnouncement();
  }

  /*redirect to add announcement */
  async add() {
    this.router.navigate(['/announcement/add-announcement'], { replaceUrl: true });
  }
  /*get announcement list */
  async getAnnouncement() {
    const data = {
      "where": {
        "is_deleted": false
      },
      "sort": { "create_date": -1 }
    };
    const response = await this.userService.getAnnouncment(data);
    if (response) {
      this.announcementList = response;
    }


  }
  /*redirect to edit */
  async Edit(id) {
    this.router.navigate(['./announcement/edit-announcement', id], { replaceUrl: true });
  }
  /*redirect to view */
  async view(id) {
    this.router.navigate(['./announcement/view-announcement', id], { replaceUrl: true });
  }

  /*delete announcement */
  async delete(id) {
    swal({
      title: 'Are you sure, you want to delete ?',
      // text: 'You not be able to revert this!',
      type: 'warning',
      width: '600px',
      showCancelButton: true,
      confirmButtonColor: '#9fa670',
      confirmButtonText: 'DELETE',
      cancelButtonText: 'CANCEL',
      cancelButtonColor: '#e74c3c',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-outline-primary mr-sm'
    }).then(async (result) => {
      if (result.value) {
        var ann = await this.repositoryService.deleteAnnouncement(id);
        if (ann) {
          await this.getAnnouncement();
        } else {
          this.common.showError("Announcement not deleted");
        }
      } else {
      }
    });
  }
}
