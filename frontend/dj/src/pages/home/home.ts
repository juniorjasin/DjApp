import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultsPage } from'../results/results';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

import 'rxjs/add/operator/map';

//Services
import { 
  estadisticasTemasService 
} from '../../services/estadisticasTemas.service';
import { 
  temaService 
} from '../../services/tema.service';
import { 
   errorManangerService
} from '../../services/error.mananger.service';
import { 
  messagesService
} from '../../services/messages.service';
import { 
   locationService
} from '../../services/location.service';
import { 
   bolicheService
} from '../../services/boliche.service';
import { 
  mediaService
} from '../../services/media.service';


//Interfaces
import { Boliche } from '../../common/Boliche';
import { Location } from '../../common/Location';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [estadisticasTemasService, temaService, errorManangerService,messagesService,locationService,bolicheService, mediaService]
})
export class HomePage {

  boliche: Boliche;
  location: Location;
  music:any;

  //Delays
  delay_buscarBoliche = 2000;

  //Loading inicial
  loading:Loading;

  //Tiempo de grabación del tema actual
  tiempo_grabacion = 8000;

  constructor(private _bolicheService: bolicheService,
              private _locationService: locationService,
              public navCtrl: NavController,
              private _estadisticasTemasService: estadisticasTemasService,
              private _temaService: temaService,
              private _errorManangerService: errorManangerService,
              private _messageService: messagesService,
              private _mediaService: mediaService,
              private loadingCtrl: LoadingController) {
    this.boliche = {id: undefined, latitud: undefined, longitud: undefined ,nombre: undefined};
    this.location = {lat: undefined, lon: undefined};
    this.loading = this.loadingCtrl.create({
      content: 'Buscando boliche...'
    });
  }

  ngOnInit() {
    console.log('ngoninit home');
    this.mostrarLoading();
    this.obtenerLocalizacion();
    this.buscarBoliche(); 
  }

  changeMusic(valueinput){
    this._mediaService.empezarGrabacion();
    window.setTimeout(() => 
    {
      this._mediaService.detenerGrabacion();
      this.location.lat = '-31.337485';
      this.location.lon = '-64.256521';
      this._temaService.cambiarTemaActual(1,this.location,this._mediaService.getNombreArchivo()).then(
        result => {
          console.log('Se mandó correctamente el tema actual => resultado: ' + result);
          this._messageService.okMessage('Se mandó correctamente el tema actual');
          this._mediaService.releaseGrabacion();
        },
        error => {
          console.log('Error al mandar el tema actual => error: ' + error);
          this._messageService.okMessage('Error al mandar el tema actual');
          this._messageService.okMessage(error);
          //Hay que ver si hacer release
          this._mediaService.releaseGrabacion();
        }
      );      
    }, this.tiempo_grabacion);    
  }

  viewResults(){
    this.navCtrl.push(ResultsPage,{
        boliche: this.boliche,
        location: this.location
      });
  }

  private obtenerLocalizacion(){
    this._locationService.getLocation().subscribe(location => {
        this.location.lat = location.lat;
        this.location.lon = location.lon;
        console.log('latitude' + this.location.lat);
        console.log('longitude' + this.location.lon);
        //PRUEBA
        this.location.lat = '-31.337485';
        this.location.lon = '-64.256521';
     });
  }

  private buscarBoliche(){
    try{
      this._bolicheService.getBoliches(this.location).subscribe(boliches => {
        if(boliches.length == 0){
          console.log('buscarBoliche => no se encontraron boliches');
          setTimeout(()=>{ this.buscarBoliche(); }, this.delay_buscarBoliche);
        }
        else{
          for (var i = 0; i < boliches.length; i++) {
            this.boliche.id = boliches[i].id;
            this.boliche.nombre = boliches[i].nombre;
            this.boliche.latitud = boliches[i].latitud;
            this.boliche.longitud = boliches[i].longitud;
            this.loading.dismiss();
            console.log('buscarBoliche => boliche encontrado ');
            console.dir(this.boliche);
          }
        }
      },
      error => this._errorManangerService.threatError(error));
    }
    catch(exception){
      console.log(exception);
      setTimeout(()=>{ this.buscarBoliche(); }, this.delay_buscarBoliche);
    }
  }

    private mostrarLoading(){
    this.loading.present();
  }
}

//Rutas File
// this._messageService.okMessage('applicationStorageDirectory:'+ this.file.applicationStorageDirectory); /data/user/0/io.ionic.starter
// this._messageService.okMessage('applicationDirectory:'+ this.file.applicationDirectory);android_asset/
// this._messageService.okMessage('cacheDirectory:'+ this.file.cacheDirectory); data/user/io.ionic.starter/cache
// this._messageService.okMessage('documentsDirectory:'+ this.file.documentsDirectory); null
// this._messageService.okMessage('externalApplicationStorageDirectory:'+ this.file.externalApplicationStorageDirectory); storage/emulated/0/Android/data/io.iomic.starter/
// this._messageService.okMessage('externalCacheDirectory:'+ this.file.externalCacheDirectory); storage/emulated/0/Android/data/io.iomic.starter/cache
// this._messageService.okMessage('externalDataDirectory:'+ this.file.externalDataDirectory); storage/emulated/0/Android/data/io.iomic.starter/files
// this._messageService.okMessage('externalRootDirectory:'+ this.file.externalRootDirectory); storage/emulated/0/
// this._messageService.okMessage('sharedDirectory:'+ this.file.sharedDirectory); null
// this._messageService.okMessage('syncedDataDirectory:'+ this.file.syncedDataDirectory); null
// this._messageService.okMessage('tempDirectory:'+ this.file.tempDirectory); null 

