import { AlertController } from 'ionic-angular';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class errorManangerService {

	constructor(private alertCtrl: AlertController){}
  
  threatError(error){
    console.log(error);
    // error = error.json();
  	// console.log('Developer message: ' + error.developer_message);
  	// console.log('Error context: ' + error.context);
    // let alert = this.alertCtrl.create({
    //       subTitle: error.user_message,
    //       buttons : ['OK']
    //     });
    //     alert.present();
  }

  showMessage(message){
   console.log('showMessage => message = ' + message);
   let alert = this.alertCtrl.create({
          subTitle: message,
          buttons : ['OK']
        });
        alert.present(); 
  }
}