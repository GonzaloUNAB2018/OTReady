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
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
/*import { 
  BackgroundGeolocation, 
  BackgroundGeolocationConfig, 
  BackgroundGeolocationResponse
 } from '@ionic-native/background-geolocation';*/

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
    private backgroundMode: BackgroundMode,
    private locationAccuracy: LocationAccuracy,
    //private backgroundGeolocation: BackgroundGeolocation


  ) {

    /*const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
    .subscribe((location: BackgroundGeolocationResponse) => {

    console.log(location);

    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    //this.backgroundGeolocation.finish(); // FOR IOS ONLY

    });*/


    

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });

    
    this.backgroundMode.enable();


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
        //this.backgroundGeolocation.start();
      }else{
        this.rootPage = LoginPage;
        //this.backgroundGeolocation.stop();
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

