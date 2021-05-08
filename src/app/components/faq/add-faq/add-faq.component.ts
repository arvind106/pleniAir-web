import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { RepositoryService } from '../../../services/repository.service';
@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
  addFaq = { 'question': '', 'answer': '' ,'language_code':''}
  BlankSpace = false;
  constructor(
    public router: Router,
    public common: CommonService,
    public repositoryService: RepositoryService
  ) { }

  ngOnInit() {
  }

  async saveFaq() {
    if (this.addFaq.question === "" || this.addFaq.question.trim() == '') {
      this.common.showError("Enter Question");
      return;
    } else if (this.addFaq.answer === "" || this.addFaq.answer.trim() == '') {
      this.common.showError("Enter Answer");
      return;
    } else if (this.addFaq.language_code == '') {
      this.common.showError("Please Select Language");
      return;
    }
    const response = await this.repositoryService.addFaq(this.addFaq);
    if(response){
      this.router.navigate(['./faq'], { replaceUrl: true });
    }
  }
  async cancelFaq() {
    this.addFaq.question = '';
    this.addFaq.answer = '';
    this.router.navigate(['./faq'], { replaceUrl: true });
  }
}