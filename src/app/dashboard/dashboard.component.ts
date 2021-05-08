import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CanvasJS from '../../assets/canvasjs.min';
import { config } from '../constant';
import { RepositoryService } from '../services/repository.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  IsLoggedIn = false;
  getDashboardData : any;
  constructor(private router: Router,public repositoryService: RepositoryService) {

    if (localStorage.getItem('token') != null && localStorage.getItem('token') !== 'undefined') {
      this.IsLoggedIn = true;

    }
    else {
      this.router.navigate(['./auth/login']);
    }
  }
async  ngOnInit() {

     await this.getDashboard ();
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "PleinAir Report",
        fontSize: 24,
        padding: {
          top: 15
        },
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y}",
        legendText: "{name}",
			  indexLabel: "{name} ({y})",
		  	// yValueFormatString:"",
        // indexLabel: "{name} - #percent%",
        dataPoints: [
          {y:this.getDashboardData.sessionCount ? this.getDashboardData.sessionCount : 0, name: "New PleinAir Session" ,},
            {y: this.getDashboardData.popCount ?  this.getDashboardData.popCount : 0, name: "New PleinAir Location"},
            {y: this.getDashboardData.userCount ? this.getDashboardData.userCount : 0, name: "User"},
            {y: this.getDashboardData.fvrtPopCount ? this.getDashboardData.fvrtPopCount : 0, name: "Favourite PleinAir Location"},
            {y: this.getDashboardData.fvrtSessionCount ? this.getDashboardData.fvrtSessionCount : 0, name: "Favourite PleinAir Session"},
            {y: this.getDashboardData.bookingCoun ? this.getDashboardData.bookingCoun : 0, name: "Booked PleinAir Session"},
            {y: this.getDashboardData.paintingCount ? this.getDashboardData.paintingCount : 0, name: "Paintings"},

        ]
      }]

    });

    chart.render();

  }

  async getDashboard(){
    this.getDashboardData = await this.repositoryService.getDashboardData();

  }

}
