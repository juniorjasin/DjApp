import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuggestPage } from '../suggest/suggest';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

//Interfaces
import { Boliche } from '../../common/Boliche';
import { Tema } from '../../common/Tema';
import { Location } from '../../common/Location';
import { Voto } from '../../common/Voto';

//Servicios
import { 
   errorManangerService
} from '../../services/error.mananger.service';
import { 
   bolicheService
} from '../../services/boliche.service';
import { 
   locationService
} from '../../services/location.service';
import { 
   temaService 
} from '../../services/tema.service';
import { 
   votoService 
} from '../../services/voto.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [errorManangerService, bolicheService, locationService, temaService, votoService]
})
export class HomePage implements OnInit {

  @Input("v_nombre_tema_actual") v_nombre_tema_actual;
  @Input("v_nombre_boliche") v_nombre_boliche;
  @Input("v_nombre_ta") v_nombre_ta
  @Input("v_artista_ta") v_artista_ta

  boliche: Boliche;
  location: Location;
  tema_actual: Tema;

  isenabled:boolean=false;

  //Delays
  delay_buscarBoliche = 2000;
  delay_buscarTemaActual = 5000;
  delay_buscarTemaActual_catch = 2000;

  //Loading inicial
  loading:Loading;

  //Flag para saber si ya voto
  yaVoto:boolean = false;

  //Referencia a la propiedad src de la imágen del tema actual
  v_tema_actual_src:string;

  constructor(private _bolicheService: bolicheService,
              private _locationService: locationService,
              private _temaService: temaService,
              private _votoService: votoService,
              private _errorManangerService: errorManangerService,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) {
    this.boliche = {id: undefined, latitud: undefined, longitud: undefined ,nombre: undefined};
    this.location = {lat: undefined, lon: undefined};
    this.tema_actual = {id: undefined, nombre: undefined, imagen_tema: undefined};
    this.loading = this.loadingCtrl.create({
      content: 'Buscando boliche...'
    });
  }

  ngOnInit() {
    console.log('ngoninit home');
    this.mostrarLoading();
    this.obtenerLocalizacion();
    this.buscarBoliche();
    this.buscarTemaActual();
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
            this.v_nombre_boliche = this.boliche.nombre;
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

  private buscarTemaActual(){
    try{
      this._temaService.getTemaActual(this.boliche.id, this.location).subscribe(tema_actual => {
        for (var i = 0; i < tema_actual.length; i++) {
          //Si cambia el tema actual, habilitar para votar
          if(this.tema_actual.id != undefined && this.tema_actual.id != tema_actual[i].id)
            this.yaVoto = false;
          this.tema_actual.id = tema_actual[i].id;
          this.tema_actual.nombre = tema_actual[i].nombre;
          this.tema_actual.imagen_tema = tema_actual[i].imagen_tema;
          this.v_nombre_tema_actual = this.tema_actual.nombre;
          // Para poder mostrar el tema y artista por separado
          var nombre_tema = this.v_nombre_tema_actual.split("-", 2);
          this.v_nombre_ta = nombre_tema[0]
          this.v_artista_ta = nombre_tema[1]
          console.log(this.v_nombre_ta);
          console.log(this.v_artista_ta);
          if(this.tema_actual.imagen_tema == undefined || this.tema_actual.imagen_tema.trim() == "")
            this.v_tema_actual_src = "images/tema-default.png";
          else
            this.v_tema_actual_src = this.tema_actual.imagen_tema;
        }
        setTimeout(()=>{ this.buscarTemaActual(); }, this.delay_buscarTemaActual);
        console.log('buscarTemaActual success');
      },
      error => this._errorManangerService.threatError(error));
    }
    catch(exception){
      console.log(exception);
      setTimeout(()=>{ this.buscarTemaActual(); }, this.delay_buscarTemaActual_catch);
    }
  }

  public enviarVoto(tipo_like){
    if(this.yaVoto == false){
      this.yaVoto = true;
      const voto: Voto = {
        id_boliche: this.boliche.id,
        id_tema: this.tema_actual.id,
        tipo_like: tipo_like
      }
      try{
        this._votoService.votarTemaActual(voto,this.boliche.id,this.location).subscribe(status => {
          console.log('enviarVoto => se envió el voto correctamente');
          this.navCtrl.push(SuggestPage, {
              boliche: this.boliche,
              location: this.location
            });
        },
        error => {
          this.yaVoto = false;
          this._errorManangerService.threatError(error);});
      }
      catch(exception){
        this.yaVoto = false
        console.log('enviarVoto => ocurrió una excepción');
        console.log(exception);
        this._errorManangerService.showMessage('Ocurrió un error, reintente de nuevo.');
      }
    }
    else{
      this._errorManangerService.showMessage('Ya votaste, espera al próximo tema.');
    }
  }

  private mostrarLoading(){
    this.loading.present();
  }
}

