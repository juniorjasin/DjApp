import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Tema } from '../common/Tema';
import { Status } from '../common/Status';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class temaService {

  domain = 'http://54.86.110.165:9090';

	constructor(public http: Http){}

    cambiarTemaActual(id_boliche, nombre_tema, location: Location): Observable<Status>{
      if(id_boliche == undefined || nombre_tema == undefined || location.lat == undefined || location.lon == undefined)
        throw "cambiarTemaActual parámetros sin definir";
      let path = this.domain + '/boliches/' + id_boliche + '/tema_actual';
      let encodedPath = encodeURI(path);
      let headers = new Headers(
        {'Content-Type': 'application/json',
         'X-LAT': location.lat,
         'X-LON': location.lon
        });
      let options = new RequestOptions({ headers: headers });
       return this.http.post(encodedPath,{nombre_tema:nombre_tema},options).map(response => this.mapStatus(response.json()));
    }

    private mapStatus(data): Status{
      const status: Status = {code: undefined, detail: undefined, title: undefined};
      status.code = data['status'][0].code;
      status.detail = data['status'][0].detail;
      status.title = data['status'][0].title;
      return status;
    }
}
