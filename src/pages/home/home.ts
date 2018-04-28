import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import { ModalController } from 'ionic-angular/components/modal/modal-controller';
//import { ListaPage } from '../lista/lista';
//import { InfoPage } from '../info/info';
import { PerfilService } from '../../services/perfil.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
//import { ContactosPage } from '../contactos/contactos';
import { LoginPage } from '../login/login';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';
import { empty } from 'rxjs/Observer';
import { Perfil } from '../../models/perfil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId = this.afAuth.auth.currentUser.uid;
  perfilData: Observable<any>;
  coor: boolean;
  perfilUser : any;
  perfil: any = null;
  rut: any = null;
  usuario : any = {} as Perfil

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public afDatabase: AngularFireDatabase,
    public perfilService: PerfilService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    ) {

    this.perfilData = afDatabase.object(`Usuarios/`+ this.userId).valueChanges()

    this.perfil = this.perfilService.getPerfil

    if(this.perfil != 0){
      perfilService.getPerfil(this.perfil)
        .valueChanges().subscribe(perfil =>{
          if (perfil == null ){
            this.navCtrl.setRoot(EditarPerfilPage)
          }else{
          if (perfil == "Coordinador"){
            console.log("Sesión de Coordinador");
            this.coor = true
          }else if (perfil == "Gerencial"){
            console.log("Sesión de Gerente");
            this.coor = true
          }else{
            console.log("Sesión de Técnico / Supervisor")
            this.coor = false;}
          }
        }
      )
    }
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

  toListaPage(){
    //this.navCtrl.push(ListaPage);
  }

  toInfoPage(){
    //this.navCtrl.push(InfoPage);
  }

  toUsuariosPage(){
    //this.navCtrl.push(ContactosPage);
  }

  ionViewDidLoad() {
  }

}

