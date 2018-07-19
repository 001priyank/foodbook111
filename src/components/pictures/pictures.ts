import { Component } from '@angular/core';

/**
 * Generated class for the PicturesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pictures',
  templateUrl: 'pictures.html'
})
export class PicturesComponent {

  text: string;

  constructor() {
    console.log('Hello PicturesComponent Component');
    this.text = 'Hello World';
  }

}
