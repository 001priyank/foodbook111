import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Picture } from '../model';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  picture: Picture
  pictureLinkId: string;
  constructor(private socialSharing: SocialSharing, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    console.log(this.navParams.data.message);
    this.picture = this.navParams.data.message;
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }
  public openWebsite() {
    this.iab.create('https://www.menulog.com.au/restaurants-liz-bath/menu');
    //browser.close();
  }
  public shareFacebook() {
    this.socialSharing.shareViaFacebook(this.picture.cuisineType, this.picture.pictureLinkId);
  }

}
