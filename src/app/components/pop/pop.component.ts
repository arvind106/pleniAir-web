import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { config } from '../../constant';
import swal from 'sweetalert2';
import { RepositoryService } from '../../services/repository.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {

  photoApiEndPoint = config.USER_PHOTO;
  public pops =[];

  constructor(
    public router: Router,
    public userService: UserService,
    public repositoryService: RepositoryService,
    public common: CommonService,


  ) { }

  ngOnInit() {
    this.getAllPOPData();
  }
  async getAllPOPData() {
    const data ={
      "where":{
        "is_deleted":false
      },
        "sort":{"create_date":-1}
     };
    const pop = await this.userService.GetPopData(data);
    if(pop && pop.length>0){
      this.pops = pop
    }else{
      this.pops =[];
    }
  }
  async GoToEdit(id) {
    this.router.navigate(['./pop/pop-list', id], { replaceUrl: true });
  }
  async editPop(id) {
    this.router.navigate(['./pop/edit-pop', id], { replaceUrl: true });
  }
  async deletePop(id) {
    swal({
      title: 'Are you sure, you want to delete New pleinAir Location?',
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
        var pop1 = await this.repositoryService.deletePop(id);
        if (pop1) {
          this.common.showSuccess("New pleinAir Location Deleted");
          await this.getAllPOPData();
        } else {
          this.common.showError("New pleinAir Location not Deleted");
        }
      }
    });
  }
}
