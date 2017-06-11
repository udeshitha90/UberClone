import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home'
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map'
import { ViewChild, ElementRef } from '@angular/core';
import { LocationTracker } from '../../providers/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginService } from "../../services/login-service";




declare var google;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  lat=0.0;
  long=0.0;
  
//  @ViewChild('map') mapElement: ElementRef;
//   map: any;
  
  user: {
    name: string;
    password: string;
  };
  public userID;
  
  // ApiUrl = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Login/'
  // StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/30/62'
   LocationURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/UpdateLocation/62/'
   StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/60/62'

  public Sstatus;
  public name;


  constructor(public nav: NavController,private http:Http,private alertCtrl: AlertController,
  public locationTracker: LocationTracker,public geolocation: Geolocation, private logIn : LoginService) {
    this.user={name:'',password:''};
    
   
    //console.log("Lat Long",this.Lat);
  }
   ionViewDidLoad(){
    // this.loadMap();
    //                 this.UpdateLocation() ;
    //                 this.StatusChange();
  }
  signup() {
    this.StatusChange()
    this.nav.setRoot(RegisterPage);
  }
 
  login() {
    this.logIn.login(this.user.name,this.user.password).then((result) => {
           
            //this.Sresult = result;
          // console.log("Hello.... :",result);
       
  
     if (result==true){
            this.nav.setRoot(HomePage);
            //this.nav.push(HomePage)
            //this.loadMap()
             this.presentAlert('Successfully login !')
        } else
        {
        this.presentAlert('Please try agin !');
        }
        });
    // let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    // let body = new FormData();
    // body.append('Username', 'abc');
    // body.append('Password', '123');
    // body.append('IMEI', '0');
    // console.log(body);
    // console.log(headers);
    // this.http.post(this.ApiUrl+this.user.name+'/'+this.user.password+'/0',body,headers)
    // .map(res => res.json())
    //     .subscribe(
    //         data => {
    //           //console.log(data);
    //          // console.log("post ok");
    //            status = data.LoginResult.Success
    //           // console.log("Data: ", status);
    //             if (data.LoginResult.Success == 1){
    //               this.nav.setRoot(HomePage);
    //               this.userID = data.LoginResult.UserID
    //               console.log("User ID IS: ", this.userID);
    //               //this.nav.push(HomePage)
    //               //console.log( this.userID);
    //                this.loadMap();
    //                 this.StatusChange();
                   
    //               this.presentAlert('Successfully login !')
    //             }
    //             else
    //              this.presentAlert('Please try agin !');
    //         },
    //         err => {
    //           console.log("ERROR!: ", err)
             
    //         }
    //     );
       
  }
//   StatusChange() {
//     let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
//     let body = new FormData();
   
//     this.http.post(this.StatusURL,body,headers)
//     .map(res => res.json())
//         .subscribe(
//             data => {
//               console.log("nnnnnnnnn: ", data);
//                //status = data.Update_DriverStateResult
               
//             },
//             err => {
//               console.log("ERROR!:  Status", err)
             
//             }
//         );
//   }
//   UpdateLocation() {
//     let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
//     let body = new FormData();
    
//     this.http.post(this.LocationURL+this.lat+'/'+this.long+'/'+'0'+'/'+'0'+'/'+'0'+'/'+'62',body,headers)
//     .map(res => res.json())
//         .subscribe(
//             data => {
              
//               //console.log("post ok");
//                //status = data.LoginResult.Success
//                console.log("Lat Long: ", status);
                
//             },
//             err => {
//               console.log("ERROR!:  Status", err)
             
//             }
//         );
       
//   }
// //Map Location
//  loadMap(){
 
//     this.geolocation.getCurrentPosition().then((position) => {
 
//       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//          console.log("LOG",position.coords.latitude);
//          console.log(position.coords.longitude);
//        this.lat = position.coords.latitude;
//        this.long = position.coords.longitude;
//       this.UpdateLocation() ;
     
//     }, (err) => {
//       console.log(err);
//     });
 
//   }

 StatusChange() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
   
    this.http.post(this.StatusURL,body,headers)
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


 
  presentAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Login',
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}
}
