import { Component } from '@angular/core';
import {ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { database, initializeApp,storage} from 'firebase'; 
import { FIREBASE_CONFIG } from '../../app/firebase.config'
import {Picture} from '../model'
import {HomePage} from '../home/home'
 

/**
 * Generated class for the PicturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-pictures',
  templateUrl: 'pictures.html',
})

export class PicturesPage {

   picturesValues: Picture[]=[];
  constructor(public modalCtrl: ModalController, private sanitizer:DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {
    initializeApp(FIREBASE_CONFIG);
  }

  openModal(picture) {

    var data = { message : picture };
    var modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();
  }
  
  sanitize(url?:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
doRefresh(refresher) {
  console.log('Begin async operation', refresher);
  var thisVa = this;
  thisVa.picturesValues = [];
  database().ref().orderByChild('addeddate').once('value', function(snapshot){
      
    var result =snapshot;

    result.forEach(function(p) {
     
     var childData = p.val();
       var picture = new Picture();
       picture.cuisineType = childData.cuisineType;
       picture.description = childData.description;
       picture.restaurant = childData.restaurant;
       
       console.log(picture);
       console.log(thisVa);
       var refPictures = storage().ref(childData.pictureLinkId);
       refPictures.getDownloadURL().then(function(url) {
        // Insert url into an <img> tag to "download"
          console.log('here');
          picture.pictureLinkId =  (url);
      }).catch(function(error) {
      
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
         
        }
      });
       thisVa.picturesValues.push(picture);
       refresher.complete();
   });
   
   //this.pictures = snapshot.val();
   });
}

  ionViewDidLoad() {
    var thisVa = this;
    database().ref().orderByChild('addeddate').on('child_added', function(snapshot){
      
      //var result =snapshot;
     // result.forEach(function(p) {
       
       var childData = snapshot.val();
         var picture = new Picture();
         picture.cuisineType = childData.cuisineType;
         picture.description = childData.description;
         picture.restaurant = childData.restaurant;
      
         var refPictures = storage().ref(childData.pictureLinkId);
         refPictures.getDownloadURL().then(function(url) {
          // Insert url into an <img> tag to "download"
            console.log((url)+"?alt=media");
            picture.pictureLinkId =  (url)+"?alt=media";
        }).catch(function(error) {
        
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
           
          }
        });
         thisVa.picturesValues.unshift(picture);
    // });
     
     //this.pictures = snapshot.val();
     });
    console.log('ionViewDidLoad PicturesPage');
  }

  TakePhoto() {
    this.navCtrl.push(HomePage);
  }

}
