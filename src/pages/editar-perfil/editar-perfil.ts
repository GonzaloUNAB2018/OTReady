import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
//import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { EmpresaService } from '../../services/empresa.services';
import { Perfil } from '../../models/perfil';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilService } from '../../services/perfil.service';
import { HomePage } from '../home/home';


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

  uid = this.afAuth.auth.currentUser.uid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public empresaService: EmpresaService,
    public perfilService: PerfilService
  ) {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  
  //Agregar Empleados en Base de Datos
  signup() {
    if(this.id != 0){
      this.perfilService.editPerfil(this.user);
      alert('Perfil Actualizado');
      //this.sendNotificationwithImage();
      }
    else{
      this.user.id = this.uid;
      this.perfilService.createPerfil(this.user);
      alert('Bienvenido a OT Ready!');
      }
      this.navCtrl.setRoot(HomePage);
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
