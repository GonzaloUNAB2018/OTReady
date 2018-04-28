import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  edit(){
    this.navCtrl.pop()
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

      }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Hubo un error en el cierre de sesión',
        subTitle: 'Por favor intente nuevamente.',
        buttons: ['OK']
      });
        alert.present();})
        
      }
    
  

}
