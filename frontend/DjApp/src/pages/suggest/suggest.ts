import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
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
   temaService 
} from '../../services/tema.service';
import { 
   votoService 
} from '../../services/voto.service';


@IonicPage()
@Component({
  selector: 'page-suggest',
  templateUrl: 'suggest.html',
  providers: [errorManangerService, temaService, votoService]
})
export class SuggestPage {

  v_temas_propuestos: Array<Tema>;
  boliche: Boliche;
  location: Location;

  //Loading inicial
  loading:Loading;

  constructor(private navCtrl: NavController,
              private navParams: NavParams, 
              private alertCtrl: AlertController,
              private _errorManangerService: errorManangerService,
              private _temaService: temaService,
              private _votoService: votoService,
              private loadingCtrl: LoadingController) {
    this.boliche  = navParams.get("boliche");
    this.location = navParams.get("location");
    this.loading = this.loadingCtrl.create({
      content: 'Cargando temas...'
    });
    this.v_temas_propuestos = [];
  }

  ngOnInit() {
    console.log('ngoninit suggest');
    this.mostrarLoading();
    this.buscarTemasPropuestos();
  }

  buscarTemasPropuestos(){
    this._temaService.getTemasPropuestos(this.boliche.id, this.location).subscribe(temas_propuestos => {
      for (var i = 0; i < temas_propuestos.length; i++) {
        this.v_temas_propuestos.push(temas_propuestos[i]);
        console.log(temas_propuestos[i].nombre);
        console.log(temas_propuestos[i].id);
      }
      this.loading.dismiss();
    },
    error => this._errorManangerService.threatError(error))
  }

  votarTemaPropuesto(id_tema) {
    const voto: Voto = {
      id_boliche: this.boliche.id,
      id_tema: id_tema,
      tipo_like: "like"
    };
    this._votoService.votarPropuesta(voto, this.boliche.id, this.location).subscribe(status => {
        let alert = this.alertCtrl.create({
          subTitle: 'Su sugerencia ha sido enviada correctamente!',
          buttons : ['OK']
        });
        console.log('sugerencia de ' + id_tema + 'enviada');
        alert.present();
        this.navCtrl.pop();
    },
    error => this._errorManangerService.threatError(error))
  }

  private mostrarLoading(){
    this.loading.present();
  }
}


