import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service'
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  
  Privacy = { title: '', description: '',language_code:'' };
  BlankSpace = false;
  is_load = false;
  isDisabled = false;
  setLanguage;
language = ['English','Hebrew','Spanish','French','Italian'];

  constructor(
    public router: Router,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute,
    public common: CommonService,
    public userService: UserService
  ) { }

  ngOnInit() {
   this.isDisabled = false;
  }
  getData(){
    this.getPrivacydata(this.Privacy.language_code);
      }
  async getPrivacydata(code) {
    const data = {
      "where":{
        "flag":"2",
        "language_code":code
          }
    };
    const result = await this.repositoryService.getQueryData(data);
    if(result){
      this.is_load = true;
      this.isDisabled = true;
    this.Privacy.title = result[0].title;
    this.Privacy.description = result[0].description;
    this.Privacy.language_code =result[0].language_code;
    for(var i =0;i<=this.language.length ;i++){
      if(result[0].language_code = 'en'){
        this.setLanguage = 'English';
      }
      else if(result[0].language_code = 'he'){
        this.setLanguage = 'Hebrew';
      } else if(result[0].language_code = 'es'){
        this.setLanguage = 'Spanish';
      }
      else if(result[0].language_code = 'fr'){
        this.setLanguage = 'French';
      }
      else if(result[0].language_code = 'it'){
        this.setLanguage = 'Italian';
      }
    }
  }
  }
  async PrivacySave() {
    if (this.Privacy.title == '') {
      this.common.showError('Please Enter Title');
      return;
    }
    else if (this.Privacy.description == null) {
      this.common.showError('Please Enter Description');
      return;
    } else if (this.Privacy.language_code == '') {
      this.common.showError('Please Select Language');
      return;
    }
    const result = await this.repositoryService.SavePrivacyPolicy(this.Privacy);
    if (result != null) {
      this.Privacy.title = "";
    this.Privacy.description = "";
    this.Privacy.language_code = '';
    this.is_load = false;
    this.isDisabled = false;
    }
  }
  async PrivacyClear() {
    this.Privacy.title = "";
    this.Privacy.description = "";
    this.Privacy.language_code = "";
    this.isDisabled = false;
    
  }
}
