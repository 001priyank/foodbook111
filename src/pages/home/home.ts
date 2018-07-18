import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {storage, initializeApp} from 'firebase';
import { FIREBASE_CONFIG } from '../../app/firebase.config'
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private camera:Camera, public navCtrl: NavController) {

    initializeApp(FIREBASE_CONFIG);
  }
   async takePhoto(){
    try {
      const pictures = storage().ref('pictures/foodbook');
     
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const result = await this.camera.getPicture(options);
    const image = `data:image/jpeg;base64,${result}`;
 

    pictures.putString(image, 'data_url');
   
  }
  catch(e){

  }
  }
}
