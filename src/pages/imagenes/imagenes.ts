import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothPage } from '../bluetooth/bluetooth';


@IonicPage()
@Component({
  selector: 'page-imagenes',
  templateUrl: 'imagenes.html',
})
export class ImagenesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagenesPage');
  }

  toBluetoothPage(){
    this.navCtrl.push(BluetoothPage)
  }

}
