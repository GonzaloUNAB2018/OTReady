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

    public getPerfil(perfil){
        //return this.afDatabase.object('profile/'+this.userId+'/perfil');
        //return this.afDatabase.object('profile/'+this.userId+'/perfil')
    }

}