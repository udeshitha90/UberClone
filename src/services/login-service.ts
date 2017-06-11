import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import {Injectable} from '@angular/core';
import {DRIVER} from './mock-driver';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { LocationTracker } from "../providers/location-tracker";
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from "../pages/home/home";


declare var google;

@Injectable()
export class LoginService {
  lat=0.0;
  long=0.0;
  private driver:any;
  
  //data:any;
  constructor(private http:Http,private alertCtrl: AlertController,
  public locationTracker: LocationTracker,public geolocation: Geolocation) {
    this.driver = DRIVER;
  }
  DriverID 
  ApiUrl = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/'
  StatusURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/Update_DriverState/30/'
  LocationURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/UpdateLocation/'
  BookingURL = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/CurrentBookingByUserID/83'


   login(userName:String,password:String):any {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
    return new Promise((resolve) => {
      this.http.post(this.ApiUrl+'Login/'+userName+'/'+password+'/0',body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              // console.log(data);
              this.DriverID=data.LoginResult.UserID;
              console.log(this.DriverID);
               status = data.LoginResult.Success
               console.log("Data: ", status);
                if (data.LoginResult.Success == 1){
                 this.DriverID=data.LoginResult.UserID;
                 //Supporting Services
                 this.loadMap()
                 this.StatusChange()
                // this. UpdateLocation()
                 resolve(true);
                  
                }
                else{
                resolve(false);
                }
                
            },
            err => {
              console.log("ERROR!: ", err)
            
             return  Promise.resolve(false);
            }
      );});
      
  }
  // signup(userName:String,tpNumber:String):any {
  //   let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  //   let body = new FormData();
  //   console.log(body);
  //   console.log(headers);
  //   return new Promise((resolve) => {
  //     this.http.post(this.ApiUrl+'CreateUsers/'+userName+'/'+tpNumber+'',body,headers)
  //   .map(res => res.json())
  //       .subscribe(
  //           data => {
  //             console.log(data);
  //               if (data.CreateUsersResult==true){
  //                   resolve(true);
  //               }
  //               else{
  //               resolve(false);
  //               }
                
  //           },
  //           err => {
  //             console.log("ERROR!: ", err)
            
  //            return  Promise.resolve(false);
  //           }
  //     );});
      
  // }
  StatusChange() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
   
    this.http.post(this.StatusURL+this.DriverID,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              console.log("nnnnnnnnn: ", data);
               //status = data.Update_DriverStateResult
               
            },
            err => {
              console.log("ERROR!:  Status", err)
             
            }
        );
  }
  UpdateLocation() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
    
    this.http.post(this.LocationURL+this.DriverID+'/'+this.lat+'/'+this.long+'/'+'0'+'/'+'0'+'/'+'0'+'/'+this.DriverID,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              
              console.log("post ok");
               status = data.LoginResult.Success
               console.log("Lat Long: ", status);
                
            },
            err => {
              console.log("ERROR!:  Status", err)
             
            }
        );
       
  }
//Map Location
 loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         console.log("LOG",position.coords.latitude);
         console.log(position.coords.longitude);
       this.lat = position.coords.latitude;
       this.long = position.coords.longitude;
      this.UpdateLocation() ;
     
    }, (err) => {
      console.log(err);
    });
 
  }

// Bookin Service
GetBooking():any {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
    return new Promise((resolve) => {
      this.http.post(this.BookingURL,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              
                console.log("Bok : ", data.CurrentBookingByUserIDResult);
                 resolve(data.CurrentBookingByUserIDResult);
            },
            err => {
              console.log("ERROR!: ", err)
            
             return  Promise.resolve(false);
            }
      );});
      
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