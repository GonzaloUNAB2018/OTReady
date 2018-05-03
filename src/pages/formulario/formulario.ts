import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/note.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ListaPage } from '../lista/lista';
import { HomePage } from '../home/home';
import { PerfilService } from '../../services/perfil.service';
import { Note } from '../../models/note';


@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  public currentDate: number;
  public homePage: HomePage;
  note: any = {} as Note;

  activate1: any;
  id: any = null;
  userId = this.afAuth.auth.currentUser.uid;
  items : Observable<any[]>
  image1: string = null;
  image2: string = null;  
  image3: string = null; 
  image4: string = null;
  lat: any = null;
  lng: any = null;
  horaFecha: any = null;
  formularioCoor: boolean; 
  perfil: any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public notesService: NotesService,
    private afAuth: AngularFireAuth,
    public alert: AlertController,
    public perfilService: PerfilService,
  ) {

    if(this.perfil != 0){
      perfilService.getPerfil(this.perfil)
        .valueChanges().subscribe(profile =>{
          if (profile == "Coordinador"){
            console.log("Sesión de Coordinador");
            this.formularioCoor = true
          }else if (profile == "Gerencial"){
            console.log("Sesión de Gerente");
            this.formularioCoor = true
          }else{
            console.log("Sesión de Técnico / Supervisor")
            this.formularioCoor = false
          }
         })

    };

    this.id = navParams.get('id');

    if(this.id != 0){
      notesService.getNote(this.id)
        .valueChanges().subscribe(note =>{
          console.log(note)
          this.note = note});
    };

    this.currentDate = Date.now();
    
  }

  ionViewDidLoad() {
    console.log("Formulario de Coordinador Iniciado");

  }
  

  //Agregar Notas al formulario
  addNote() {
    if(this.id != 0){
      this.notesService.editNote(this.note);
      alert('Nota editada con éxito');
      //this.sendNotificationwithImage();
      }
    else{
      this.note.id = Date.now();
      this.notesService.createNote(this.note);
      alert('Nota creada con éxito');
      }
      this.navCtrl.pop();
  }

  deleteNote(){
    this.notesService.deleteNote(this.note);
    alert('Nota eliminada con éxito');
    //this.navCtrl.pop();
    this.navCtrl.popTo(ListaPage);
  }

}

