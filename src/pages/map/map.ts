import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public loadingContoller: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.fetchJobs();
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

}
