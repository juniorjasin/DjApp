import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Voto } from '../common/Voto';
import { Status } from '../common/Status';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class votoService {

  domain = 'http://54.86.110.165:9090';

	constructor(public http: Http){}

  	votarTemaActual(voto:Voto, id_boliche, location: Location): Observable<Status>{
      if(id_boliche == undefined || location.lat == undefined || location.lon == undefined
        || voto.id_boliche == undefined || voto.id_tema == undefined || voto.tipo_like == undefined)
        throw "votarTemaActual parámetros sin definir";
      let path = this.domain + '/likes';
	    let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'X-LAT': location.lat,
         'X-LON': location.lon
        });
      let options = new RequestOptions({ headers: headers });
	   	return this.http.post(encodedPath,voto,options).map(response => this.mapStatus(response.json()));
  	}

    votarPropuesta(voto:Voto, id_boliche, location: Location): Observable<Status>{
      if(id_boliche == undefined || location.lat == undefined || location.lon == undefined
        || voto.id_boliche == undefined || voto.id_tema == undefined || voto.tipo_like == undefined)
        throw "votarPropuesta parámetros sin definir";
      let path = this.domain + '/propuesta';
      let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'X-LAT': location.lat,
         'X-LON': location.lon
        });
      let options = new RequestOptions({ headers: headers });
       return this.http.post(encodedPath,voto,options).map(response => this.mapStatus(response.json()));
    }

  	private mapStatus(data): Status{
  		const status: Status = {code: undefined, detail: undefined, title: undefined};
      // for (var i = 0; i < data['voto'].length; i++) {
      //   voto.push({id_boliche: data['voto'][i].id_boliche,                       
      //              id_tema: data['voto'][i].id_tema,
      //              tipo_like: data['voto'][i].tipo_like});
      // }
      status.code = data['status'][0].code;
      status.detail = data['status'][0].detail;
      status.title = data['status'][0].title;
      return status;
  	}
}
