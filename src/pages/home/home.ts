import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { storage, database } from 'firebase';
//import { FIREBASE_CONFIG } from '../../app/firebase.config'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PicturesPage } from '../pictures/pictures'
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public description: string;
  public cuisineType: string;
  public username: string;
  public restaurant: string;
  public pictureLinkId: string;
  captureDataUrl: string;
  alertCtrl: AlertController;

  constructor(private camera: Camera, public navCtrl: NavController) {


  }
  async takePhoto() {
    try {
    
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      const result = await this.camera.getPicture(options);
      

      let storageRef = storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);
  
      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`${filename}.jpg`);
  
      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
        .then((snapshot) => {
          // Do something here when the data is succesfully uploaded!
          this.showSuccesfulUploadAlert();
        });

      const image = `data:image/jpeg;base64,${result}`;

      imageRef.putString(image, 'data_url').then(function (snapshot) {
        this.showSuccesfulUploadAlert();
      });


      var postRef = database().ref();
      var post = {
        description: this.description,
        cuisineType: this.cuisineType,
        restaurant: this.restaurant,      
        pictureLinkId: filename+'.jpg'
      };
      postRef.push(post);
      this.navCtrl.push(PicturesPage);
    }
    catch (e) {
      console.log(e);
    }
  }

  getPicture(sourceType) {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions)
      .then((captureDataUrl) => {
        this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
      }, (err) => {
        console.log(err);
      });
  }

  upload() {
    let storageRef = storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot) => {
        // Do something here when the data is succesfully uploaded!
        this.showSuccesfulUploadAlert();
      });
      var postRef = database().ref();
      var post = {
        description: this.description,
        cuisineType: this.cuisineType,
        restaurant: this.restaurant,      
        pictureLinkId: filename+'.jpg'
      };
      postRef.push(post);
      this.navCtrl.push(PicturesPage);
  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }
}
