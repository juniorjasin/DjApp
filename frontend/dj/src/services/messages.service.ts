import { AlertController } from 'ionic-angular';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class messagesService {

	constructor(private alertCtrl: AlertController){}
  
  okMessage(message){
    let alert = this.alertCtrl.create({
          subTitle: message,
          buttons : ['OK']
        });
        alert.present();
  }
}