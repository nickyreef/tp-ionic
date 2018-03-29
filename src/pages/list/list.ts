import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
    this.jobs = [];
    this.fetchJobs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  fetchJobs(){
    this.httpClient.get('https://mobile-api-jobs.herokuapp.com/api/jobs').subscribe((data: any[]) => this.jobs = data);
  }

}
