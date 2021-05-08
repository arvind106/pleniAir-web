import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../../services/repository.service';
import { UserService } from '../../../services/user.service';
import { config } from '../../../constant';
import { CommonService } from "../../../services/common.service";
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import * as EmailValidator from 'email-validator';







@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss'],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ],
})
export class EditSessionComponent implements OnInit {

  photoApiEndPoint = config.USER_PHOTO;
  public session: any = {};
  sessionPeriod :any = [{ 'startTime': '', 'finishTime': '' }];
  columns: number[];
  TestVar = 0;
  pattern = "[0-9]{3}-[0-9]{2}-[0-9]{3}";
  cost: any;
  istrue = false;
  allCurrency: any;
  cureency: any;
  sessionId: any;
  selectedFile: any;
  eventArr: any;
  url: any;
  id: any;
  iscurrency = false;
  iscost = false;
  isError = false;
  selectStartDate: any;
  selectFinishDate: any;
  private albums = [];
  ischeck = false;
  getyear: any;
  mindate: Date;
  isRequired = false;

  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute,
    public date: DatePipe,
    public common: CommonService,
   
  ) {

  }

 
  ngOnInit() {
    this.mindate = new Date();
    this.getyear = this.mindate.getFullYear();
    this.columns = [0];
    this.sessionId = this.route.snapshot.params['_id'];
    this.getSessionbyId(this.sessionId);
  }
  async getSessionbyId(id) {
    const response = await this.repositoryService.GetSessionbyId(id);
    this.getAllCurrency();
    if (response) {
      this.session = response;
      if (this.session.maxParticipations == 'Unlimited') {
        this.ischeck = true;
      }
      if (this.session.cost == 'Free') {
        this.iscost = true;
      }
      this.selectStartDate = this.date.transform(response.startTime, 'MM/dd/yyyy hh:mm');
      this.selectFinishDate = this.date.transform(response.finishTime, 'MM/dd/yyyy hh:mm');
      for (var i = 0; i < response.sessionPeriod.length; i++) {
        this.session.sessionPeriod[i].startTime = this.date.transform(response.sessionPeriod[i].startTime, 'MM/dd/yyyy HH:mm');
        this.session.sessionPeriod[i].finishTime = this.date.transform(response.sessionPeriod[i].finishTime, 'MM/dd/yyyy HH:mm');
        // this.session.sessionPeriod[i].iosStartTime = this.date.transform(this.session.sessionPeriod[i].iosStartTime,'hh:mm');
        // this.session.sessionPeriod[i].iosFinishTime = this.date.transform(this.session.sessionPeriod[i].iosFinishTime,'hh:mm')
      }
      this.sessionPeriod = this.session.sessionPeriod;

    }

  }
  async getAllCurrency() {
    this.allCurrency = await this.repositoryService.getAllCurrency();
  }
  async Cancle() {
    this.router.navigate(['./sessions'], { replaceUrl: true });
  }
  keyPress(event: any) {
    const pattern = /[0-9\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onCheckboxChange(option, event) {

    if (event.target.checked) {
      this.session.maxParticipations = 'Unlimited';
    }
    else {
      this.session.maxParticipations = '';
      this.ischeck = false;
    }
  }

  async submit() {

    this.isError = false;
    this.session.sessionPeriod = this.sessionPeriod;

   if (this.session.title == '' || this.session.title == null) {
      this.common.showError("Please Enter Title");
      this.isError = true;
      return;
    }
    else if (this.session.cost == '' || this.session.cost == null) {
      this.common.showError("Please Enter Cost");
      this.isError = true;
      return;
    }
    else if (this.session.maxParticipations == '' || this.session.maxParticipations == null) {
      this.common.showError("Please Enter Maximum Participations Between 1-500");
      this.isError = true;
      return;
    }
    else if (this.session.materials == '' || this.session.materials == null) {
      this.common.showError("Please Enter Materials");
      this.isError = true;
      return;
    }
     else if (this.selectStartDate == null) {
      this.common.showError("Please Select Start Date and Time");
      this.isError = true;
      return;
    }
   else if (this.selectFinishDate == null) {
      this.common.showError("Please Select Finish Date and Time");
      this.isError = true;
      return;
    }
   if (this.session.startTime > this.session.finishTime) {
      this.common.showError("Start Date and Time should be less than Finish Date and Time");
      this.isError = true;
      return;
    }

    if (this.session.contactNo != '' && this.session.contactNo != null && this.session.contactNo.length <= 5) {
      this.common.showError("Please Enter Contact No Between 6 to 15 Digits");
      this.isError = true;
      return;
    }
   else if (this.session.contactNo != '' && this.session.contactNo != null && this.session.contactNo.length >16) {
      this.common.showError("Please Enter ContactNo Between 6 to 15 Digits");
      this.isError = true;
      return;
    }else if(this.session.cost == 'With charge' && (parseInt(this.session.costAmount) >10000 || parseInt(this.session.costAmount) <=0 )){
      this.common.showError("Please Enter Cost Amount Between 1-10000");
      this.isError = true;
      return;
    }else if(this.session.cost == 'With charge' && this.session.costAmount == '' || this.session.costAmount == null){
      this.common.showError("Please Enter Cost Amount Between 1-10000");
      this.isError = true;
      return;
    }
    else if (this.session.cost == 'With charge' && this.session.currency == ''){
      this.common.showError("Please Select Currency");
      this.isError = true;
      return;
    }
    if(this.isRequired){
      if(this.session.email =='' || this.session.contactNo ==''){
        this.common.showError('Please Enter Email and Contact Number');
        this.isError = true;
        return;
      }
    }

    if (this.session.email != '') {
      if (!EmailValidator.validate(this.session.email)) {
        this.common.showError("Please Enter Valid Email");
        this.isError = true;
        return;
      }
    }
    else if (this.session.cost == 'Free') {
      this.session.costAmount = 0;
      this.session.currency = '';
    } 
  
      for (var i = 0; i < this.session.sessionPeriod.length; i++) {
        this.session.sessionPeriod[i].startTime = this.date.transform(this.sessionPeriod[i].startTime, 'yyyy-MM-dd hh:mm');
         this.session.sessionPeriod[i].finishTime = this.date.transform(this.sessionPeriod[i].finishTime, 'yyyy-MM-dd hh:mm');
        if (this.session.sessionPeriod[i].startTime >= this.session.sessionPeriod[i].finishTime) {
          this.common.showError("Start Date and Time should be less than Finish Date and Time for" + (i + 1));
          this.isError = true;
          this.sessionPeriod[i].startTime = this.date.transform(this.session.sessionPeriod[i].startTime, 'MM/dd/yyyy hh:mm');
        this.sessionPeriod[i].finishTime = this.date.transform(this.session.sessionPeriod[i].finishTime, 'MM/dd/yyyy hh:mm');
          return;
        }
      }

    this.session.startTime = this.date.transform(this.selectStartDate, 'yyyy-MM-dd hh:mm');
    this.session.finishTime = this.date.transform(this.selectFinishDate, 'yyyy-MM-dd hh:mm');
    for (var i = 0; i < this.session.sessionPeriod.length; i++) {
      this.session.sessionPeriod[i].startTime = this.date.transform(this.session.sessionPeriod[i].startTime, 'yyyy-MM-dd hh:mm');
      this.session.sessionPeriod[i].startTime = this.session.sessionPeriod[i].startTime.trim();
      this.session.sessionPeriod[i].finishTime = this.date.transform(this.session.sessionPeriod[i].finishTime, 'yyyy-MM-dd hh:mm');
      this.session.sessionPeriod[i].finishTime = this.session.sessionPeriod[i].finishTime.trim();
      this.session.sessionPeriod[i].iosStartTime = this.date.transform(this.session.sessionPeriod[i].startTime,'hh:mm a');
      this.session.sessionPeriod[i].iosFinishTime = this.date.transform(this.session.sessionPeriod[i].finishTime,'hh:mm a');
    }
    this.session.photo = this.url;

    const sessions = JSON.stringify(this.session);
    const data = new FormData();
    data.append('data', sessions);
    if (this.url) {
      this.session.photo = this.url;
      for (let file of this.session.photo) {
        data.append('photo', file);
      }
    }
console.log("session",this.session);
    // if (!this.isError) {
    //   console.log("is error",this.isError)
    //   const response = await this.repositoryService.updateSession(this.sessionId, data);
    //   if (response) {
    //     setTimeout(() => {
    //       this.router.navigate(['./sessions'], { replaceUrl: true });
    //     }, 500)
    //   }
    //   else {
    //     setTimeout(() => {
    //       this.router.navigate(['./sessions'], { replaceUrl: true });

    //     }, 500)
    //   }


    // }

  }
  notifyChangeDate() {
    if (this.selectStartDate) {
      this.session.startTime = this.date.transform(this.selectStartDate, 'yyyy-MM-dd hh:mm a');
    }
  }
  notifyFinishDate() {
    if (this.selectFinishDate) {
      this.session.finishTime = this.date.transform(this.selectFinishDate, 'yyyy-MM-dd hh:mm a');
    }
  }

  async change(event) {

    if (event.target.value == 'Free') {
      this.session.costAmount = 0;
      this.session.currency = '';
      this.iscost = true;
    }
    else {
      if(event.target.value == 'Contact Me'){
        this.isRequired = true;
        this.iscost = true;
      }else{
        this.iscost = false;
      }
    }
  }

  onSelectFile1(event) {
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


  addColumn() {
    const l = this.sessionPeriod.length;
    this.columns.push(this.columns.length);
    this.sessionPeriod.push({ 'startTime': '', 'finishTime': '' });
  }

  removeColumn() {
    this.columns.splice(-1, 1);
    this.sessionPeriod.splice(this.sessionPeriod.length - 1, 1);
  }

  async addCurrency() {

    if (this.cureency == '' || this.cureency == undefined) {
      this.iscurrency = true;
      this.common.showError("Enter Currency");
    }
    else if (this.cureency != '') {
      for (var i = 0; i <= this.allCurrency.length; i++) {
        if (this.cureency == this.allCurrency[i].currency) {
          this.iscurrency = true;
          this.common.showError("Currency already exists");
        }
      }
    }
    const data = {
      "currency": this.cureency
    }
    if (!this.iscurrency) {
      const response = await this.repositoryService.addCurrency(data);
      if (response) {
        this.cureency = '';
        this.getAllCurrency();
        this.istrue = false;

      }
    }
  }
  deleteCurrency() {
    this.id = this.session.currency;
    swal({
      title: 'Are you sure, you want to delete Currency?',
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

        var session = await this.repositoryService.deleteCurrency(this.id);
        if (session) {
          this.common.showSuccess("Currency Deleted");
          this.router.navigate(['./edit-session']);
        } else {
          this.common.showError("Currency not Deleted");
        }
      } else {
      }
    });
  }
  add() {
    this.istrue = true;
  }
  cancleCurrency() {
    this.istrue = false;
  }
} 
