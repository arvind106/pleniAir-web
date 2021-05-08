import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service'
import { config } from '../../constant';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  
  contacts = [{}];
  constructor(
    public router: Router,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute,
    public common: CommonService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getContactList();
  }

  async getContactList()
  {
    var json ={
      "sort":{"create_date":-1}
    }
      const response = await this.repositoryService.getContacts(json);
      this.contacts =response;
  }
}
