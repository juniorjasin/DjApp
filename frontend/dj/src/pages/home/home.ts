import { Component,ViewChild, OnInit, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular';

//Interfaces
import { Boliche } from '../../common/Boliche';
import { Location } from '../../common/Location';
import { Estadisticas_tema_propuesta } from '../../common/Estadisticas_tema_propuesta';

//Servicios
import { 
  temaService 
} from '../../services/tema.service';
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
import { 
  estadisticasTemasService 
} from '../../services/estadisticasTemas.service';
import { 
   errorManangerService
} from '../../services/error.mananger.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [estadisticasTemasService, errorManangerService, temaService,messagesService,locationService,bolicheService, mediaService]
})
export class HomePage {

  //Vista tema actual
  @Input("v_tema_actual") v_tema_actual;

  boliche: Boliche;
  location: Location;
  music:any;

  //Delays
  delay_buscarBoliche = 2000;

  //Loading inicial
  loading:Loading;

  //Tiempo de grabación del tema actual
  tiempo_grabacion = 8000;

  //Intervalo de busqueda del tema actual
  delayBusquedaTemaActual: number = 8000;

  //Estado del toggle button para activar o desactivar grabar y mandar el tema actual
  toggleCambiarTema : boolean;

  //Cuando se sale de estadísticas, se termina el loop en buscarEstadisticas
  buscar_estadisticas:boolean = true;

  ranking_temas: Array<Estadisticas_tema_propuesta>;

  delay_buscarEstadisticas:number = 5000;

  @ViewChild('doughnutCanvas') doughnutCanvas;
  
  doughnutChart: any;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private _estadisticasTemasService: estadisticasTemasService,
              private _errorManangerService: errorManangerService,
              private _bolicheService: bolicheService,
              private _locationService: locationService,
              private _temaService: temaService,
              private _messageService: messagesService,
              private _mediaService: mediaService) {
                this.boliche = {id: undefined, latitud: undefined, longitud: undefined ,nombre: undefined};
                this.location = {lat: undefined, lon: undefined};
                this.loading = this.loadingCtrl.create({
                  content: 'Buscando boliche...'
                });
  }

  

  ngOnInit() {
    console.log('ngoninit results');
    this.mostrarLoading();
    this.obtenerLocalizacion();
    this.buscarBoliche(); 
    this.buscarEstadisticas();
  }

  buscarEstadisticas(){
    try{
      this._estadisticasTemasService.getEstadisticasTemas(this.boliche.id, this.location).subscribe(estadisticas => {
        console.log('buscarEstadisticas success');
        console.dir(estadisticas.estadisticas_tema_propuesta);
        this.loading.dismiss();

        //Estadísticas tema actual
        this.v_tema_actual = estadisticas.estadisticas_tema_actual.nombre;
        this.doughnutChart['config']['data']['datasets'][0]['data'][0] = estadisticas.estadisticas_tema_actual.not_like;
        this.doughnutChart['config']['data']['datasets'][0]['data'][1] = estadisticas.estadisticas_tema_actual.likes;
        this.doughnutChart.update(0);

        //Ranking propuestas
        //Ordenar
        this.ordenarEstadisticas(estadisticas.estadisticas_tema_propuesta);

        this.ranking_temas = estadisticas.estadisticas_tema_propuesta;
        if(this.buscar_estadisticas)
          setTimeout(()=>{ this.buscarEstadisticas(); }, this.delay_buscarEstadisticas);
      },
      error => this._errorManangerService.threatError(error));
    }
    catch(exception){
      console.log(exception);
      setTimeout(()=>{ this.buscarEstadisticas(); }, this.delay_buscarEstadisticas);
    }
  }

  ionViewWillLeave(){
    this.buscar_estadisticas = false;
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["No me gusta", " Me gusta "],
        datasets: [{
          label: "#",
          data: [1,1],
          backgroundColor: [
            "#FF2D00",
            "#12d000"
          ]
        }]
      },
      options: {
        legend: {
          labels: {
            fontColor: 'white',
            fontSize: 16
          }
        }
      }
    });
  }

  private ordenarEstadisticas(estadisticas: Array <Estadisticas_tema_propuesta>){
    estadisticas.sort(function(tema_1, tema_2){
        if (tema_1.cantidad < tema_2.cantidad) {
          return 1;
        }
        if (tema_1.cantidad > tema_2.cantidad) {
          return -1;
        }
        return 0;
      });
  }

  private mostrarLoading(){
    this.loading.present();
  }

  cambiarMusica(){
    this._mediaService.empezarGrabacion();
    window.setTimeout(() => 
    {
      this._mediaService.detenerGrabacion();
      this.location.lat = '-31.337485';
      this.location.lon = '-64.256521';
      if(this.toggleCambiarTema){
        this._temaService.cambiarTemaActual(1,this.location, this._mediaService.getNombreArchivo()).then(
          result => {
            console.log('Se mandó correctamente el tema actual => resultado: ' + result);
            this._messageService.okMessage('Se mandó correctamente el tema actual');
            this._mediaService.releaseGrabacion();
            setTimeout(()=>{ this.cambiarMusica(); }, this.delayBusquedaTemaActual);
          },
          error => {
            console.log('Error al mandar el tema actual => error: ' + error);
            this._messageService.okMessage('Error al mandar el tema actual');
            this._messageService.okMessage(error);
            //Hay que ver si hacer release
            this._mediaService.releaseGrabacion();
            this.cambiarMusica();
          }
        );
      }      
    }, this.tiempo_grabacion);    
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

  toggleCambiarTemaUpdate(event){
    console.log('El estado del toggle cambiar tema actual es ' + this.toggleCambiarTema)
    if(this.toggleCambiarTema){
      this.cambiarMusica();
    }
    else{
      this._mediaService.detenerGrabacion();
      this._mediaService.releaseGrabacion();
    }
  }
    
 
 
}