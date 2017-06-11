import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// import services
import {DriverService} from '../services/driver-service';
import {JobService} from '../services/job-service';
import {ReportService} from '../services/report-service';
import {TransactionService} from '../services/transaction-service';
// end import services

// import pages
import { HomePage} from '../pages/home/home';
import { JobHistoryPage} from '../pages/job-history/job-history';
import { LoginPage} from '../pages/login/login';
import { ModalJobPage} from '../pages/modal-job/modal-job';
import { PickOffPage} from '../pages/pick-off/pick-off';
import { PickUpPage} from '../pages/pick-up/pick-up';
import { ProfilePage} from '../pages/profile/profile';
import { RegisterPage} from '../pages/register/register';
import { SettingPage} from '../pages/setting/setting';
import { SupportPage} from '../pages/support/support';
import { WalletPage} from '../pages/wallet/wallet';
// end import pages

// location 
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LoginService } from "../services/login-service";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobHistoryPage,
    LoginPage,
    ModalJobPage,
    PickOffPage,
    PickUpPage,
    ProfilePage,
    RegisterPage,
    SettingPage,
    SupportPage,
    WalletPage
],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobHistoryPage,
    LoginPage,
    ModalJobPage,
    PickOffPage,
    PickUpPage,
    ProfilePage,
    RegisterPage,
    SettingPage,
    SupportPage,
    WalletPage
],
  providers: [
    DriverService,
    BackgroundGeolocation,
    JobService,
    ReportService,
     LocationTracker,
    Geolocation,
    TransactionService,
    HttpModule,
    LoginService
    /* import services */
]
})
export class AppModule {}
