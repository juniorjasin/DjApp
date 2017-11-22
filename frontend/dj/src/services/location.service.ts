import { Location } from '../common/Location';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

import { 
   Injectable 
} from '@angular/core';  

@Injectable()
export class locationService {

	constructor(private geolocation: Geolocation){}

  	getLocation(): Observable<Location>{
      return this.geolocation
      .watchPosition()
      .map(location => this.mapPosition(location));
  	}

    mapPosition(position): Location{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
      const location: Location = {lat: undefined, lon: undefined};
      location.lat = position.coords.latitude;
      location.lon = position.coords.longitude;
      return location;
    }

    stopLocationWatch(){

    }
}
