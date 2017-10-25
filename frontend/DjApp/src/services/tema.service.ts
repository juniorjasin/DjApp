import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Tema } from '../common/Tema';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class temaService {

	constructor(public http: Http){}

  	getTemasPropuestos(id_boliche, location: Location): Observable<Tema[]>{
      let path = '/boliches' + id_boliche + '/temas_propuestos/';
	    let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'Latitude': location.lat,
         'Longitude': location.lon
        });
      let options = new RequestOptions({ headers: headers });
	   	return this.http.get(encodedPath, options).map(response => this.mapTemasPropuestos(response.json()));
  	}

    getTemaActual(id_boliche, location: Location): Observable<Tema []>{
      let path = '/boliches/' + id_boliche + '/tema_actual';
      let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'Latitude': location.lat,
         'Longitude': location.lon
        });
      let options = new RequestOptions({ headers: headers });
      return this.http.get(encodedPath, options).map(response => this.mapTemaActual(response.json()));
    }

  	private mapTemasPropuestos(data): Tema []{
  		const temas: Tema [] = [];
  		for (var i = 0; i < data['temas_propuestos'].length; i++) {
  			temas.push({id: data['temas_propuestos'][i].id,
                    nombre: data['temas_propuestos'][i].nombre});
  		}
  		return temas;
  	}

    private mapTemaActual(data): Tema [] {
      const tema: Tema [] = [];
      for (var i = 0; i < data['tema_actual'].length; i++) {
        tema.push({id: data['tema_actual'][i].id,
                    nombre: data['tema_actual'][i].nombre});
      }
      return tema;
    }
}