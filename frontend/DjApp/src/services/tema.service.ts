import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Tema } from '../common/Tema';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class temaService {

  // domain = 'http://54.86.110.165:9090';
  domain = 'http://localhost:9090';

	constructor(public http: Http){}

  	getTemasPropuestos(id_boliche, location: Location): Observable<Tema[]>{
      if(id_boliche == undefined || location.lat == undefined || location.lon == undefined)
        throw "getTemasPropuestos parámetros sin definir";
      let path = this.domain + '/temas_propuestos/' + id_boliche;
	    let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'X-LAT': location.lat,
         'X-LON': location.lon
        });
      let options = new RequestOptions({ headers: headers });
	   	return this.http.get(encodedPath, options).map(response => this.mapTemasPropuestos(response.json()));
  	}

    private mapTemasPropuestos(data): Tema []{
  		const temas: Tema [] = [];
  		for (var i = 0; i < data['temas_propuestos'].length; i++) {
  			temas.push({id: data['temas_propuestos'][i].id,
                    nombre: data['temas_propuestos'][i].nombre,
                    imagen_tema: undefined,
                    color: undefined});//Hay que cambiar la API para que la devuelva.
  		}
  		return temas;
    }
    
    getTemaActual(id_boliche, location: Location): Observable<Tema []>{
      console.log("dentro de getTemaActual...");
      if(id_boliche == undefined || location.lat == undefined || location.lon == undefined)
        throw "getTemaActual parámetros sin definir";
      let path = this.domain + '/boliches/' + id_boliche + '/tema_actual';
      let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'X-LAT': location.lat,
         'X-LON': location.lon
        });
      let options = new RequestOptions({ headers: headers });
      console.log("getTemaActual: antes del http GET...");
      return this.http.get(encodedPath, options).map(response => this.mapTemaActual(response.json()));
    }

    private mapTemaActual(data): Tema [] {
      console.log("mapTemaActual: recibi de la API:");
      console.log(data);
      console.log("color:");
      const tema: Tema [] = [];
      console.log("mapTemaActual: antes del for...");
      for (var i = 0; i < data['tema_actual'].length; i++) {
        tema.push({id: data['tema_actual'][i].id,
        nombre: data['tema_actual'][i].nombre,
        imagen_tema: data['tema_actual'][i].album_art_url,
        color: data['tema_actual'][i].color});

        console.log(data['tema_actual'][i].color);
      }
      console.log("mapTemaActual: antes del return...");
      return tema;
    }
}
