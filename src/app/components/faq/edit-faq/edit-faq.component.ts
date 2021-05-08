import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { RepositoryService } from '../../../services/repository.service';
@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFaqComponent implements OnInit {

  editFaq = { 'question': '', 'answer': '' ,'language_code':''};
  faqId: any;
  constructor(
    public router: Router,
    public common: CommonService,
    public repositoryService: RepositoryService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.faqId = this.route.snapshot.params['_id'];
    this.getfaqbyid(this.faqId);
  }

  async getfaqbyid(id) {
    const response = await this.repositoryService.getFaqbyId(id);
    this.editFaq.question = response.question;
    this.editFaq.answer = response.answer;
    this.editFaq.language_code = response.language_code;
  }

  async saveFaq() {
    if (this.editFaq.question == '') {
      this.common.showError("Please Enter Question");
      return;
    } else if (this.editFaq.answer == '') {
      this.common.showError("Please Enter Answer");
      return;
    }
    else if (this.editFaq.language_code == '') {
      this.common.showError("Please Select Language");
      return;
    }
    const response = await this.repositoryService.editFaq(this.editFaq, this.faqId);
    if (response != null) {
      this.router.navigate(['./faq'], { replaceUrl: true });
    }
  }

  async cancelFaq() {
    this.router.navigate(['./faq'], { replaceUrl: true });
  }
}