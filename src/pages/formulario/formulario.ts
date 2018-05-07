import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { NotesService } from '../../services/note.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import firebase from 'firebase';
import { ListaPage } from '../lista/lista';
import { MapaPage } from '../mapa/mapa';
import { HomePage } from '../home/home';
import { PerfilService } from '../../services/perfil.service';
import { Platform } from 'ionic-angular/platform/platform';
//import { OneSignal } from '@ionic-native/onesignal';
import { Toast } from '@ionic-native/toast';


//import { OnesignalProvider } from '../../provaiders/onesignal.provaider';


@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  public currentDate: number;
  public homePage: HomePage;
  note: any = { 
    id: null,
    tipo: null,
    title: null,
    description: null,
    direccion:null,
    ciudad: null,
    region: null,
    descriptionFoto1: null,
    descriptionFoto2: null,
    descriptionFoto3: null,
    comentarios: null,
    eppAltura: null,
    vehiculo: null,
    especificarOtro: null,
    horaFecha: null,
    latitud: null,
    longitud: null,
    foto1: null,
    foto2: null,
    foto3: null,
    foto4: null,
  };

  activate1: any;
  id: any = null;
  tipo: any = null;
  userId = this.afAuth.auth.currentUser.uid;
  noteData: Observable<any>
  image1: string = null;
  image2: string = null;  
  image3: string = null; 
  image4: string = null;
  lat: any = null;
  lng: any = null;
  horaFecha: any = null;
  formularioCoor: boolean; 
  perfil: any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public notesService: NotesService,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private camera: Camera,
    public alert: AlertController,
    private geolocation: Geolocation,
    public perfilService: PerfilService,
    public popoverCtrl: PopoverController,
    //private oneSignal: OneSignal,
    //private oneSignal: OnesignalProvider,
    private platform: Platform,
    private toast: Toast
  ) {

    if(this.perfil != 0){
      perfilService.getPerfil(this.perfil)
        .valueChanges().subscribe(profile =>{
          if (profile == "Coordinador"){
            console.log("Sesión de Coordinador");
            this.formularioCoor = true
          }else if (profile == "Gerencial"){
            console.log("Sesión de Gerente");
            this.formularioCoor = true
          }else{
            console.log("Sesión de Técnico / Supervisor")
            this.formularioCoor = false
          }
         })

    }

    this.id = navParams.get('id');

    if(this.id != 0){
      notesService.getNote(this.id)
        .valueChanges().subscribe(note =>{
          console.log(note)
          this.note = note});
    }

    this.currentDate = Date.now();
    this.horaFecha = Date.now();
    this.noteData = afDatabase.object(`notas/`+this.id).valueChanges()

    //this.permiso()
    
  }

  ionViewDidLoad() {
    this.toast.show(`Formulario iniciado`, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  getLatLng(){
      this.geolocation.getCurrentPosition().then( pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.afDatabase.object(`notas/`+this.note.id+`/latitud`).set(pos.coords.latitude);        
        this.afDatabase.object(`notas/`+this.note.id+`/longitud`).set(pos.coords.longitude);
      }).catch( err => console.log('no hay coordenadas'));
    }
  

  //Agregar Notas al formulario
  addNote() {
    if(this.id != 0){
      this.notesService.editNote(this.note);
      alert('Nota editada con éxito');
      //this.createPushNotification();
      }
    else{
      this.note.id = Date.now();
      this.notesService.createNote(this.note);
      alert('Nota creada con éxito');
      }
      this.navCtrl.pop();
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    alert('Nota eliminada con éxito');
    //this.navCtrl.pop();
    this.navCtrl.popTo(ListaPage);
  }

  getPicture1(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,      
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 500,
      targetHeight: 500,
      quality: 50
    }
    this.camera.getPicture(options)
    .then(imageData => {
      this.image1 = `data:image/jpeg;base64,${imageData}`;
      const selfieRef = firebase.storage().ref(`profilePictures/`+this.note.id+`/form${this.currentDate}.jpg`);
      selfieRef.putString(imageData, 'base64', {contentType: 'image/jpg'})
      .then(savedNewPhoto => {
        firebase.database().ref(`notas/`+this.note.id+`/foto1`).set(savedNewPhoto.downloadURL);
        }).catch(error =>{
          console.error( error );
        });
    })
  }

  getPicture2(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,      
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 500,
      targetHeight: 500,
      quality: 50
    }
    this.camera.getPicture(options)
    .then(imageData => {
      this.image2 = `data:image/jpeg;base64,${imageData}`;
      const selfieRef = firebase.storage().ref(`profilePictures/`+this.note.id+`/form${this.currentDate}.jpg`);
      selfieRef.putString(imageData, 'base64', {contentType: 'image/jpg'})
      .then(savedNewPhoto => {
        firebase.database().ref(`notas/`+this.note.id+`/foto2`).set(savedNewPhoto.downloadURL);
        }).catch(error =>{
          console.error( error );
        });
    })
  }

  getPicture3(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,      
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 500,
      targetHeight: 500,
      quality: 50
    }
    this.camera.getPicture(options)
    .then(imageData => {
      this.image3 = `data:image/jpeg;base64,${imageData}`;
      const selfieRef = firebase.storage().ref(`profilePictures/`+this.note.id+`/form${this.currentDate}.jpg`);
      selfieRef.putString(imageData, 'base64', {contentType: 'image/jpg'})
      .then(savedNewPhoto => {
        firebase.database().ref(`notas/`+this.note.id+`/foto3`).set(savedNewPhoto.downloadURL);
        }).catch(error =>{
          console.error( error );
        });
    })
  }

  getPicture4(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit : true,      
      correctOrientation: true,
      saveToPhotoAlbum: true,
      targetWidth: 500,
      targetHeight: 500,
      quality: 50
    }
    this.camera.getPicture(options)
    .then(imageData => {
      this.image4 = `data:image/jpeg;base64,${imageData}`;
      const selfieRef = firebase.storage().ref(`profilePictures/`+this.note.id+`/form${this.currentDate}.jpg`);
      selfieRef.putString(imageData, 'base64', {contentType: 'image/jpg'})
      .then(savedNewPhoto => {
        firebase.database().ref(`notas/`+this.note.id+`/foto4`).set(savedNewPhoto.downloadURL);
        }).catch(error =>{
          console.error( error );
        });
    })
  }

  toMapaPage(){
    this.navCtrl.push(MapaPage);
  }



  //Push/////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////


/* to check if we have permission
permiso(){
this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      this.toast.setMessage('We have permission to send push notifications');
      this.toast.setPosition('middle');
      this.toast.setDuration(2000);
    } else {
      this.toast.setMessage('We do not have permission to send push notifications');
      this.toast.setPosition('middle');
      this.toast.setDuration(2000);
    }
  });}

// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
crearCanal(){
this.push.createChannel({
 id: "testchannel1",
 description: "My first test channel",
 // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
 importance: 3
}).then(() => console.log('Channel created'));
}

// Delete a channel (Android O and above)
borrarCanal(){
this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
}

// Return a list of currently configured channels
listaCanal(){
this.push.listChannels().then((channels) => console.log('List of channels', channels))
}

// to initialize push notifications
pushOpt(){
var options: PushOptions = {
   android: {
    senderID: "AAAAWAJjHEM:APA91bHCuLKvOUS0Ik9fSG220VoZlGUhJE9MmSgcr8hSLxgmyx4_1i9JTQzubsisy9JOZfF6NUpgh2h-SepCC90pK_328L_EFUZwnZSqvxzrX5ocBBdQQErOgXJF-MksgyEp2FjsrTkp",
    sound: true,
    vibrate: true,
    messageKey: "Prueba de Push",
    titleKey: "A ver!!!!!"
  },
   ios: {
       
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
};


const pushObject: PushObject = this.push.init(options);


pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
}


*/

    //onesignal ************************************************************************
  //************************************************************************************
  //*******************************************************************************

  /*sendPush2(){
    var sendNotification = function(data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic OTEwNDhkMzItNTMyNi00YjRmLWFjMzEtOWQwMWFkYjk4OWY1"
      };
      
      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };
      
      var require: any;
      var https = require('https');
      var req = https.request(options, function(res) {  
        res.on('data', function(data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });
      
      req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
      });
      
      req.write(JSON.stringify(data));
      req.end();
    };
    
    var message = { 
      app_id: "43c715a4-ac12-4ea8-9369-92ba67b797f8",
      contents: {"en": "English Message"},
      included_segments: ["All"]
    };
    
    sendNotification(message);
    
  }

  sendPush(){
    this.oneSignal.getIds().then( success => {
  
      let notificationObj:any = {
        app_id: "43c715a4-ac12-4ea8-9369-92ba67b797f8",
        included_segments: ["All"],
        contents: {"en": "Se ha agregado una nueva nota"},
        };
    
    this.oneSignal.postNotification(notificationObj).then( good => {
        
        //alert("Notification Post Success:\n" + id);
      }, error => {
        console.log(error);
        // alert("Notification Post Failed:\n" + JSON.stringify(error));
       // alert("Notification Post Failed:\n" + id);
      });
  
    })
  }

  createPushNotification(){
    //let current_id = this.userId
    //let current_id = this.cMap.car_notificationIds[this.NotifyTimes]
  
    if (this.platform.is('android')){
    this.sendPush2()
    console.log()
    }
     
    }
    */

}
