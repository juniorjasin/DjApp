import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ResultsPage } from'../results/results';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

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

//Interfaces
import { Boliche } from '../../common/Boliche';
import { Location } from '../../common/Location';
import { Observable } from 'rxjs/Observable';

import { Media, MediaObject } from '@ionic-native/media';

import { File, Entry } from '@ionic-native/file';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [estadisticasTemasService, temaService, errorManangerService,messagesService,locationService,bolicheService]
})
export class HomePage {

  boliche: Boliche;
  location: Location;
  music:any;

  //Delays
  delay_buscarBoliche = 2000;

  //Loading inicial
  loading:Loading;

  constructor(private _bolicheService: bolicheService,
              private _locationService: locationService,
              public navCtrl: NavController,
              private _estadisticasTemasService: estadisticasTemasService,
              private _temaService: temaService,
              private _errorManangerService: errorManangerService,
              private _messageService: messagesService,
              private loadingCtrl: LoadingController,
              private media: Media,
              private file: File) {
    this.boliche = {id: undefined, latitud: undefined, longitud: undefined ,nombre: undefined};
    this.location = {lat: undefined, lon: undefined};
    this.loading = this.loadingCtrl.create({
      content: 'Buscando boliche...'
    });
  }

  ngOnInit() {
    //console.log('ngoninit home');
    //this.mostrarLoading();
    //this.obtenerLocalizacion();
    //this.buscarBoliche();
      
    // const mediafile: MediaObject = this.media.create('/data/user/0/file99.mp3');
    // this._messageService.okMessage('temp directory'+this.file.tempDirectory);
    // this._messageService.okMessage('app directory'+ this.file.applicationStorageDirectory);

    // this._messageService.okMessage( 'data dir: '+this.file.dataDirectory);
    // let path = '/data/0/'
    // this.file.createDir(this.file.dataDirectory, 'file', true)
    // .then ( v =>this.file.checkFile(this.file.dataDirectory, 'file.mp3')
    // .then ( v => {
    //   this._messageService.okMessage('bool1' + v);
    //   let archivo = this.media.create(this.file.dataDirectory + 'file.mp3');
    //   archivo.startRecord();
    //   window.setTimeout(() => {
    //     archivo.stopRecord();
    //     archivo.play(); }
    //     , 7000);
      
    //   this._messageService.okMessage('finish create file');}
    // ,
    // err => this._messageService.okMessage('Error1' + err)),
    // err => this._messageService.okMessage('Error' + err));

    // this.file.checkFile('', 'my_file.m4a').then ( v => this._messageService.okMessage('bool' + v), err => this._messageService.okMessage('Error' + err));

    // .then(() => {
    //   let file = this.media.create(this.file.applicationStorageDirectory.replace(/^file:\/\//, '') + 'my_file.m4a');
    //   file.startRecord();
    //   window.setTimeout(() => file.stopRecord(), 5000);
    //   this._messageService.okMessage('finish create file');

    // }, err =>  this._messageService.okMessage('error: ' + err));
    
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


    const mediafile: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.mp3');

    mediafile.startRecord();

        window.setTimeout(() => {
            mediafile.stopRecord(); 
            // mediafile.release();
            this._messageService.okMessage('termino grabar');
        }
        , 5000);





    // const mediafile: MediaObject = this.media.create(this.file.dataDirectory + 'file.mp3');
    
    // mediafile.startRecord();
    
    //     window.setTimeout(() => {
    //         mediafile.stopRecord(); 
    //         mediafile.release();
    //         // this.file.readAsBinaryString(this.file.dataDirectory,'file.mp3').then(
    //         //   res => {this._messageService.okMessage(res);},
    //         //   err => {this._messageService.okMessage('errr' + err);}
    //         // );
            // this.file.listDir(this.file.tempDirectory,'').then(
            //   (res:Entry[]) => {
            //     this._messageService.okMessage('doc');
            //     this._messageService.okMessage(this.file.dataDirectory);
            //     res.forEach(element => {
                
            //     this._messageService.okMessage('doc ' + element.fullPath);
            //   });},
            //   err => {this._messageService.okMessage('errr' + err);}
            // );
    //         // const location:Location = {lat: '-31.337485' , lon: '-64.256521'};
    //         // this._temaService.cambiarTemaActual(1,'la mona - criminal',location,file).subscribe(
    //         //   res => {this._messageService.okMessage('El tema ha sido cambiado con éxito!');},
    //         //   error => {this._errorManangerService.threatError(error);}
    //         // );
    //     }
    //     , 5000);


  }


  

  changeMusic(valueinput){
    console.log("In ChangeMusic ");
    console.log("ingreso:", valueinput);
    if(valueinput != undefined && valueinput.trim() != ""){
      if(valueinput.indexOf('-') !== -1){
        if((valueinput.split('-').length-1) == 1){
          const location:Location = {lat: '-31.337485' , lon: '-64.256521'};
          this._temaService.cambiarTemaActual(this.boliche.id,valueinput,this.location,null).subscribe(status => {
            console.log('Tema actual cambiado!');
            this.music = "";
            this._messageService.okMessage('El tema ha sido cambiado con éxito!');
          },
          error => this._errorManangerService.threatError(error));
        }
        else
          this._messageService.okMessage('No puede utilizar múltiples veces el caracter "-"');
      }
      else
        this._messageService.okMessage('El formato debe ser Nombre - Autor');
    }
    else{
      console.log('changeMusic input vacío');
      this._messageService.okMessage('No puede dejar el tema vacío!');
    }
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
