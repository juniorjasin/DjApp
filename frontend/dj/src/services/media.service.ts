import 'rxjs/add/operator/map';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class mediaService {

    mediafile: MediaObject;
    nombre_archivo: string = 'nix-tema_actual.mp3';

	constructor(private media: Media, private file: File){
        this.mediafile = this.media.create(this.file.externalDataDirectory + this.nombre_archivo);
    }

    getMediaFile(){
        return this.mediafile;
    }

    getNombreArchivo(){
        return this.nombre_archivo;
    }

    empezarGrabacion(){
        this.mediafile.startRecord();
    }

    detenerGrabacion(){
        this.mediafile.stopRecord();
    }

    releaseGrabacion(){
        this.mediafile.release();
    }
}