import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {HomePage} from '../home/home';
import { Http } from '@angular/http';
import { LoginService } from "../../services/login-service";

@Component({
  selector: 'page-pick-off',
  templateUrl: 'pick-off.html'
})
export class PickOffPage {
  // job info
  public job: any;

  constructor(public nav: NavController, public jobService: JobService, public alertCtrl: AlertController,private http:Http,private logIn : LoginService) {
    // get job info from service
    this.job = jobService.getItem(1);
  }
  StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/30/'
  // show payment popup
  showPayment() {
    let prompt = this.alertCtrl.create({
      title: 'Total (cash):',
      message: '<h1>LKR 200.00</h1>',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // comeback to home page
            this.StatusChange();
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });

    prompt.present();
  }

  StatusChange() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
   
    this.http.post(this.StatusURL+this.logIn.DriverID,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              console.log("nnnnnnnnn: ", data.Update_DriverStateResult);
               //status = data.Update_DriverStateResult
               
            },
            err => {
              console.log("ERROR!:  Status", err)
             
            }
        );
  }
}
