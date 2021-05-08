import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RepositoryService } from '../../../services/repository.service';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../../services/common.service';
import { config } from "../../../constant";

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})
export class EditAnnouncementComponent implements OnInit {

  id: any;
  BlankSpace = false;
  data: any = { 'title': '', 'description': '','date':'','photo':'' };
  selectDate;
  url :any;
  photoApiEndPoint = config.PHOTO_ENDPOINT;
  selectedFile : any;
  mindate: Date;
  getyear: any;
  Image;

  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute,
    public date: DatePipe,
    public common: CommonService
  ) { }

  ngOnInit() {
    this.mindate = new Date();
    this.getyear = this.mindate.getFullYear();
    this.id = this.route.snapshot.params['_id'];
    this.getAnnouncement(this.id);
  }
  async getAnnouncement(id) {
    const response = await this.repositoryService.getAnnoucement(id);
    if (response) {
      this.data = response;

      this.selectDate = this.date.transform(response.date, 'MM/dd/yyyy')
     }
  }
  onSelectFile(event) {
    switch (event.target.files[0].type) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/jpg':
        break;
      default:
        this.Image='';
        this.common.showError('Only jpeg and png image formats are allowed');
        return false;
    }
    this.selectedFile = event.target.files[0];// called each time file input changes

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = this.selectedFile;

      }
    }
  }
  async notifyChangeDate() {
    if (this.selectDate) {
      this.data.date = this.selectDate;
    }
  }
  async submit() {
    if (this.data.title == null || this.data.title == "undefined" || this.data.title.trim() == '') {
      this.common.showError('Please Enter Title');
      return;
    } else if (this.data.description == null || this.data.description == "undefined" || this.data.description.trim() == '' || this.BlankSpace) {
      this.common.showError('Please Enter Description');
      return;
    } else if (this.selectDate == null || this.selectDate == '') {
      this.common.showError("Please Select Date");
      return;
    }
    this.data.date = this.date.transform(this.selectDate, 'yyyy-MM-dd');
    const announcement = JSON.stringify(this.data);
    const Data = new FormData();
    Data.append('data',announcement);
    if(this.url)
    {
      Data.append('photo',this.url);
    }
    const response = await this.repositoryService.editAnnouncement(Data, this.id);
    if (response) {
      this.router.navigate(['./announcement'], { replaceUrl: true });
    }
  }
  async cancel() {
    this.router.navigate(['./announcement'], { replaceUrl: true });
  }
}
