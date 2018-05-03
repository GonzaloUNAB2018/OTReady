import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user : any = {} as User;
  
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public afDb: AngularFireDatabase,
    public navParams: NavParams,
  ) {

  }

  signup(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
    .then(
      res => {
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Email Incorrecto',
          subTitle: 'El Email ingresado ya está ingresado, por favor intente con otro correo',
          buttons: ['OK']
        });
        alert.present();})
        let loader = this.loadingCtrl.create({
          content: 'Por favor espere...',
          duration: 1000
        });
        loader.present();
        setTimeout(() => {
          this.navCtrl.setRoot(EditarPerfilPage)
          let loader2 = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Usuario Creado',
            duration: 3000
          });
          loader2.present();
        }, 1000);
        /*this.afAuth.authState.subscribe(auth => {
          this.afDb.object('Empresas/'+this.empresa.id+'/'+this.user.empresa+'/'+this.user.primerNombre+' '+this.user.primerApellido).set(this.user)
        });*/
  } 

  back(){
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaEmpleadosPage');
  }

  ionViewWillUnload(){
  }


}
