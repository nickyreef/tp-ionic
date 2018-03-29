import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  jobs = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, public loadingContoller: LoadingController) {
    this.jobs = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.fetchJobs();
  }

  fetchJobs(){
    let loading = this.loadingContoller.create({
      content: 'Patientez...'
    });
    loading.present();
    this.httpClient.get('https://mobile-api-jobs.herokuapp.com/api/jobs').subscribe((data: any[]) => {
      loading.dismiss();
      this.jobs = data
    });
  }

}
