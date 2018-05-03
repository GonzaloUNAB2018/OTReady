import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { storage } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Perfil } from '../../models/perfil';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilService } from '../../services/perfil.service';
import { CambiosPerfilPage } from '../cambios-perfil/cambios-perfil';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  image: string = null;
  imageUp: string = null;
  uid = this.afAuth.auth.currentUser.uid

  perfilData: Observable<any>;
  coor: boolean;
  perfilUser : any;
  perfil: any = null;
  rut: any = null;
  usuario : any = {} as Perfil
  imagePerfil : string = null;


  urlFoto : any;
  storage = firebase.storage();
  storageRef = this.storage.ref();
  imagesRef = this.storageRef.child(`Perfil/`+this.uid);
  spaceRef = this.storageRef.child(`Perfil/`+this.uid+`/Foto_Perfil.jpeg`);

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camara: Camera,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public zone: NgZone,
    public perfilService: PerfilService
  ) {

    this.spaceRef.getDownloadURL().then((url) =>{
      this.zone.run(()=>{
        this.urlFoto = url;
      })
      
    })

    this.perfilData = afDb.object(`Usuarios/`+ this.uid).valueChanges()

    this.perfil = this.perfilService.getPerfil

  }

  getFotoPerfil(){
    this.camara.getPicture({
      destinationType: this.camara.DestinationType.DATA_URL,
      sourceType : this.camara.PictureSourceType.CAMERA,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      allowEdit : true,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 75,
      saveToPhotoAlbum: true
    }).then(imageData =>{
    this.image = `data:image/jpeg;base64,${imageData}`;
    const imageUp = firebase.storage().ref(`Perfil/`+this.uid+`/Foto_Perfil.jpeg`);
      imageUp.putString(this.image, 'data_url')
    }).catch(error =>{
      console.error( error );
    });
  }

toCambiostPerfil(){
  this.navCtrl.push(CambiosPerfilPage)
}

back(){
  this.navCtrl.pop()
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
