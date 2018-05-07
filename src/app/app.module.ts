import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { BackgroundMode } from '@ionic-native/background-mode';
//import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Camera } from '@ionic-native/camera';


//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from './app.firebase.module';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { LoginPageModule } from '../pages/login/login.module';
import { LoginPage } from '../pages/login/login';
import { SigninPageModule } from '../pages/signin/signin.module';
import { PerfilService } from '../services/perfil.service';
import { EditarPerfilPageModule } from '../pages/editar-perfil/editar-perfil.module';
import { EmpresaService } from '../services/empresa.services';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { CambiosPerfilPageModule } from '../pages/cambios-perfil/cambios-perfil.module';
import { PaginaPrincipalPageModule } from '../pages/pagina-principal/pagina-principal.module';
import { ListaPageModule } from '../pages/lista/lista.module';
//import { FormularioPageModule } from '../pages/formulario/formulario.module';
import { NotesService } from '../services/note.service';
import { ImagenesPageModule } from '../pages/imagenes/imagenes.module';
import { BluetoothPageModule } from '../pages/bluetooth/bluetooth.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    //LoginPageModule,
    SigninPageModule,
    EditarPerfilPageModule,
    PerfilPageModule,
    CambiosPerfilPageModule,
    PaginaPrincipalPageModule,
    ListaPageModule,
    //FormularioPageModule,
    ImagenesPageModule,
    BluetoothPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PerfilService,
    EmpresaService,
    Camera,
    NotesService,
    BluetoothSerial,
    BackgroundMode,
    LocationAccuracy,
    //BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
