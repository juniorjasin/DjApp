import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

/**
 * Generated class for the SuggestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
})
export class SuggestPage {
  items: Array<string>;
  subitems: Array<string>
  //te: JSON;

  ngOnInit() {
    this.setItems();
    //this.setSubItems();
  }

  setItems() {
    this.items = [  'El chaqueño - La ley y la trampa' ,
     'J. Balvin, Willy William ', 'Danny Ocean - Me Rehúso',
           'Farruko, Bad Bunny, Rvssian - Krippy Kush', 'Maluma - Borro casette '];
  }

  // setSubItems() {
  //   this.subitems = ['Cuatro Babys ft. Noriel, Bryant Myers, Juhn',
  //                    ' Mi Gente', ' Me Rehúso', ' Krippy Kush'];
  // }


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController) {
  }

  // filterItems(ev: any) {
  //   this.setItems();
  //   let val = ev.target.value;

  //   if (val && val.trim() !== '') {
  //     this.items = this.items.filter(function(item) {
  //       return item.toLowerCase().includes(val.toLowerCase());
  //     });
  //   }
  // }

  /**
   * 
   * @param item trae el nombre que el usuario selecciona en la lista
   */
  doSomething(item) {
    let alert = this.alertCtrl.create({
     // title: 'Enviada!',
      subTitle: 'Su sugerencia ha sido enviada correctamente!',
      buttons : ['OK']
    });
    console.log('sugerencia de ' + item + 'enviada')
    
  // let path = "http://localhost:8081/sendsug?lat=" + this.lat + "&lon=" + this.lon + "&tema=" + item ; // cambiar url 
  // console.log(path);
  
  // let encodedPath = encodeURI(path);
  // let timeoutMS = 10000;
  // this.http.get(encodedPath)
  //     .timeout(timeoutMS)
  //     .map(res => res.json()).subscribe(data => {
  //         let responseData = data;
  //         console.log(responseData);
  //         //this.navCtrl.push(SuggestPage);
  //     },
  //     err => {
  //         console.log('error in send voto');
  //     });

    alert.present();
   // this.navCtrl.push(HomePage);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestPage');
  }

  
}


