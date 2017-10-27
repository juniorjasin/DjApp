import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuggestPage } from '../suggest/suggest';

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
  boliche: Boliche;
  location: Location;
  tema_actual: Tema;

  constructor(private _bolicheService: bolicheService,
              private _locationService: locationService,
              private _temaService: temaService,
              private _votoService: votoService,
              private _errorManangerService: errorManangerService,
              private navCtrl: NavController) {
    this.boliche = {id: null, latitud: null, longitud: null ,nombre: null};
    this.location = {lat: null, lon: null};
    this.tema_actual = {id: null, nombre: null};
  }

  ngOnInit() {
  	this._locationService.getLocation().subscribe(location => {
        this.location.lat = location.lat;
        this.location.lon = location.lon;
   	});
    this.searchBoliche();
    this.searchTemaActual();
  }

  private searchBoliche(){
    var IntervalID = window.setInterval(() => {
      if(this.boliche.id == null && this.location.lat != null && this.location.lon != null)
        this.setBoliche();
      else
        clearInterval(IntervalID);
    },5000);
  }

  private setBoliche(){
    this._bolicheService.getBoliches(this.location).subscribe(boliches => {
      for (var i = 0; i < boliches.length; i++) {
        this.boliche.id = boliches[i].id;
        this.boliche.nombre = boliches[i].nombre;
        this.boliche.latitud = boliches[i].latitud;
        this.boliche.longitud = boliches[i].longitud;
        this.v_nombre_boliche = this.boliche.nombre; 
      }
    },
    error => this._errorManangerService.threatError(error));
  }

  private searchTemaActual(){
    var IntervalID = window.setInterval(() => {
      if(this.boliche.id != null)
        this.setTemaActual();
    },5000);
  }

  private setTemaActual(){
    this._temaService.getTemaActual(this.boliche.id, this.location).subscribe(tema_actual => {
      for (var i = 0; i < tema_actual.length; i++) {
        this.tema_actual.id = tema_actual[i].id;
        this.tema_actual.nombre = tema_actual[i].nombre;
        this.v_nombre_tema_actual = this.tema_actual.nombre;
      }
    },
    error => this._errorManangerService.threatError(error));
  }

  public sendVoto(tipo_voto){
    const voto: Voto = {
      id_boliche: this.boliche.id,
      id_tema: this.tema_actual.id,
      tipo_voto: tipo_voto
    }
    if(this.boliche.id != null && this.tema_actual.id != null){
    	this._votoService.postVoto(voto,this.boliche.id,this.location).subscribe(voto => {
	      if(voto.length > 0)
	        this.navCtrl.push(SuggestPage, {
	          boliche: this.boliche,
	          location: this.location
	        });
	    },
	    error => this._errorManangerService.threatError(error));
    }
  }



}

