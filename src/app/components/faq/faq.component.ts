import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import swal from 'sweetalert2';
import { RepositoryService } from '../../services/repository.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})

export class FaqComponent implements OnInit {
  public faqs = [{ 'question': '', 'answer': '' }];
  constructor(
    public router: Router,
    public common: CommonService,
    public repositoryService: RepositoryService
  ) { }

  ngOnInit() {
    this.getAllfaq();
  }
  async getAllfaq() {
    const data ={
      "where":{
        "is_deleted": false
      },
        "sort":{"create_date":-1}
     };
    this.faqs = await this.repositoryService.getFaq(data);
  }
  async editFaq(id) {
    this.router.navigate(['./edit-faq', id]);
  }
  async delete(id) {
    swal({
      title: 'Are you sure, you want to delete FAQ?',
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
        var faq = await this.repositoryService.deleteFaq(id);
        if (faq) {
          await this.getAllfaq();
        }
      }
    });
  }
  Add() {
    this.router.navigate(['./add-faq']);
  }
}
