import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Tema } from '../common/Tema';
import { Status } from '../common/Status';
import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


//Grabar y mandar el tema
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class temaService {

  domain = 'http://54.86.110.165:9090';
  duracion_grabacion = 8000;

  constructor(public http: Http, private transfer: FileTransfer, private file: File){}

    cambiarTemaActual(id_boliche, location: Location, nombre_archivo: string): Promise<FileUploadResult>{
      if(id_boliche == undefined || location.lat == undefined || location.lon == undefined || nombre_archivo.trim() == '' || nombre_archivo == undefined)
        throw "cambiarTemaActual parámetros sin definir";
      let path = this.domain + '/rec/' + id_boliche;
    
      //Subir el archivo al backend
      let options: FileUploadOptions = {
        fileKey: 'ionicfile',
        fileName: 'ionicfile',
        chunkedMode: false,
        mimeType: "audio/mpeg",
        headers: {
          'Content-Type': 'application/json',
          'X-LAT': location.lat,
          'X-LON': location.lon
        }
      }

      const fileTransfer: FileTransferObject = this.transfer.create();
      return fileTransfer.upload(this.file.externalRootDirectory + nombre_archivo, path , options);
    }
}
