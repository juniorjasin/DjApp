import { AlertController } from 'ionic-angular';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class errorManangerService {

	constructor(private alertCtrl: AlertController){}
  
  threatError(error){
  	console.log('Developer message: ' + error.developer_message);
  	console.log('Error title: ' + error.title);
    let alert = this.alertCtrl.create({
          subTitle: error.user_message,
          buttons : ['OK']
        });
        alert.present();
  }
}