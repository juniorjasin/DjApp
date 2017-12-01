import { Http } from '@angular/http';
import { Boliche } from '../common/Boliche';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class bolicheService {

  // domain = 'http://54.86.110.165:9090';
  domain = 'http://localhost:9090';

	constructor(public http: Http){}

  	getBoliches(location:Location): Observable<Boliche []>{
      if(location.lat == undefined || location.lon == undefined)
        throw "getBoliches parámetros sin definir";
      let path = this.domain + '/boliches?lat=' + location.lat + '&lon=' + location.lon;
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
