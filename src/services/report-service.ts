import {Injectable} from "@angular/core";
import {REPORT} from "./mock-report";
import { Http } from '@angular/http';
import { LoginService } from "./login-service";


@Injectable()
export class ReportService {
  private report:any;

  constructor(private http:Http,private logIn : LoginService) {
    this.report = REPORT;
  }
  ApiUrl = 'http://api.techwirelanka.com/VOWServiceTest/VOW_WebService.svc/GetBookingDetailsall/';
  getAll() {
    return this.report;
  }
  history() {
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let body = new FormData();
    console.log(body);
    console.log(headers);
    return new Promise((resolve) => {
      this.http.post(this.ApiUrl+this.logIn.DriverID,body,headers)
    .map(res => res.json())
        .subscribe(
            data => {
              //console.log("post ok");
              resolve(data.GetBookingDetailAllResult);
               console.log("Test : ",data);
            },
            err => {
              console.log("ERROR!: ", err)
            })});
  }
}