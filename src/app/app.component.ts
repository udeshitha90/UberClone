import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from 'ionic-native';

// import page
import {HomePage} from '../pages/home/home';
import {WalletPage} from '../pages/wallet/wallet';
import {JobHistoryPage} from '../pages/job-history/job-history';
import {SettingPage} from '../pages/setting/setting';
import {SupportPage} from '../pages/support/support';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from "../pages/register/register";
import { Http } from '@angular/http';


@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage:any;

  public nav:any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },
    {
      title: 'Wallet',
      icon: 'ios-albums',
      count: 0,
      component: WalletPage
    },
    {
      title: 'Job history',
      icon: 'md-time',
      count: 0,
      component: JobHistoryPage
    },
    {
      title: 'Setting',
      icon: 'settings',
      count: 0,
      component: SettingPage
    },
    {
      title: 'Support',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: SupportPage
    },
    {
      title: 'Logout',
      icon: 'md-exit',
      count: 0,
      component: LoginPage
    }
  ];
  // StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/60/62'
  constructor(public platform:Platform,private http:Http) {
    this.rootPage = RegisterPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    //this.StatusChange();
  }
  //  StatusChange() {
  //   let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  //   let body = new FormData();
   
  //   this.http.post(this.StatusURL,body,headers)
  //   .map(res => res.json())
  //       .subscribe(
  //           data => {
  //             console.log("nnnnnnnnn: ", data.Update_DriverStateResult);
  //              //status = data.Update_DriverStateResult
               
  //           },
  //           err => {
  //             console.log("ERROR!:  Status", err)
             
  //           }
  //       );
  // }
}


