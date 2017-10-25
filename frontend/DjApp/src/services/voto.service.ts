import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Voto } from '../common/Voto';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class votoService {

	constructor(public http: Http){}

  	postVoto(voto:Voto, id_boliche, location: Location): Observable<Voto []>{
      let path = '/boliches/' + voto.id_boliche + '/likes';
	    let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'Latitude': location.lat,
         'Longitude': location.lon
        });
      let options = new RequestOptions({ headers: headers });
	   	return this.http.post(encodedPath,voto,options).map(response => this.mapStatus(response.json()));
  	}

  	private mapStatus(data): Voto []{
  		const voto: Voto [] = [];
      for (var i = 0; i < data['voto'].length; i++) {
        voto.push({id_boliche: data['voto'][i].id_boliche,                       
                   id_tema: data['voto'][i].id_tema,
                   tipo_voto: data['voto'][i].tipo_voto});
      }
      return voto;
  	}
}