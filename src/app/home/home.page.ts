import { PopoverController } from '@ionic/angular';
import { MenupopoverComponent } from './../menupopover/menupopover.component';


import { WidgetutilsService } from './../services/widgetutils.service';
import { NewsService } from './../services/news.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  newsList: Array<any> = [];
  newstListAvailable = false;

  constructor(private nS: NewsService, private popoverController: PopoverController, private widgetUs: WidgetutilsService ) {
    this.getNewsList();
  }

  getNewsList() {
    this.newstListAvailable = false;
    this.nS.getNewstList().subscribe( result => {
      this.newsList = result;
      console.log(result);
      this.newstListAvailable = true;
    }, (error) => {
     console.log(error);
    });

  }



}
