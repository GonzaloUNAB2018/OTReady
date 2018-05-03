import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
//import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

//Control de la lista de formularios
@Injectable()
export class NotesService{
    //userId = this.afAuth.auth.currentUser.uid;    
    //perfilData: Observable<any>    
    constructor(
        public afDatabase: AngularFireDatabase,
        //private afAuth: AngularFireAuth
    ){}
    //notes:any= null;
    notes: any = { id: null, tipo: null, title: null, description: null };
    id: any = null;    
    public getNotes(){
        return this.afDatabase.list('notas/');
    }
    public getNote(id){
        return this.afDatabase.object('notas/'+id);   
    }
    public createNote(note){
        this.afDatabase.database.ref('notas/'+note.id).set(note);
    }
    public editNote(note){
        this.afDatabase.database.ref('notas/'+note.id).set(note);        
    }
    public deleteNote(note){
        this.afDatabase.database.ref('notas/'+note.id).remove();        
    }
}