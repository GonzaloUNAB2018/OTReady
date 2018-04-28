import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmpresaService{

    empresaData: Observable<any>
    constructor(
        public afDatabase: AngularFireDatabase,
    ){}

    empresas: any = { id: null, nombre: null }
    id: any = null;
    nombre: any = null;

    public getEmpresas(){
        return this.afDatabase.list(`Empresas/`);
    }
    public getEmpresa(id){
        return this.afDatabase.object(`Empresas/`+id);
    }
    /*public createEmpresa(empresa){
        return this.afDatabase.database.ref(`Empresas/`+empresa.id).set(empresa);
    }*/
    
}