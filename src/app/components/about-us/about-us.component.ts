import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service'
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  Aboutus = { title: '', description: '', language_code: '' };
  BlankSpace = false;
  is_load = false;
  isDisabled = false;
  setLanguage;
  language = ['English', 'Hebrew', 'Spanish', 'French', 'Italian'];
  constructor(public router: Router, public repositoryService: RepositoryService, public route: ActivatedRoute, public common: CommonService, public userService: UserService) { }
  ngOnInit() {
    this.isDisabled = false;
  }
  getData() {
    this.getAboutUs(this.Aboutus.language_code);
  }
  async getAboutUs(code) {
    const data = {
      "where": {
        "flag": "1",
        "language_code": code
      }
    };
    const result = await this.repositoryService.getQueryData(data);
    if (result) {
      this.isDisabled = true;
      this.is_load = true;
      this.Aboutus.title = result[0].title;
      this.Aboutus.description = result[0].description;
      this.Aboutus.language_code = result[0].language_code;
      for (var i = 0; i <= this.language.length; i++) {
        if (result[0].language_code = 'en') {
          this.setLanguage = 'English';
        }
        else if (result[0].language_code = 'he') {
          this.setLanguage = 'Hebrew';
        } else if (result[0].language_code = 'es') {
          this.setLanguage = 'Spanish';
        }
        else if (result[0].language_code = 'fr') {
          this.setLanguage = 'French';
        }
        else if (result[0].language_code = 'it') {
          this.setLanguage = 'Italian';
        }
      }
    }


  }

  async AboutUsSave() {

    if (this.Aboutus.title == null || this.Aboutus.title == "undefined" || this.Aboutus.title.trim() == '') {
      this.common.showError('Please Enter Title');
      return;
    } else if (this.Aboutus.description == null || this.Aboutus.description == "undefined" || this.Aboutus.description.trim() == '' || this.BlankSpace) {
      this.common.showError('Please Enter Description');
      return;
    } else if (this.Aboutus.language_code == '') {
      this.common.showError('Please Select Language');
      return;
    }

    const result = await this.repositoryService.SaveAboutUs(this.Aboutus);
    if (result) {
      this.Aboutus.title = '';
      this.Aboutus.description = '';
      this.Aboutus.language_code = '';
      this.is_load = false;
      this.isDisabled = false;
    }
  }
  async AboutUsClear() {
    this.Aboutus.title = '';
    this.Aboutus.description = '';
    this.Aboutus.language_code = "";
    this.isDisabled = false;
  }
}