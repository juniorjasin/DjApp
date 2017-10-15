import { Http } from '@angular/http';
import { Boliche } from '../common/Boliche';
import { Localization } from '../common/Localization';
import { Observable } from 'rxjs/Observable';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class bolicheService {

	constructor(public http: Http){}

  	getBoliche(localization:Localization): Observable<Boliche>{
      let path = '/?lat=' + localization.lat + '&lon=' + localization.lon;
	    let encodedPath = encodeURI(path);
	   	return this.http.get(encodedPath).map(response => this.mapBoliche(response.json()));
  	}

  	private mapBoliche(data): Boliche{
  		const boliche: Boliche = {id: null, nombre: ''};
      boliche.id = data['boliche'].id;
      boliche.nombre = data['boliche'].nombre;
  		return boliche;
  	}
}