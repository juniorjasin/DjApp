// import { Component, OnInit, Input } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import { ResultsPage } from'../results/results';
// import { LoadingController } from 'ionic-angular';
// import { Loading } from 'ionic-angular';

// import 'rxjs/add/operator/map';

// //Services
// import { 
//   estadisticasTemasService 
// } from '../../services/estadisticasTemas.service';
// import { 
//   temaService 
// } from '../../services/tema.service';
// import { 
//    errorManangerService
// } from '../../services/error.mananger.service';
// import { 
//   messagesService
// } from '../../services/messages.service';
// import { 
//    locationService
// } from '../../services/location.service';
// import { 
//    bolicheService
// } from '../../services/boliche.service';

// //Interfaces
// import { Boliche } from '../../common/Boliche';
// import { Location } from '../../common/Location';
// import { Observable } from 'rxjs/Observable';

// import { Media, MediaObject } from '@ionic-native/media';

// import { File, Entry } from '@ionic-native/file';

// import { Http, RequestOptions, Headers } from '@angular/http';

// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureAudioOptions } from '@ionic-native/media-capture';

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html',
//   providers: [estadisticasTemasService, temaService, errorManangerService,messagesService,locationService,bolicheService]
// })
// export class HomePage {

//   boliche: Boliche;
//   location: Location;
//   music:any;

//   //Delays
//   delay_buscarBoliche = 2000;

//   //Loading inicial
//   loading:Loading;

//   constructor(private _bolicheService: bolicheService,
//               private _locationService: locationService,
//               public navCtrl: NavController,
//               private _estadisticasTemasService: estadisticasTemasService,
//               private _temaService: temaService,
//               private _errorManangerService: errorManangerService,
//               private _messageService: messagesService,
//               private loadingCtrl: LoadingController,
//               private media: Media,
//               private file: File,
//               private mediaCapture: MediaCapture,
//               public http:Http,
//               private transfer: FileTransfer) {
//     this.boliche = {id: undefined, latitud: undefined, longitud: undefined ,nombre: undefined};
//     this.location = {lat: undefined, lon: undefined};
//     this.loading = this.loadingCtrl.create({
//       content: 'Buscando boliche...'
//     });


//   }

//   ngOnInit() {

//     uploadFile() {
//       let loader = this.loadingCtrl.create({
//         content: "Uploading..."
//       });
//       loader.present();
//       const fileTransfer: FileTransferObject = this.transfer.create();
  
//       let options: FileUploadOptions = {
//         fileKey: 'ionicfile',
//         fileName: 'ionicfile',
//         chunkedMode: false,
//         mimeType: "image/jpeg",
//         headers: {}
//       }
  
//       fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
//         .then((data) => {
//         console.log(data+" Uploaded Successfully");
//         this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
//         loader.dismiss();
//         this.presentToast("Image uploaded successfully");
//       }, (err) => {
//         console.log(err);
//         loader.dismiss();
//         this.presentToast(err);
//       });
//     }

//     // let options: CaptureAudioOptions = { limit: 1, duration: 5 };
//     // this.mediaCapture.captureAudio(options)
//     //   .then(
//     //     (data: MediaFile[]) => console.log(data),
//     //     (err: CaptureError) => console.error(err)
//     //   );


//     // const mediafile: MediaObject = this.media.create(this.file.externalRootDirectory + 'file1.mp3');
//     // const mediafile2: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.mp3');
//     // const mediaf
//     //console.log('suces');ile3: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.m4a');
//     // const mediafile4: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.ogg');
//     // const mediafile5: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.wav');
//     // const mediafile6: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.amr');
//     // const mediafile7: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.ape');
//     // const mediafile8: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.aac');


//     // // mp3, wav, m4a, flac, aac, amr, ape, ogg 
    
//     //     mediafile.startRecord();
//     //     // mediafile2.startRecord();
//     //     // mediafile3.startRecord();
//     //     // mediafile4.startRecord();
//     //     // mediafile5.startRecord();
//     //     // mediafile6.startRecord();
//     //     // mediafile7.startRecord();
//     //     // mediafile8.startRecord();
    
//     //         window.setTimeout(() => {
//     //             mediafile.stopRecord(); 
//     //             // mediafile2.stopRecord();
//     //             // mediafile3.stopRecord();
//     //             // mediafile4.stopRecord();
//     //             // mediafile5.stopRecord(); 
//     //             // mediafile6.stopRecord();
//     //             // mediafile7.stopRecord();
//     //             // mediafile8.stopRecord();

//     //             this._messageService.okMessage('termino grabar');
//     //             this.file.readAsBinaryString(this.file.externalRootDirectory, 'file1.mp3')
//     //             .then ( v => {const location:Location = {lat: '-31.337485' , lon: '-64.256521'};
//     //             this._temaService.cambiarTemaActual(1,'la mona - criminal',location,v).subscribe(
//     //               res => {this._messageService.okMessage('El tema ha sido cambiado con éxito!');},
//     //               error => {this._errorManangerService.threatError(error);}
//     //             );}, err => this._messageService.okMessage('Error' + err));
    
//     //         }
//     //         , 7000);



//     // const mediafile: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.flac');
    
//     //     mediafile.startRecord();
    
//     //         window.setTimeout(() => {
//     //             mediafile.stopRecord(); 
//     //             this._messageService.okMessage('termino grabar');
//     //             this.file.readAsBinaryString(this.file.externalDataDirectory, 'file1.flac')
//     //             .then ( v => this._messageService.okMessage('ok:' + v))
//     //             , err => this._messageService.okMessage('Error' + err)
//     //         }
//     //         , 5000);
        





    
    
//     // this.http.get('/file1.flac').subscribe(
//       //   d => {
//         //     let h = this.toUnicode(d.text());
//         //     console.log(h);
//         //     let path = 'http://localhost:9090' + '/rec/1';
//         //     let encodedPath = encodeURI(path);
//         //     let headers = new Headers(
//           //       {'Content-Type': 'application/json',
//           //        'X-LAT': '-31.337485',
//           //        'X-LON': '-64.256521'
//           //       });
//           //     let options = new RequestOptions({ headers: headers });
//           //      this.http.post(encodedPath,{audio:h},options).subscribe(das => console.log('listooo'));
          
//           //    }
//           //     ,err => console.log('err')
//           // );
        
          

//       // let headers = new Headers(
//       //   {'Content-Type': 'audio/flac'
//       //   });
//       // let options = new RequestOptions({ headers: headers });
          
//       // const fileTransfer: FileTransferObject = this.transfer.create();
  
//       // fileTransfer.upload(this.file.externalRootDirectory + 'file1.flac', 'http://54.86.110.165:9090/rec/1', options)
//       //  .then((data) => {
//       //    // success
//       //    console.log('success upload')
//       //  }, (err) => {
//       //    // error
//       //    console.log('fail load')
//       //  });
    

//       uploadFile() {
//         let loader = this.loadingCtrl.create({
//           content: "Uploading..."
//         });
//         loader.present();
//         const fileTransfer: FileTransferObject = this.transfer.create();
    
//         let options: FileUploadOptions = {
//           fileKey: 'ionicfile',
//           fileName: 'ionicfile',
//           chunkedMode: false,
//           mimeType: "image/jpeg",
//           headers: {}
//         }

//     // const mediafile: MediaObject = this.media.create(this.file.externalDataDirectory + 'file.flac');
    
//     //     mediafile.startRecord();
    
//     //         window.setTimeout(() => {
//     //             mediafile.stopRecord(); 


//     //             this._messageService.okMessage('termino grabar');
//     //         }
//     //         , 5000); 
    

//     // this._messageService.okMessage('applicationStorageDirectory:'+ this.file.applicationStorageDirectory); /data/user/0/io.ionic.starter
//     // this._messageService.okMessage('applicationDirectory:'+ this.file.applicationDirectory);android_asset/
//     // this._messageService.okMessage('cacheDirectory:'+ this.file.cacheDirectory); data/user/io.ionic.starter/cache
//     // this._messageService.okMessage('documentsDirectory:'+ this.file.documentsDirectory); null
//     // this._messageService.okMessage('externalApplicationStorageDirectory:'+ this.file.externalApplicationStorageDirectory); storage/emulated/0/Android/data/io.iomic.starter/
//     // this._messageService.okMessage('externalCacheDirectory:'+ this.file.externalCacheDirectory); storage/emulated/0/Android/data/io.iomic.starter/cache
//     // this._messageService.okMessage('externalDataDirectory:'+ this.file.externalDataDirectory); storage/emulated/0/Android/data/io.iomic.starter/files
//     // this._messageService.okMessage('externalRootDirectory:'+ this.file.externalRootDirectory); storage/emulated/0/
//     // this._messageService.okMessage('sharedDirectory:'+ this.file.sharedDirectory); null
//     // this._messageService.okMessage('syncedDataDirectory:'+ this.file.syncedDataDirectory); null
//     // this._messageService.okMessage('tempDirectory:'+ this.file.tempDirectory); null 


//     // const mediafile: MediaObject = this.media.create(this.file.externalDataDirectory + 'file1.mp3');

//     // mediafile.startRecord();
    
//     //     window.setTimeout(() => {
//     //         mediafile.stopRecord(); 
//     //         this._messageService.okMessage('termino grabar');
//     //         this.file.readAsBinaryString(this.file.externalDataDirectory, 'file1.mp3')
//     //         .then ( v => {const location:Location = {lat: '-31.337485' , lon: '-64.256521'};
//     //         this._temaService.cambiarTemaActual(1,'la mona - criminal',location,v).subscribe(
//     //           res => {this._messageService.okMessage('El tema ha sido cambiado con éxito!');},
//     //           error => {this._errorManangerService.threatError(error);}
//     //         );}, err => this._messageService.okMessage('Error' + err));

//     //     }
//     //     , 5000);



//   }

//   // private toUnicode(theString) {
//   //   var unicodeString = '';
//   //   for (var i=0; i < theString.length; i++) {
//   //     var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
//   //     while (theUnicode.length < 4) {
//   //       theUnicode = '0' + theUnicode;
//   //     }
//   //     theUnicode = '\\u' + theUnicode;
//   //     unicodeString += theUnicode;
//   //   }
//   //   return unicodeString;
//   // }


  

//   changeMusic(valueinput){
//     console.log("In ChangeMusic ");
//     console.log("ingreso:", valueinput);
//     if(valueinput != undefined && valueinput.trim() != ""){
//       if(valueinput.indexOf('-') !== -1){
//         if((valueinput.split('-').length-1) == 1){
//           const location:Location = {lat: '-31.337485' , lon: '-64.256521'};
//           this._temaService.cambiarTemaActual(this.boliche.id,valueinput,this.location,null).subscribe(status => {
//             console.log('Tema actual cambiado!');
//             this.music = "";
//             this._messageService.okMessage('El tema ha sido cambiado con éxito!');
//           },
//           error => this._errorManangerService.threatError(error));
//         }
//         else
//           this._messageService.okMessage('No puede utilizar múltiples veces el caracter "-"');
//       }
//       else
//         this._messageService.okMessage('El formato debe ser Nombre - Autor');
//     }
//     else{
//       console.log('changeMusic input vacío');
//       this._messageService.okMessage('No puede dejar el tema vacío!');
//     }
//   }

//   viewResults(){
//     this.navCtrl.push(ResultsPage,{
//         boliche: this.boliche,
//         location: this.location
//       });
//   }

//   private obtenerLocalizacion(){
//     this._locationService.getLocation().subscribe(location => {
//         this.location.lat = location.lat;
//         this.location.lon = location.lon;
//         console.log('latitude' + this.location.lat);
//         console.log('longitude' + this.location.lon);
//         //PRUEBA
//         this.location.lat = '-31.337485';
//         this.location.lon = '-64.256521';
//      });
//   }

//   private buscarBoliche(){
//     try{
//       this._bolicheService.getBoliches(this.location).subscribe(boliches => {
//         if(boliches.length == 0){
//           console.log('buscarBoliche => no se encontraron boliches');
//           setTimeout(()=>{ this.buscarBoliche(); }, this.delay_buscarBoliche);
//         }
//         else{
//           for (var i = 0; i < boliches.length; i++) {
//             this.boliche.id = boliches[i].id;
//             this.boliche.nombre = boliches[i].nombre;
//             this.boliche.latitud = boliches[i].latitud;
//             this.boliche.longitud = boliches[i].longitud;
//             this.loading.dismiss();
//             console.log('buscarBoliche => boliche encontrado ');
//             console.dir(this.boliche);
//           }
//         }
//       },
//       error => this._errorManangerService.threatError(error));
//     }
//     catch(exception){
//       console.log(exception);
//       setTimeout(()=>{ this.buscarBoliche(); }, this.delay_buscarBoliche);
//     }
//   }

//     private mostrarLoading(){
//     this.loading.present();
//   }
// }


import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private file: File,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {}

  // getImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageURI = imageData;
  //   }, (err) => {
  //     console.log(err);
  //     this.presentToast(err);
  //   });
  // }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "audio/mpeg",
      headers: {}
    }

    fileTransfer.upload(this.file.externalRootDirectory + 'wpp4.mp3', 'http://54.86.110.165:9090/rec/1', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "wpp4.mp3"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}

