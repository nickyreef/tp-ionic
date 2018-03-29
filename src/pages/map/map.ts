import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  lat: number = 51.678418;
  lng: number = 7.809007;

  private jobs;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public loadingContoller: LoadingController, private geolocation: Geolocation) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.fetchJobs();
    // this.geolocation.getCurrentPosition().then(resp => {
    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
  }

  ionViewWillEnter(){
    console.log(this.navParams);
    if(this.navParams.data.id){
      this.lat = Number(this.navParams.data.latitude);
      this.lng = Number(this.navParams.data.longitude); 
    } else {
      this.geolocation.getCurrentPosition().then(resp => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
    
  }

  fetchJobs(){
    let loading = this.loadingContoller.create({
      content: 'Patientez...'
    });
    loading.present();
    this.httpClient.get('https://mobile-api-jobs.herokuapp.com/api/jobs').subscribe((data: any[]) => {
      loading.dismiss();
      this.jobs = data.map(job => (
        {
          ...job,
          latitude: Number(job.latitude),
          longitude: Number(job.longitude)
        }
      ))
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

}
