import { MenupopoverComponent } from './../menupopover/menupopover.component';
import { WidgetutilsService } from './../services/widgetutils.service';
import { HelperService } from './../services/helper.service';
import { FirebaseAuthService } from './../services/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfiliService } from '../services/profili.service';
import { PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;

  constructor( private autS: FirebaseAuthService, private helperService: HelperService,
               private profiliService: ProfiliService,
               private widgetUtilsService: WidgetutilsService) {

                }

  ngOnInit() {
    this.getProfile();
  }

  login() {
   if (this.helperService.isNativePlatform()) {
     try {
       this.autS.googleLoginNative();
     } catch (error) {
       console.log(error);
     }

   } else {
     try {
       this.autS.googleLoginWeb();
     } catch (error) {
       console.log(error);
     }
   }
  }

  logout() {
    this.autS.logOut();
    this.user = null;
  }

  getProfile() {
    try {
        this.autS.getLoggedInUser().subscribe( us => {
          if (us) {
            this.user = this.profiliService.getProfile(us.uid);
            console.log(this.user);
          }
        });

    } catch (error) {
      console.log(error);
    }
  }

  async presentPopover(ev: any) {
    await this.widgetUtilsService.presentPopover(ev , MenupopoverComponent);
  }



}
