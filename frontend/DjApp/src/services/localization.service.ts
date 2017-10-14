import { Localization } from '../common/Localization';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class localizationService {

	constructor(private geolocation: Geolocation){}

  	getLocalization(): Observable<Localization>{
      return this.geolocation.watchPosition().map(position => this.mapPosition(position));            
  	}

    mapPosition(position): Localization{
      const localization: Localization = {lat: null, lon: null};
      localization.lat = position.coords.latitude;
      localization.lon = position.coords.longitude;
      return localization;
    }
}