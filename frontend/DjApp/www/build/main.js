webpackJsonp([1],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuggestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_error_mananger_service__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_tema_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_voto_service__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//Servicios



var SuggestPage = (function () {
    function SuggestPage(navCtrl, navParams, alertCtrl, _errorManangerService, _temaService, _votoService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._errorManangerService = _errorManangerService;
        this._temaService = _temaService;
        this._votoService = _votoService;
        this.loadingCtrl = loadingCtrl;
        this.boliche = navParams.get("boliche");
        this.location = navParams.get("location");
        this.loading = this.loadingCtrl.create({
            content: 'Cargando temas...'
        });
        this.v_temas_propuestos = [];
    }
    SuggestPage.prototype.ngOnInit = function () {
        console.log('ngoninit suggest');
        this.mostrarLoading();
        this.buscarTemasPropuestos();
    };
    SuggestPage.prototype.buscarTemasPropuestos = function () {
        var _this = this;
        this._temaService.getTemasPropuestos(this.boliche.id, this.location).subscribe(function (temas_propuestos) {
            for (var i = 0; i < temas_propuestos.length; i++) {
                _this.v_temas_propuestos.push(temas_propuestos[i]);
                console.log(temas_propuestos[i].nombre);
                console.log(temas_propuestos[i].id);
            }
            _this.loading.dismiss();
        }, function (error) { return _this._errorManangerService.threatError(error); });
    };
    SuggestPage.prototype.votarTemaPropuesto = function (id_tema) {
        var _this = this;
        var voto = {
            id_boliche: this.boliche.id,
            id_tema: id_tema,
            tipo_like: "like"
        };
        this._votoService.votarPropuesta(voto, this.boliche.id, this.location).subscribe(function (status) {
            var alert = _this.alertCtrl.create({
                subTitle: 'Su sugerencia ha sido enviada correctamente!',
                buttons: ['OK']
            });
            console.log('sugerencia de ' + id_tema + 'enviada');
            alert.present();
            _this.navCtrl.pop();
        }, function (error) { return _this._errorManangerService.threatError(error); });
    };
    SuggestPage.prototype.mostrarLoading = function () {
        this.loading.present();
    };
    return SuggestPage;
}());
SuggestPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-suggest',template:/*ion-inline-start:"/home/juan/Documents/github_projects/DjApp/frontend/DjApp/src/pages/suggest/suggest.html"*/'<ion-header> \n  <br>\n  <p> ¡ Gracias por votar !</p>\n  <p> Sugiere al DJ lo que quieres escuchar </p>\n  <br>\n  <!-- <ion-searchbar placeholder="Buscar" ></ion-searchbar>  -->\n</ion-header>\n  <br>\n<ion-content padding class="app">\n  <ion-list no-lines>\n    <button ion-item *ngFor="let tema_propuesto of v_temas_propuestos" (tap)="votarTemaPropuesto(this.tema_propuesto.id)">\n      {{ tema_propuesto.nombre }}\n    </button> \n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/juan/Documents/github_projects/DjApp/frontend/DjApp/src/pages/suggest/suggest.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_error_mananger_service__["a" /* errorManangerService */], __WEBPACK_IMPORTED_MODULE_3__services_tema_service__["a" /* temaService */], __WEBPACK_IMPORTED_MODULE_4__services_voto_service__["a" /* votoService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__services_error_mananger_service__["a" /* errorManangerService */],
        __WEBPACK_IMPORTED_MODULE_3__services_tema_service__["a" /* temaService */],
        __WEBPACK_IMPORTED_MODULE_4__services_voto_service__["a" /* votoService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], SuggestPage);

//# sourceMappingURL=suggest.js.map

/***/ }),

/***/ 111:
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
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/suggest/suggest.module": [
		271,
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
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return errorManangerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var errorManangerService = (function () {
    function errorManangerService(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    errorManangerService.prototype.threatError = function (error) {
        error = error.json();
        console.log('Developer message: ' + error.developer_message);
        console.log('Error context: ' + error.context);
        var alert = this.alertCtrl.create({
            subTitle: error.user_message,
            buttons: ['OK']
        });
        alert.present();
    };
    errorManangerService.prototype.showMessage = function (message) {
        console.log('showMessage => message = ' + message);
        var alert = this.alertCtrl.create({
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    return errorManangerService;
}());
errorManangerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
], errorManangerService);

//# sourceMappingURL=error.mananger.service.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return temaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var temaService = (function () {
    function temaService(http) {
        this.http = http;
        this.domain = 'http://54.86.110.165:9090';
    }
    temaService.prototype.getTemasPropuestos = function (id_boliche, location) {
        var _this = this;
        if (id_boliche == undefined || location.lat == undefined || location.lon == undefined)
            throw "getTemasPropuestos parámetros sin definir";
        var path = this.domain + '/temas_propuestos/' + id_boliche;
        var encodedPath = encodeURI(path);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'X-LAT': location.lat,
            'X-LON': location.lon
        });
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(encodedPath, options).map(function (response) { return _this.mapTemasPropuestos(response.json()); });
    };
    temaService.prototype.getTemaActual = function (id_boliche, location) {
        var _this = this;
        if (id_boliche == undefined || location.lat == undefined || location.lon == undefined)
            throw "getTemaActual parámetros sin definir";
        var path = this.domain + '/boliches/' + id_boliche + '/tema_actual';
        var encodedPath = encodeURI(path);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'X-LAT': location.lat,
            'X-LON': location.lon
        });
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(encodedPath, options).map(function (response) { return _this.mapTemaActual(response.json()); });
    };
    temaService.prototype.mapTemasPropuestos = function (data) {
        var temas = [];
        for (var i = 0; i < data['temas_propuestos'].length; i++) {
            temas.push({ id: data['temas_propuestos'][i].id,
                nombre: data['temas_propuestos'][i].nombre });
        }
        return temas;
    };
    temaService.prototype.mapTemaActual = function (data) {
        var tema = [];
        for (var i = 0; i < data['tema_actual'].length; i++) {
            tema.push({ id: data['tema_actual'][i].id,
                nombre: data['tema_actual'][i].nombre });
        }
        return tema;
    };
    return temaService;
}());
temaService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], temaService);

//# sourceMappingURL=tema.service.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return votoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var votoService = (function () {
    function votoService(http) {
        this.http = http;
        this.domain = 'http://54.86.110.165:9090';
    }
    votoService.prototype.votarTemaActual = function (voto, id_boliche, location) {
        var _this = this;
        if (id_boliche == undefined || location.lat == undefined || location.lon == undefined
            || voto.id_boliche == undefined || voto.id_tema == undefined || voto.tipo_like == undefined)
            throw "votarTemaActual parámetros sin definir";
        var path = this.domain + '/likes';
        var encodedPath = encodeURI(path);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'X-LAT': location.lat,
            'X-LON': location.lon
        });
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(encodedPath, voto, options).map(function (response) { return _this.mapStatus(response.json()); });
    };
    votoService.prototype.votarPropuesta = function (voto, id_boliche, location) {
        var _this = this;
        if (id_boliche == undefined || location.lat == undefined || location.lon == undefined
            || voto.id_boliche == undefined || voto.id_tema == undefined || voto.tipo_like == undefined)
            throw "votarPropuesta parámetros sin definir";
        var path = this.domain + '/propuesta';
        var encodedPath = encodeURI(path);
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json',
            'X-LAT': location.lat,
            'X-LON': location.lon
        });
        var options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(encodedPath, voto, options).map(function (response) { return _this.mapStatus(response.json()); });
    };
    votoService.prototype.mapStatus = function (data) {
        var status = { code: undefined, detail: undefined, title: undefined };
        // for (var i = 0; i < data['voto'].length; i++) {
        //   voto.push({id_boliche: data['voto'][i].id_boliche,                       
        //              id_tema: data['voto'][i].id_tema,
        //              tipo_like: data['voto'][i].tipo_like});
        // }
        status.code = data['status'][0].code;
        status.detail = data['status'][0].detail;
        status.title = data['status'][0].title;
        return status;
    };
    return votoService;
}());
votoService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], votoService);

//# sourceMappingURL=voto.service.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suggest_suggest__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_error_mananger_service__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_boliche_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_location_service__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_tema_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_voto_service__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//Servicios





var HomePage = (function () {
    function HomePage(_bolicheService, _locationService, _temaService, _votoService, _errorManangerService, navCtrl, loadingCtrl) {
        this._bolicheService = _bolicheService;
        this._locationService = _locationService;
        this._temaService = _temaService;
        this._votoService = _votoService;
        this._errorManangerService = _errorManangerService;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.isenabled = false;
        //Delays
        this.delay_buscarBoliche = 2000;
        this.delay_buscarTemaActual = 5000;
        this.delay_buscarTemaActual_catch = 2000;
        //Flag para saber si ya voto
        this.yaVoto = false;
        this.boliche = { id: undefined, latitud: undefined, longitud: undefined, nombre: undefined };
        this.location = { lat: undefined, lon: undefined };
        this.tema_actual = { id: undefined, nombre: undefined };
        this.loading = this.loadingCtrl.create({
            content: 'Buscando boliche...'
        });
    }
    HomePage.prototype.ngOnInit = function () {
        console.log('ngoninit home');
        this.mostrarLoading();
        this.obtenerLocalizacion();
        this.buscarBoliche();
        this.buscarTemaActual();
    };
    HomePage.prototype.obtenerLocalizacion = function () {
        var _this = this;
        this._locationService.getLocation().subscribe(function (location) {
            _this.location.lat = location.lat;
            _this.location.lon = location.lon;
            console.log('latitude' + _this.location.lat);
            console.log('longitude' + _this.location.lon);
            //PRUEBA
            _this.location.lat = '-31.337485';
            _this.location.lon = '-64.256521';
        });
    };
    HomePage.prototype.buscarBoliche = function () {
        var _this = this;
        try {
            this._bolicheService.getBoliches(this.location).subscribe(function (boliches) {
                if (boliches.length == 0) {
                    console.log('buscarBoliche => no se encontraron boliches');
                    setTimeout(function () { _this.buscarBoliche(); }, _this.delay_buscarBoliche);
                }
                else {
                    for (var i = 0; i < boliches.length; i++) {
                        _this.boliche.id = boliches[i].id;
                        _this.boliche.nombre = boliches[i].nombre;
                        _this.boliche.latitud = boliches[i].latitud;
                        _this.boliche.longitud = boliches[i].longitud;
                        _this.loading.dismiss();
                        _this.v_nombre_boliche = _this.boliche.nombre;
                        console.log('buscarBoliche => boliche encontrado ');
                        console.dir(_this.boliche);
                    }
                }
            }, function (error) { return _this._errorManangerService.threatError(error); });
        }
        catch (exception) {
            console.log(exception);
            setTimeout(function () { _this.buscarBoliche(); }, this.delay_buscarBoliche);
        }
    };
    HomePage.prototype.buscarTemaActual = function () {
        var _this = this;
        try {
            this._temaService.getTemaActual(this.boliche.id, this.location).subscribe(function (tema_actual) {
                for (var i = 0; i < tema_actual.length; i++) {
                    //Si cambia el tema actual, habilitar para votar
                    if (_this.tema_actual.id != undefined && _this.tema_actual.id != tema_actual[i].id)
                        _this.yaVoto = false;
                    _this.tema_actual.id = tema_actual[i].id;
                    _this.tema_actual.nombre = tema_actual[i].nombre;
                    _this.v_nombre_tema_actual = _this.tema_actual.nombre;
                }
                setTimeout(function () { _this.buscarTemaActual(); }, _this.delay_buscarTemaActual);
                console.log('buscarTemaActual success');
            }, function (error) { return _this._errorManangerService.threatError(error); });
        }
        catch (exception) {
            console.log(exception);
            setTimeout(function () { _this.buscarTemaActual(); }, this.delay_buscarTemaActual_catch);
        }
    };
    HomePage.prototype.enviarVoto = function (tipo_like) {
        var _this = this;
        if (this.yaVoto == false) {
            this.yaVoto = true;
            var voto = {
                id_boliche: this.boliche.id,
                id_tema: this.tema_actual.id,
                tipo_like: tipo_like
            };
            try {
                this._votoService.votarTemaActual(voto, this.boliche.id, this.location).subscribe(function (status) {
                    console.log('enviarVoto => se envió el voto correctamente');
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__suggest_suggest__["a" /* SuggestPage */], {
                        boliche: _this.boliche,
                        location: _this.location
                    });
                }, function (error) {
                    _this.yaVoto = false;
                    _this._errorManangerService.threatError(error);
                });
            }
            catch (exception) {
                this.yaVoto = false;
                console.log('enviarVoto => ocurrió una excepción');
                console.log(exception);
                this._errorManangerService.showMessage('Ocurrió un error, reintente de nuevo.');
            }
        }
        else {
            this._errorManangerService.showMessage('Ya votaste, espera al próximo tema.');
        }
    };
    HomePage.prototype.mostrarLoading = function () {
        this.loading.present();
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("v_nombre_tema_actual"),
    __metadata("design:type", Object)
], HomePage.prototype, "v_nombre_tema_actual", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])("v_nombre_boliche"),
    __metadata("design:type", Object)
], HomePage.prototype, "v_nombre_boliche", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/juan/Documents/github_projects/DjApp/frontend/DjApp/src/pages/home/home.html"*/'<ion-header> </ion-header>\n  <ion-content scroll="false" class="app" padding>\n      <p> {{v_nombre_boliche}} </p>\n      <p> ¿ Te gusta lo que suena ?</p>\n      <p> {{v_nombre_tema_actual}} </p>\n      <!-- <div align="center"><img src="images/4babys.jpg" style="position: relative; width:60%" ></div> -->\n      <div align="center"><img [src]="view_img_src" style="position: relative; width:60%" ></div>\n      <br>\n      <br>\n      <br>\n      <br>\n  \n      <img src="images/x2.png" align="left" style="position: relative; width:30%" (tap)="enviarVoto(\'not-like\')">\n      <img src="images/cuoreg.png" align="right" style="position: relative; width:35%" (tap)="enviarVoto(\'like\')">\n    \n  </ion-content>\n'/*ion-inline-end:"/home/juan/Documents/github_projects/DjApp/frontend/DjApp/src/pages/home/home.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_error_mananger_service__["a" /* errorManangerService */], __WEBPACK_IMPORTED_MODULE_4__services_boliche_service__["a" /* bolicheService */], __WEBPACK_IMPORTED_MODULE_5__services_location_service__["a" /* locationService */], __WEBPACK_IMPORTED_MODULE_6__services_tema_service__["a" /* temaService */], __WEBPACK_IMPORTED_MODULE_7__services_voto_service__["a" /* votoService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_boliche_service__["a" /* bolicheService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_boliche_service__["a" /* bolicheService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__services_location_service__["a" /* locationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_location_service__["a" /* locationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_tema_service__["a" /* temaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_tema_service__["a" /* temaService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__services_voto_service__["a" /* votoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__services_voto_service__["a" /* votoService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_error_mananger_service__["a" /* errorManangerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_error_mananger_service__["a" /* errorManangerService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _g || Object])
], HomePage);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_suggest_suggest__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(32);
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
            __WEBPACK_IMPORTED_MODULE_9__angular_http__["c" /* HttpModule */],
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

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(199);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/juan/Documents/github_projects/DjApp/frontend/DjApp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/juan/Documents/github_projects/DjApp/frontend/DjApp/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bolicheService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var bolicheService = (function () {
    function bolicheService(http) {
        this.http = http;
        this.domain = 'http://54.86.110.165:9090';
    }
    bolicheService.prototype.getBoliches = function (location) {
        var _this = this;
        if (location.lat == undefined || location.lon == undefined)
            throw "getBoliches parámetros sin definir";
        var path = this.domain + '/boliches?lat=' + location.lat + '&lon=' + location.lon;
        var encodedPath = encodeURI(path);
        return this.http.get(encodedPath).map(function (response) { return _this.mapBoliche(response.json()); }, function (err) { return alert(err); });
    };
    bolicheService.prototype.mapBoliche = function (data) {
        var boliches = [];
        for (var i = 0; i < data['boliches'].length; i++) {
            boliches.push({ id: data['boliches'][i].id,
                latitud: data['boliches'][i].latitud,
                longitud: data['boliches'][i].longitud,
                nombre: data['boliches'][i].nombre });
        }
        return boliches;
    };
    return bolicheService;
}());
bolicheService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
], bolicheService);

//# sourceMappingURL=boliche.service.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return locationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_geolocation__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var locationService = (function () {
    function locationService(geolocation) {
        this.geolocation = geolocation;
    }
    locationService.prototype.getLocation = function () {
        var _this = this;
        return this.geolocation
            .watchPosition()
            .map(function (location) { return _this.mapPosition(location); });
    };
    locationService.prototype.mapPosition = function (position) {
        var location = { lat: undefined, lon: undefined };
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        return location;
    };
    locationService.prototype.stopLocationWatch = function () {
    };
    return locationService;
}());
locationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_geolocation__["a" /* Geolocation */]])
], locationService);

//# sourceMappingURL=location.service.js.map

/***/ })

},[201]);
//# sourceMappingURL=main.js.map