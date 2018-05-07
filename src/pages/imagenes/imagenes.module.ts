import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagenesPage } from './imagenes';

@NgModule({
  declarations: [
    ImagenesPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagenesPage),
  ],
})
export class ImagenesPageModule {}
