import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import { RepositoryService } from "../../services/repository.service";
import { MenuItems } from '../../shared/menu-items/menu-items';
import { ConfirmationService } from 'primeng/components/common/api';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { config } from "../../constant";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  chatToggle = 'out';
  chatInnerToggle = 'off';
  innerHeight: string;
  isScrolled = false;
  isCollapsedSideBar = 'no-block';
  isCollapsedMobile = 'no-block';
  toggleOn = true;
  windowWidth: number;
  UserName = '';
  Profile = '';
  userId = localStorage.getItem('userId');
  UserData: any = {};
  url = '';
  ApiEndPoint = config.PHOTO_ENDPOINT;;
  @ViewChild('searchFriends') search_friends: ElementRef;
  @ViewChild('toggleButton') toggle_button: ElementRef;
  @ViewChild('sideMenu') side_menu: ElementRef;

  config: any;

  constructor(public menuItems: MenuItems,
    public confirmationService: ConfirmationService,
    private router: Router,
    public common: CommonService,
    public repositoryService: RepositoryService,
  ) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
  }

  ngOnInit() {

    this.getUserId(this.userId);
    if (localStorage.getItem('username') != null && localStorage.getItem('username') !== 'undefined') {
    }
  }
  async getUserId(id) {
    const getData = await this.repositoryService.GetDataByID(id)
    this.UserData.name = getData.name;
    this.UserData.email = getData.email;
    this.UserData.photo = getData.photo;
    const a = getData.photo;
    const b = a;
    const photo = b;
    this.url = this.ApiEndPoint + photo;
    this.UserData.password = getData.password;
  }
  confirmLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure want to logout ?',
      header: 'Logout',
      icon: 'fa fa-info-circle',
      accept: () => {
        this.common.showSuccess('Logout Successfully');
        this.router.navigate(['/auth/login']);
        localStorage.clear();
      }
    });
  }
  openchangepwd() {
    this.router.navigate(['./change-password'], { replaceUrl: true });
  }
  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }
  openEditProfile() {
    this.router.navigate(['./edit-profile'], { replaceUrl: true });
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    if (reSizeFlag) {
      this.setMenuAttributs(this.windowWidth);
    }
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'collapsed';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }
  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'collapsed' : 'expanded';
    }
  }
  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

}
