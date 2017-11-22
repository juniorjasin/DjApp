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
  estadisticasTemasService 
} from '../../services/estadisticasTemas.service';
import { 
   errorManangerService
} from '../../services/error.mananger.service';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
  providers: [estadisticasTemasService, errorManangerService]
})
export class ResultsPage {

  //Vista tema actual
  @Input("v_tema_actual") v_tema_actual;

  boliche: Boliche;
  location: Location;

  //Loading inicial
  loading:Loading;

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
              private _errorManangerService: errorManangerService,) {
    this.boliche  = navParams.get("boliche");
    this.location  = navParams.get("location");
    this.loading = this.loadingCtrl.create({
      content: 'Buscando estadísticas...'
    });
  }

  ngOnInit() {
    console.log('ngoninit results');
    this.mostrarLoading();
    this.buscarEstadisticas();
  }

  buscarEstadisticas(){
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
    
 
 
}