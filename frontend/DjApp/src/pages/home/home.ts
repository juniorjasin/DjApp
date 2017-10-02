// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  lat:number;
  lon:number;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public http: Http) {
    this.lat = 0;
    this.lon = 0;

  }

  ngOnInit() {

    // pedir posicion
    this.geolocation.getCurrentPosition().then((resp) => {
    this.lat = resp.coords.latitude;
    this.lon = resp.coords.longitude;

    console.log('latitud:', this.lat);
    console.log('longitud:', this.lon);
    this.getBoliche();
    // console.log(typeof this.lat.toString());
    // console.log(this.lat.toString());

  }).catch((error) => {
    console.log('Error getting location', error);
  });
}

private getBoliche() {
  
  console.log(this.lat);
  // console.log(`http://demo3876345.mockable.io/prueba?lat=${this.lat}`);
  var la = this.lat;

  let path = "http://demo3876345.mockable.io/prueba?lat=" + la + "lon=" + la ; // cambiar url 
  console.log(path);

  let encodedPath = encodeURI(path);
  let timeoutMS = 10000;
  this.http.get(encodedPath)
      .timeout(timeoutMS)
      .map(res => res.json()).subscribe(data => {
          let responseData = data;
          console.log(responseData);
      },
      err => {
          console.log('error in getting boliche');
      });
}
  

myFunction(){
  console.log('HOLA ENTRE A myfunction');
}
  
  
}
