import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

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

  constructor(private navCtrl: NavController,
              private navParams: NavParams, 
              private alertCtrl: AlertController,
              private _errorManangerService: errorManangerService,
              private _temaService: temaService,
              private _votoService: votoService) {
    this.boliche  = navParams.get("boliche");
    this.location = navParams.get("location");
  }

  ngOnInit() {
    this.setTemasActuales();
  }

  setTemasActuales(){
    this._temaService.getTemasPropuestos(this.boliche.id, this.location).subscribe(temas_propuestos => {
      for (var i = 0; i < temas_propuestos.length; i++) {
        this.v_temas_propuestos.push(temas_propuestos[i]);
      }
    },
    error => this._errorManangerService.threatError(error))
  }

  votarTemaPropuesto(id_tema) {
    const voto: Voto = {
      id_boliche: this.boliche.id,
      id_tema: id_tema,
      tipo_voto: "like"
    };
    this._votoService.postVoto(voto, this.boliche.id, this.location).subscribe(voto => {
      if(voto.length > 0){
        let alert = this.alertCtrl.create({
          subTitle: 'Su sugerencia ha sido enviada correctamente!',
          buttons : ['OK']
        });
        console.log('sugerencia de ' + id_tema + 'enviada');
        alert.present();
        this.navCtrl.pop();
      }
    },
    error => this._errorManangerService.threatError(error))
  }
}


