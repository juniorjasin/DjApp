import { Http } from '@angular/http';
import { Boliche } from '../common/Boliche';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class bolicheService {

	constructor(public http: Http){}

  	getBoliches(location:Location): Observable<Boliche []>{
      let path = '/boliches?lat=' + location.lat + '&lon=' + location.lon;
	    let encodedPath = encodeURI(path);
	   	return this.http.get(encodedPath).map(response => this.mapBoliche(response.json()), err => alert(err));
  	}

  	private mapBoliche(data): Boliche []{
  		const boliches: Boliche [] = [];
      for (var i = 0; i < data['boliches'].length; i++) {
        boliches.push({id: data['boliches'][i].id,                       
                       latitud: data['boliches'][i].latitud,
                       longitud: data['boliches'][i].longitud,
                       nombre: data['boliches'][i].nombre});
      }
  		return boliches;
  	}
}