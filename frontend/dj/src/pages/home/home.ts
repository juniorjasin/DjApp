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
    console.log("In ChangeMusic ");
    console.log("ingreso:", valueinput);
    if(valueinput != undefined && valueinput.trim() != ""){
      const location:Location = {lat: '-31.337485' , lon: '-64.256521'};
      this._temaService.cambiarTemaActual(this.boliche.id,valueinput,this.location).subscribe(status => {
        console.log('Tema actual cambiado!');
        this.music = "";
        this._messageService.okMessage('El tema ha sido cambiado con éxito!');
      },
      error => this._errorManangerService.threatError(error));
    }
    else{
      console.log('changeMusic input vacío');
      this._messageService.okMessage('Debe introducir el nombre del tema!');
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
