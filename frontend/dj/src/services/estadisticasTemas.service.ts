import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Estadisticas_temas } from '../common/Estadisticas_temas';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class estadisticasTemasService {

  domain = 'http://54.86.110.165:9090';

	constructor(public http: Http){}

  	getEstadisticasTemas(id_boliche, location: Location): Observable<Estadisticas_temas>{
      if(id_boliche == undefined || location.lat == undefined || location.lon == undefined)
        throw "getEstadisticasTemas parámetros sin definir";
      let path = this.domain + '/estadisticas/' + id_boliche;
	    let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'X-LAT': location.lat,
         'X-LON': location.lon
        });
      let options = new RequestOptions({ headers: headers });
	   	return this.http.get(encodedPath, options).map(response => this.mapEstadisticasTemas(response.json()));
  	}

  	private mapEstadisticasTemas(data): Estadisticas_temas{
  		const estadisticasTemas: Estadisticas_temas = {
        estadisticas_tema_actual: {
          id_boliche: undefined,
          id_tema:    undefined,
          nombre:     undefined,
          likes:      undefined,
          not_like:   undefined
        }, 
        estadisticas_tema_propuesta: []};
      estadisticasTemas.estadisticas_tema_actual.id_boliche = data['estadisticas']['tema_actual'].id_boliche;
      estadisticasTemas.estadisticas_tema_actual.id_tema = data['estadisticas']['tema_actual'].id_tema;
      estadisticasTemas.estadisticas_tema_actual.nombre = data['estadisticas']['tema_actual'].nombre;
      estadisticasTemas.estadisticas_tema_actual.likes = data['estadisticas']['tema_actual'].likes;
      estadisticasTemas.estadisticas_tema_actual.not_like = data['estadisticas']['tema_actual'].not_like;
      
  		for (var i = 0; i < data['estadisticas']['propuestas'].length; i++) {
  			estadisticasTemas.estadisticas_tema_propuesta.push({
          id_boliche: data['estadisticas']['propuestas'][i].id_boliche,
          id_tema: data['estadisticas']['propuestas'][i].id_tema,
          nombre: data['estadisticas']['propuestas'][i].nombre,
          cantidad: data['estadisticas']['propuestas'][i].cantidad,
        });
  		}
  		return estadisticasTemas;
  	}
}
