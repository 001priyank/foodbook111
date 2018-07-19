import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {storage, database } from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config'
import { Camera, CameraOptions } from '@ionic-native/camera';
import {PicturesPage} from '../pictures/pictures'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
 
  public description:string;
  public cuisineType: string;
  public username: string;
  public restaurant:string;
  public pictureLinkId: string;
  constructor(private camera:Camera, public navCtrl: NavController) {

    
  }
   async takePhoto(){
    try {
      var today = new Date();
      console.log(today.getSeconds());
      var date = 1000- (today.getDate()+ today.getMinutes()); 
    
    const options: CameraOptions = { 
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    const result = await this.camera.getPicture(options);
    const picId = Math.random().toString(36).substring(2);
    
    var refPictures = storage().ref(date + '/pictures/'+ picId);
    
    
    const image = `data:image/jpeg;base64,${result}`;

       refPictures.putString(image, 'data_url').then(function(snapshot) {
        
    }); 
    
    
    var postRef = database().ref();
    var post = {
      description: this.description,
      cuisineType: this.cuisineType,
      restaurant : this.restaurant,
      addeddate : date,
      pictureLinkId: date + '/pictures/'+ picId +'/'
    };
    postRef.push(post);
    this.navCtrl.push(PicturesPage);
  }
  catch(e){
    console.log(e);
  }
  }
}
