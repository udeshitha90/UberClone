import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {PickOffPage} from '../pick-off/pick-off';
import { Http } from '@angular/http';
import { LoginService } from "../../services/login-service";

@Component({
  selector: 'page-pick-up',
  templateUrl: 'pick-up.html'
})
export class PickUpPage {
  // job info
  public job: any;

  constructor(public nav: NavController, public jobService: JobService,private http:Http,private logIn : LoginService) {
    // get job info from service
    this.job = jobService.getItem(1);
  }
  StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/50/'
  // pick off
  pickup() {
    this.nav.setRoot(PickOffPage);
    this.StatusChange() ;
  }

  StatusChange() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
   
    this.http.post(this.StatusURL+this.logIn.DriverID,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              console.log("Pik Up: ", data);
               //status = data.Update_DriverStateResult
               
            },
            err => {
              console.log("ERROR!:  Status", err)
             
            }
        );
  }
}
