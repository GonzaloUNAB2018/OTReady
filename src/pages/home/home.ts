import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { PerfilService } from '../../services/perfil.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { LoginPage } from '../login/login';
import { Perfil } from '../../models/perfil';
import { PerfilPage } from '../perfil/perfil';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';
import { PaginaPrincipalPage } from '../pagina-principal/pagina-principal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId = this.afAuth.auth.currentUser.uid;
  perfilData: Observable<any>;
  coor: boolean;
  fotoPerfil: boolean;
  perfil: any = null;
  image: string = null;

  urlFoto : any = null
  storage = firebase.storage();
  storageRef = this.storage.ref();
  spaceRef : any

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public afDatabase: AngularFireDatabase,
    public perfilService: PerfilService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public camara: Camera,
    public zone: NgZone,
    ){
    

    this.perfil = this.perfilService.getPerfil
    this.perfilData = afDatabase.object(`Usuarios/`+ this.userId).valueChanges();

    if(this.perfil != 0){
      perfilService.getPerfil(this.perfil)
      .valueChanges().subscribe(perfil =>{
        if (perfil == "Coordinador"){
          console.log("Sesión de Coordinador");
          this.coor = true
          this.fotoPerfil = true;
          this.foto()
        }else if (perfil == "Gerente"){
          console.log("Sesión de Gerente");
          this.coor = true
          this.fotoPerfil = true;
          this.foto()
        }else if(perfil == "Supervisor / Técnico"){
          console.log("Sesión de Técnico / Supervisor")
          this.coor = false
          this.fotoPerfil = true;
          this.foto()
        }else{
          this.coor = false
          this.perfil == null
          this.fotoPerfil = false
          this.navCtrl.setRoot(EditarPerfilPage)
        }
      })
    }

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
      const imageUp = firebase.storage().ref(`Perfil/`+this.userId+`/Foto_Perfil.jpeg`);
        imageUp.putString(this.image, 'data_url')
      }).catch(error =>{
        console.error( error );
      });
    }

    foto(){
      this.storageRef.child(`Perfil/`+this.userId+`/Foto_Perfil.jpeg`).getDownloadURL()
      .then((url) =>{
        this.zone.run(()=>{
          this.urlFoto = url;
        })
      })
  
    }

 
  toPerfilPage(){
    this.navCtrl.push(PerfilPage)
  }

  toListaPage(){
    //this.navCtrl.push(ListaPage);
  }

  toInfoPage(){
    //this.navCtrl.push(InfoPage);
  }

  toUsuariosPage(){
    //this.navCtrl.push(ContactosPage);
  }

  back(){
    this.navCtrl.setRoot(PaginaPrincipalPage)
  }

  ionViewWillEnter(){

  }

  ionViewDidLoad() {
  }

}