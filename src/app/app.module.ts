import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PicturesPage } from '../pages/pictures/pictures';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PicturesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PicturesPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    InAppBrowser,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
