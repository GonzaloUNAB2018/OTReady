import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { PaginaPrincipalPage } from '../pages/pagina-principal/pagina-principal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any
  userId: any
  perfil = "null"

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,

  ) {

    this.afAuth.auth.onAuthStateChanged(user =>{
      if (user){
        /*this.userId = this.afAuth.auth.currentUser.uid;
        this.afDb.object('Usuarios/'+this.userId).valueChanges().subscribe(perfil=>{
          if(perfil = undefined){
            this.rootPage = EditarPerfilPage;
            console.log(perfil)
          }else{
            this.rootPage = HomePage
          }
        });*/
        this.userId = this.afAuth.auth.currentUser.uid;
        console.log(this.userId);
        
        this.rootPage = PaginaPrincipalPage
      }else{
        this.rootPage = LoginPage
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

