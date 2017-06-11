import { AlertController } from 'ionic-angular';
import {Injectable} from '@angular/core';
import {DRIVER} from './mock-driver';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { LoginService } from "./login-service";



@Injectable()
export class DriverService {
  private driver:any;
  //data:any;
  constructor(private http:Http,private alertCtrl: AlertController,private logIn : LoginService) {
    this.driver = DRIVER;
  }
  // public DriverID 
  ApiUrl = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/SelectDriverDetails/';
  getCurrentDriver() {
    //console.log("urldata is: ", this.data);
    return this.driver;
  }

  login() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
    console.log(body);
    console.log(headers);
    return new Promise((resolve) => {
      this.http.post(this.ApiUrl+this.logIn.DriverID,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              console.log("User DATA : ",data.SelectDriverDetailsResult.FirstName);
              console.log("post ok");
              //this.DriverID
              resolve(data);
            },
            err => {
              console.log("ERROR!: ", err)
            })});
  }
  presentAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Login',
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}
}