import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Voto } from '../common/Voto';
import { Status } from '../common/Status';
import { Observable } from 'rxjs/Observable';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class votoService {

	constructor(public http: Http){}

  	postVoto(voto:Voto): Observable<Status>{
      let path = 'http://127.0.0.1:8081/register';
	    let encodedPath = encodeURI(path);
      let headers = new Headers(
      { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':  '*' });
      let options = new RequestOptions(
        { headers: headers});
	   	return this.http.post(encodedPath,voto,options).map(response => this.mapStatus(response.json()));
  	}

  	private mapStatus(data): Status{
  		const status: Status = {status: '', message: ''};
      status.status = data.status;
      status.message = data.message;
  		return status;
  	}
}