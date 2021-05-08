import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service'
import { UserService } from '../../services/user.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})

export class TermsConditionsComponent implements OnInit {
  Terms = { title: '', description: '',language_code:''};
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
    this.getTermsData(this.Terms.language_code);
      }
  async getTermsData(code) {
    const data = {
      "where":{
        "flag":"3",
        "language_code":code
          }
    };
    const result = await this.repositoryService.getQueryData(data);
    if(result){
      this.is_load = true;
      this.isDisabled = true;
    this.Terms.title = result[0].title;
    this.Terms.description = result[0].description;
    this.Terms.language_code =result[0].language_code;
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

  async TermsSave() {
    if (this.Terms.title == '') {
      this.common.showError('Please Enter Title');
      return;
    } else if (this.Terms.description == '' || this.BlankSpace) {
      this.common.showError('Please Enter Description');
      return;
    }else if (this.Terms.language_code == '') {
      this.common.showError('Please Select Language');
      return;
    }
    const result = await this.repositoryService.SaveTerms(this.Terms);
    if(result){
      this.Terms.title = "";
      this.Terms.description = "";
      this.Terms.language_code = '';
      this.is_load = false;
      this.isDisabled = false;
    }
  }
  async TermsClear() {
    this.Terms.title = "";
    this.Terms.description = "";
    this.Terms.language_code = "";
    this.isDisabled = false;
  
  }
}
