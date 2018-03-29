import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the AddJobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-add-job',
  templateUrl: 'add-job.html',
})
export class AddJobPage {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddJobPage');
    this.geolocation.getCurrentPosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  saveJob(){
    console.log('*** saving jobs ***');
  }

}
