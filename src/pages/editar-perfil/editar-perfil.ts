import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { EmpresaService } from '../../services/empresa.services';
import { Perfil } from '../../models/perfil';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilService } from '../../services/perfil.service';
import { HomePage } from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  empresas: {}[];
  user = {} as Perfil;
  id : any = null;
  userId : any;
  perfilData: Observable<any>;
  uid = this.afAuth.auth.currentUser.uid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public empresaService: EmpresaService,
    public perfilService: PerfilService,
    public camara: Camera,
  ) {

    this.perfilData = afDb.object(`Usuarios/`+ this.userId).valueChanges()

    //Leer lista de empresas
    this.id = navParams.get('id');
    if(this.id !=0){
      let loader = this.loadingCtrl.create({
        content: "Recopilando datos...",
        duration: 1500
      });
      loader.present();
      empresaService.getEmpresas().valueChanges()
      .subscribe( empresas => {
        console.log(empresas)
        this.empresas = empresas;
      });
    };


  }

  getFotoPerfil(){
    /*this.camara.getPicture({
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
    });*/
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  
  //Agregar Empleados en Base de Datos
  signup() {
      this.user.id = this.uid;
      this.perfilService.createPerfil(this.user);
      alert('Validando datos...');
      this.navCtrl.setRoot(LoginPage);
  }
  
  logout(){
    this.afAuth.auth.signOut()
    .then(() =>{

      let loader = this.loadingCtrl.create({
        content: "Serrando Sesión...",
        duration: 2000
      });
      loader.present().then(()=>
      {this.navCtrl.setRoot(LoginPage);}
    );

      }),(error) => {
      let alert = this.alertCtrl.create({
        title: 'Hubo un error en el cierre de sesión',
        subTitle: 'Por favor intente nuevamente.',
        buttons: ['OK']
      });
        alert.present();}
        
      }

}
