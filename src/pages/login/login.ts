import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    
  }

  login(){
      this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.navCtrl.setRoot(HomePage)
      },(err) => {
        let alert = this.alertCtrl.create({
          title: 'Email Incorrecto',
          subTitle: 'Credenciales Password e Email no coinciden, por favor intente nuevamente.',
          buttons: ['OK']
        });
        alert.present();})
        let loader = this.loadingCtrl.create({
          content: "Por favor espere...",
          duration: 3000
        });
        loader.present();
  }

  signin(){
    this.navCtrl.push(SigninPage);
  }

  back(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


}
