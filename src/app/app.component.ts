import { Component, HostListener} from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:onbeforeunload', ['$event'])
  unloadHandler(event) {
    localStorage.clear();
}
  IsLoggedIn = false;

  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }
    });
    if (localStorage.getItem('token') != null && localStorage.getItem('token') !== 'undefined') {
      this.IsLoggedIn = true;
    }
    else {
      this.GoToLogin();
    }
  }

  GoToLogin() {
    this.router.navigate(['./auth/login']);
  }
}