import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class locationService {

  watchPositionID: any;

	constructor(private geolocation: Geolocation){}

  	getLocation(): Observable<Location>{
      return this.geolocation.watchPosition().map(position => this.mapPosition(position));
  	}

    mapPosition(position): Location{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      const location: Location = {lat: null, lon: null};
      location.lat = position.coords.latitude;
      location.lon = position.coords.longitude;
      return location;
    }

    stopLocationWatch(){

    }
}