import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';
import { UserService } from '../../../services/user.service';
import { config } from '../../../constant';
import { CommonService } from "../../../services/common.service";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-pop',
  templateUrl: './edit-pop.component.html',
  styleUrls: ['./edit-pop.component.scss']
})
export class EditPopComponent implements OnInit {

  public pop: any = {};
  photoApiEndPoint = config.USER_PHOTO;
  popId: any;
  poplist = [];
  ismorning;
  ismidday;
  issunset;
  checked = false;
  selectedFile: any;
  eventArr: any;
  url: any;
  checkedList = [];
  paintingArr: any;
  paintingurl: any;


  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute,
    public date: DatePipe,
    public common: CommonService,
  ) { }

  ngOnInit() {
    this.checkedList = [];
    this.popId = this.route.snapshot.params['_id'];
    this.getAllPOPData(this.popId);
  }

  async getAllPOPData(id) {
    const response = await this.repositoryService.GetPopbyId(id);
    this.pop = response;
    for (let i = 0; i <= 3; i++) {
      if (response.hourForPainting[i] == 'Morning') {
        this.ismorning = 'Morning';
      } else if (response.hourForPainting[i] == 'Afternoon') {
        this.issunset = 'Afternoon';
      } else if (response.hourForPainting[i] == 'Midday') {
        this.ismidday = 'Midday';
      }
    }
    this.checkedList = response.hourForPainting;
  }
  async Cancle() {
    this.router.navigate(['./pop']);
  }
  onCheckboxChange(option, event) {

    if (event.target.checked) {
      this.checkedList.push(option);
    } else {
      for (var i = 0; i < 3; i++) {
        if (this.checkedList[i] == option) {
          this.checkedList.splice(i, 1);
        }
      }
    }
  }

   submit() {

    if (this.pop.title == '' || this.pop.title == null) {
      this.common.showError("Please Enter Title");
      return;
    }
    // else if (this.pop.description == '' || this.pop.description == null) {
    //   this.common.showError("Please Enter Description");
    //   return;
    // }
    else if(this.pop.address == '' || this.pop.address == null){
      this.common.showError("Please Enter Location");
      return;
    }
    this.pop.hourForPainting = this.checkedList.sort();
    this.pop.hourForPainting = this.checkedList.reverse();
    const pops = JSON.stringify(this.pop);
    console.log("painting",this.pop.hourForPainting)
    const data = new FormData();
    data.append('data', pops);
    if (this.url) {
      this.pop.photo = this.url;
      for (let file of this.pop.photo) {
        data.append('photo', file);
      }
    }
    if(this.paintingurl){
      this.pop.painting = this.paintingurl;
      for(let file of this.pop.painting){
        data.append('painting',file);
      }
    }
    const response =  this.repositoryService.updatePop(this.popId, data);
    if (response) {
      setTimeout(() => {
        this.router.navigate(['./pop'], { replaceUrl: true });
      }, 500)
    }
    else {
      setTimeout(() => {
        this.router.navigate(['./pop'], { replaceUrl: true });
      }, 500)
    }
  }
  onSelectFile1(event,data) {
    if(data=='photo'){
      switch (event.target.files[0].type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
          break;
        default:
          this.common.showError('Only jpeg and png image formats are allowed');
          return false;
      }
      if(event.target.files.length > 5){
        this.common.showError("Maximum 5 Images are allowed.");
        return;
      }
      this.selectedFile = event.target.files;// called each time file input changes
  
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.eventArr = event.target;
          this.url = this.selectedFile;
        }
      }
    }
    else if(data=='painting'){
      switch (event.target.files[0].type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
          break;
        default:
          this.common.showError('Only jpeg and png image formats are allowed');
          return false;
      }
      if(event.target.files.length > 5){
        this.common.showError("Maximum 5 Images are allowed.");
        return;
      }
      this.selectedFile = event.target.files;// called each time file input changes
  
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.paintingArr = event.target;
          this.paintingurl = this.selectedFile;
        }
      }
    }
    
  }
}
