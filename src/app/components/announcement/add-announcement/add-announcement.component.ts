import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';
import { CommonService } from '../../../services/common.service';
import { config } from "../../../constant";
@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {

  announcement: any = { 'title': '', 'description': '', 'date': '','photo' :'' };
  selectDate: Object;
  BlankSpace = false;
  url :any;
  photoApiEndPoint = config.PHOTO_ENDPOINT;
  selectedFile : any;
  mindate : Date;
  getyear: any;
  Image;

  constructor(public router: Router, public repositoryService: RepositoryService, public common: CommonService
  ) { }

  ngOnInit() {
    this.mindate = new Date();
    this.getyear = this.mindate.getFullYear();
   }

  notifyChangeDate() {
    if (this.selectDate) {
      const date = this.selectDate;
      this.announcement.date = this.selectDate;
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

  async submit() {
    if (this.announcement.title == null || this.announcement.title == "undefined" || this.announcement.title.trim() == '') {
      this.common.showError('Please Enter Title');
      return;
    } else if (this.announcement.description == null || this.announcement.description == "undefined" || this.announcement.description.trim() == '' || this.BlankSpace) {
      this.common.showError('Please Enter Description');
      return;
    } else if (this.selectDate == null || this.selectDate == '') {
      this.common.showError("Please Select Date");
      return;
    }
   const announcement = JSON.stringify(this.announcement);
    const data = new FormData();
    data.append('data',announcement);
    if(this.url){
      data.append('photo',this.url);
    }
    const response = await this.repositoryService.addAnnouncement(data);
    if (response) {
      this.router.navigate(['./announcement'], { replaceUrl: true })
    }
  }
  async cancel() {
    this.router.navigate(['./announcement']);
  }
}
