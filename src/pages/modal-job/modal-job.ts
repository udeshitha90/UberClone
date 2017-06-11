import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import { Http } from '@angular/http';
import { LoginService } from "../../services/login-service";

@Component({
  selector: 'page-modal-job',
  templateUrl: 'modal-job.html'
})
export class ModalJobPage {
  // job info
  public job: any;
  public isBookingTrue

  // remaining time for countdown
  public remainingTime = 20;

  constructor(public viewCtrl: ViewController, public jobService: JobService,private http:Http,private logIn : LoginService) {
    // get job info from service
    this.job = jobService.getItem(1);

     console.log("Thenaaaaa  ");
    //Get Booking Time to time
    this.isBookingTrue = this.logIn.GetBooking()
    // start count down
    this.countDown();
  }
    StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/50/'
    // BookingURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/CurrentBookingByUserID/83'
    public BookingID

  // close modal
  close() {
    this.viewCtrl.dismiss();
   
  }

  // count down
  countDown() {
    let interval = setInterval(() => {
      this.remainingTime--;

      // if time is over
      if (this.remainingTime == 0) {
        // stop interval
        
        clearInterval(interval)
        this.viewCtrl.dismiss();
      }
    }, 1000);
  }

  // accept job
  accept() {
    // close and accept a job
    this.viewCtrl.dismiss(true);
    this.StatusChange();
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


  // IsBooking() {
  //   let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  //   let body = new FormData();
   
  //   this.http.post(this.BookingURL,body,headers)
  //   .map(res => res.json())
  //       .subscribe(
  //           data => {
  //             console.log("Bok : ", data.CurrentBookingByUserIDResult);
  //              //status = data.Update_DriverStateResult
               
  //           },
  //           err => {
  //             console.log("ERROR!:  Status", err)
             
  //           }
  //       );
  // }
}

