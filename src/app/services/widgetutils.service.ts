import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { PopoverController , ToastController} from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { toastController } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetutilsService {

  constructor(private popOverController: PopoverController,
              private toastrService: ToastrService,
              private helperService: HelperService) { }

  async presentPopover( ev: any , comp ) {
    const popover = await this.popOverController.create({
      component: comp,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async dismissPopover() {
    await this.popOverController.dismiss();
  }

  showToast(message, title) {

    if (this.helperService.isNativePlatform) {
      this.showNativeToast(message);

    } else {

      if (title === 'SUCCESS') {
        this.toastrService.success(message, title);
      } else if (title === 'ERROR') {
        this.toastrService.error(message, title);
      }

    }

  }

 private async  showNativeToast(mess) {
     const toast = await toastController.create({
       message: mess,
       duration: 2000
     });
     toast.present();
  }



}
