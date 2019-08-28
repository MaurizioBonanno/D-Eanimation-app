import { HelperService } from './../services/helper.service';
import { FirebaseAuthService } from './../services/firebase-auth.service';
import { WidgetutilsService } from './../services/widgetutils.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menupopover',
  templateUrl: './menupopover.component.html',
  styleUrls: ['./menupopover.component.scss'],
})
export class MenupopoverComponent implements OnInit {

  isAutenticated = false ;
  myUser: any;

  constructor(private wus: WidgetutilsService,
              private autService: FirebaseAuthService,
              private helperService: HelperService) {
      this.getAutenticated();
   }

  ngOnInit() {}

  getAutenticated() {
    this.autService.getLoggedInUser().subscribe(user => {
      if (user) {
        this.isAutenticated = true;
        this.myUser = user;
        console.log(this.myUser);
      } else {
        this.isAutenticated = false;
        this.myUser = null;
      }
    });
  }

  logOut() {
    this.autService.logOut();
    this.isAutenticated = false;
    this.getAutenticated();
  }

  logIn() {
    if (this.helperService.isNativePlatform()) {
      try {
        this.autService.googleLoginNative();
      } catch (error) {
        console.log(error);
      }
 
    } else {
      try {
        this.autService.googleLoginWeb();
      } catch (error) {
        console.log(error);
      }
    }
  }

}
