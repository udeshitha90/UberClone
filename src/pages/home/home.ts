import {Component} from '@angular/core';
import {NavController, ModalController, AlertController} from 'ionic-angular';
import {DriverService} from '../../services/driver-service';
import {ModalJobPage} from '../modal-job/modal-job';
import {PickUpPage} from "../pick-up/pick-up";
import { LoginService } from "../../services/login-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // driver info
  public driver:any;
  public dv:any;
  BookingStatus
  constructor(public nav: NavController, public driverService: DriverService, public modalCtrl: ModalController,
              public alertCtrl: AlertController,private logIn : LoginService) {

    // get driver info from service
    this.driver = driverService.getCurrentDriver();
    
     setTimeout(() => {
     this.logIn.GetBooking().then((result) => {
       this.BookingStatus = result    
       console.log("Res Log: ", this.BookingStatus);

         if(this.BookingStatus == 0)
    {
       
        console.log("IF : ", this.BookingStatus);
    }
    else if(this.BookingStatus != 0){
      
        console.log("IElse: ", this.BookingStatus);
         this.show()
        
    }
  
         });
     },1000);
   
    
  }
  getData(){
    this.driverService.login().then(result => {
            this.dv = result;
            console.log("ASHAAAAAn :",this.dv.SelectDriverDetailsResult.FirstName);
        });
  }

  ionViewDidLoad(){
    
    this.getData();
  }
  ionViewWillLoad(){
   
  }

  // make array with range is n
  range(n) {
    return new Array(n);
  }

  // confirm a job
  confirmJob() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // go to pickup page
            this.nav.setRoot(PickUpPage);
          }
        }
      ]
    });
    confirm.present();
  }

  get() {
    this.logIn.GetBooking().then((result) => {
       status = result    
       
        });
    
   
       
  }
  show(){
     // show modal
    
    let modal =this.modalCtrl.create(ModalJobPage);
    
    // listen for modal close
    modal.onDidDismiss(confirm => {
      if (confirm) {
        // show confirm box
        this.confirmJob();
      } else {
        // do nothing
      }
    });
    
    setTimeout(() => {
      modal.present();
    },1000);
  }


   
}
