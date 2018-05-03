import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { NotesService } from '../../services/note.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilService } from '../../services/perfil.service';
import { FormularioPage } from '../formulario/formulario';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  id: any = null;
  notes:any= null;
  title: any = null;
  perfil: any = null;

  userId = this.afAuth.auth.currentUser.uid;    

  listaCoor: boolean;  
  body: any


  @ViewChild('myNav') nav: NavController;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public notesService : NotesService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    public perfilService: PerfilService,
  )
    {

      if(this.perfil != 0){
        perfilService.getPerfil(this.perfil)
          .valueChanges().subscribe(profile =>{
            if (profile == "Coordinador"){
              console.log("Sesión de Coordinador");
              this.listaCoor = true;
            }else if (profile == "Gerencial"){
              console.log("Sesión de Gerente");
              this.listaCoor = true;
            }else{
              console.log("Sesión de Técnico / Supervisor")
              this.listaCoor = false;
            }
           })
      }

      //leer lista de Ots, Firebase
      this.id = navParams.get(`id`);
      if(this.id != 0){
      let loader = this.loadingCtrl.create({
        content: "Cargando Formularios...",
        duration: 2000
      });
      loader.present();
      notesService.getNotes()
      .valueChanges().subscribe(notas => {
          console.log(notas)
          this.notes = notas;
        });
      };
    }
  ionViewDidLoad() {
    console.log(this.userId);
  }

  //A formulario
  public goToDetail(id){
    this.perfilService.getPerfil(this.perfil)
    .valueChanges().subscribe(profile =>{
      if (profile == "Coordinador"){
        this.navCtrl.push(FormularioPage, {id:id});
      }else {
        this.navCtrl.push(FormularioPage, {id:id});
      }
    })
  }

  public createNote(){
    this.navCtrl.push(FormularioPage, {id:0});
    
  }
  backToHome(){
    this.navCtrl.pop();
  }

}
