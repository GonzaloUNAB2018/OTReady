import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PerfilService } from '../../services/perfil.service';
import { EmpresaService } from '../../services/empresa.services';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../../models/perfil';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-cambios-perfil',
  templateUrl: 'cambios-perfil.html',
})
export class CambiosPerfilPage {

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
    public perfilService: PerfilService
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiosPerfilPage');
  }
  
  //Agregar Empleados en Base de Datos
  cambiosRealizados() {
      this.user.id = this.uid;
      this.perfilService.createPerfil(this.user);
      alert('Cambios Realizados');
      this.navCtrl.pop();
  }
  
  back(){
    this.navCtrl.pop()
  }

}
