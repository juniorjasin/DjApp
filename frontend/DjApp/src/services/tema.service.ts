import { Http } from '@angular/http';
import { Tema } from '../common/Tema';
import { Observable } from 'rxjs/Observable';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class temaService {

	constructor(public http: Http){}

  	getTemas(id_boliche): Observable<Tema[]>{
      let path = '127.0.0.1:9090/temas_actuales/' + id_boliche;
	    let encodedPath = encodeURI(path);
	   	return this.http.get(encodedPath).map(response => this.mapTemas(response.json()));
  	}

    getTemaActual(id_boliche): Observable<Tema>{
      let path = '//' + id_boliche;
      let encodedPath = encodeURI(path);
      return this.http.get(encodedPath).map(response => this.mapTemaActual(response.json()));
    }

  	private mapTemas(data): Tema []{
  		const temas: Tema [] = [];
  		for (var i = 0; i < data['temas_propuestos'].length; i++) {
  			temas.push({id: data['temas_propuestos'].id,
                    nombre: data['temas_propuestos'][i].nombre, 
                    autor: data['temas_propuestos'][i].autor});
  		}
  		return temas;
  	}

    private mapTemaActual(data): Tema {
      const tema: Tema = {id: null, nombre: '', autor: ''};
      tema.nombre = data['tema_actual'].nombre;
      tema.autor  = data['tema_actual'].autor;
      tema.id     = data['tema_actual'].id;
      return tema;
    }
}