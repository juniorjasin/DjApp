webpackJsonp([1],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuggestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_timeout__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SuggestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SuggestPage = (function () {
    // setSubItems() {
    //   this.subitems = ['Cuatro Babys ft. Noriel, Bryant Myers, Juhn',
    //                    ' Mi Gente', ' Me Rehúso', ' Krippy Kush'];
    // }
    function SuggestPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
    }
    //te: JSON;
    SuggestPage.prototype.ngOnInit = function () {
        this.setItems();
        //this.setSubItems();
    };
    SuggestPage.prototype.setItems = function () {
        this.items = ['El chaqueño - La ley y la trampa',
            'J. Balvin, Willy William ', 'Danny Ocean - Me Rehúso',
            'Farruko, Bad Bunny, Rvssian - Krippy Kush', 'Maluma - Borro casette '];
    };
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
    SuggestPage.prototype.doSomething = function (item) {
        var alert = this.alertCtrl.create({
            // title: 'Enviada!',
            subTitle: 'Su sugerencia ha sido enviada correctamente!',
            buttons: ['OK']
        });
        console.log('sugerencia de ' + item + 'enviada');
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
    };
    SuggestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SuggestPage');
    };
    return SuggestPage;
}());
SuggestPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-suggest',template:/*ion-inline-start:"/Users/lea/Documents/ionic/DjApp/frontend/DjApp/src/pages/suggest/suggest.html"*/'<ion-header> \n  <br>\n  <p> ¡ Gracias por votar !</p>\n  <p> Sugiere al DJ lo que quieres escuchar </p>\n  <br>\n  <ion-searchbar placeholder="Buscar" ></ion-searchbar> \n</ion-header>\n  <br>\n<ion-content padding class="app">\n \n<ion-list>\n  <ion-item *ngFor="let item of items" (tap)="doSomething(this.item)" >\n    <h2> {{ item }}</h2>\n  </ion-item>\n</ion-list>\n\n\n\n</ion-content>\n\n\n<!-- <ion-footer>\n  <button aling="center" ion-button color="blue" (tap)="showAlert()" round>SEND SUGGESTION</button>\n</ion-footer> -->'/*ion-inline-end:"/Users/lea/Documents/ionic/DjApp/frontend/DjApp/src/pages/suggest/suggest.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], SuggestPage);

//# sourceMappingURL=suggest.js.map

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/suggest/suggest.module": [
		275,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 151;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__suggest_suggest__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { Component } from '@angular/core';







var HomePage = (function () {
    function HomePage(navCtrl, geolocation, http) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.http = http;
        this.lat = 0;
        this.lon = 0;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        // pedir posicion
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lon = resp.coords.longitude;
            console.log('latitud:', _this.lat);
            console.log('longitud:', _this.lon);
            _this.getBoliche();
            // console.log(typeof this.lat.toString());
            // console.log(this.lat.toString());
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.getBoliche = function () {
        // console.log(`http://demo3876345.mockable.io/prueba?lat=${this.lat}`);
        var path = "http://demo3876345.mockable.io/prueba?lat=" + this.lat + "lon=" + this.lon; // cambiar url 
        console.log(path);
        var encodedPath = encodeURI(path);
        var timeoutMS = 10000;
        this.http.get(encodedPath)
            .timeout(timeoutMS)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var responseData = data;
            console.log(responseData);
        }, function (err) {
            console.log('error in getting boliche');
        });
    };
    HomePage.prototype.sendvot = function (id_tema, vot) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__suggest_suggest__["a" /* SuggestPage */]);
        console.log("entro papaaa", id_tema);
        console.log("entro papaaa", vot);
        /*
          let path = "http://localhost:8081/sendvot?lat=" + this.lat + "&lon=" + this.lon + "&id_tema=" + id_tema + "&estado=" + vot; // cambiar url
          console.log(path);
          
          let encodedPath = encodeURI(path);
          let timeoutMS = 10000;
          this.http.get(encodedPath)
              .timeout(timeoutMS)
              .map(res => res.json()).subscribe(data => {
                  let responseData = data;
                  console.log(responseData);
                  //this.navCtrl.push(SuggestPage);
              },
              err => {
                  console.log('error in send voto');
              });*/
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/lea/Documents/ionic/DjApp/frontend/DjApp/src/pages/home/home.html"*/'<ion-header> </ion-header>\n  <ion-content class="app" padding>\n      <p> ¿ Te gusta lo que suena ?</p>\n      <br>\n      <br>\n      <br>\n      <p> 4 Babys - Maluma </p>\n      <div align="center"><img src="images/4babys.jpg" style="position: relative; width:60%" ></div>\n      <br>\n      <br>\n      <br>\n      <br>\n  \n      <img src="images/x2.png" align="left" style="position: relative; width:30%" (tap)="sendvot(\'485\',\'nomg\')">\n      <img src="images/cuore.png" align="right" style="position: relative; width:30%" (tap)="sendvot(\'485\',\'mg\')">\n    \n  </ion-content>\n'/*ion-inline-end:"/Users/lea/Documents/ionic/DjApp/frontend/DjApp/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_suggest_suggest__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_suggest_suggest__["a" /* SuggestPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/suggest/suggest.module#SuggestPageModule', name: 'SuggestPage', segment: 'suggest', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_suggest_suggest__["a" /* SuggestPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/lea/Documents/ionic/DjApp/frontend/DjApp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/lea/Documents/ionic/DjApp/frontend/DjApp/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[199]);
//# sourceMappingURL=main.js.map