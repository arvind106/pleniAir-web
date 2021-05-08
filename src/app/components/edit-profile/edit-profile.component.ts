import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RepositoryService } from "../../services/repository.service";
import { CommonService } from "../../services/common.service";
import { HttpClient } from "@angular/common/http";
import { config } from "../../constant";
import { AdminComponent } from "../../layouts/admin/admin.component";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userId = localStorage.getItem('userId');
  ApiEndPoint = config.PHOTO_ENDPOINT;
  UserData: any = {};
  selectedFile: File;
  url: any
  eventArr: any;
  urlImg: any;

  constructor(
    public router: Router,
    public repositoryService: RepositoryService,
    public common: CommonService,
    public route: ActivatedRoute,
    public http: HttpClient,
    public adminlayout: AdminComponent,

  ) { }

  ngOnInit() {
    if (this.userId) {
      this.getUserId(this.userId);
    }
  }

  async getUserId(id) {
    const getData = await this.repositoryService.GetDataByID(id);
    this.UserData.name = getData.name;
    this.UserData.email = getData.email;
    this.UserData.photo = getData.photo;
    this.UserData.password = getData.password;
    const a = getData.photo;
    const b = a;
    const photo = b;
    this.url = this.ApiEndPoint + photo;
  }

  onCancel() {
    this.router.navigate(['./dashboard'], { replaceUrl: true })
  }

  onSelectFile(event) {
    switch (event.target.files[0].type) {
      case 'image/png':
      case 'image/jpeg':
      case 'image/jpg':
        break;
      default:
        this.common.showError('Only jpeg and png image formats are allowed');
        return false;
    }
    this.selectedFile = event.target.files[0];// called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.eventArr = event.target;
        this.urlImg = this.selectedFile;
        this.url = this.eventArr.result;
      }
    }
  }

  async UserSave(data) {

    if (this.UserData.name == '') {
      this.common.showError('Please Enter Name');
      return;
    }
    const formdata = new FormData();
    formdata.append('photo', this.urlImg);
    formdata.append('name', this.UserData.name);
    formdata.append('email', this.UserData.email);
    formdata.append('password', this.UserData.password);
    formdata.append('_id', this.userId);
    if(formdata){
      const result = await this.repositoryService.UpdateData(formdata);
      if(result){
        localStorage.setItem('username', result.name);
        localStorage.setItem('email', result.email);
        this.router.navigate(['/dashboard']);
        this.adminlayout.ngOnInit();
      }
    }
  }
}
