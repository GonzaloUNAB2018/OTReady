import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PerfilService{
    userId = this.afAuth.auth.currentUser.uid;    
    perfilData: Observable<any>    
    constructor(
        public afDatabase: AngularFireDatabase,
        private afAuth: AngularFireAuth){}
    //tipoPerfilUser: any = null;    
    perfil:any = null;
    uid: any = null;

    public getPerfil(perfil){
        return this.afDatabase.object('Usuarios/'+this.userId+'/perfil');
    }

    public getUidPerfil(userId){
        return this.afDatabase.object('Usuarios/'+this.userId);
    }

    public editPerfil(perfil){
        return this.afDatabase.database.ref(`Usuarios/`+this.userId).set(perfil);
    }

    public createPerfil(perfil){
        return this.afDatabase.database.ref(`Usuarios/`+this.userId).set(perfil);
    }
    

}