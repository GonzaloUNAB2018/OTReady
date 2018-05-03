import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { ListaPage } from '../lista/lista';


@IonicPage()
@Component({
  selector: 'page-pagina-principal',
  templateUrl: 'pagina-principal.html',
})
export class PaginaPrincipalPage {

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaPrincipalPage');
  }

  toHomePage(){
    this.navCtrl.push(HomePage)
  }

  toListaPage(){
    this.navCtrl.push(ListaPage)
  }

  logout(){
    this.afAuth.auth.signOut()
    .then(() =>{

      let loader = this.loadingCtrl.create({
        content: "Cerrando Sesión...",
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
