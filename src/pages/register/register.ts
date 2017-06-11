import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public nav: NavController) {

  }

  signup() {
   // this.nav.setRoot(HomePage);
  }

  login() {
    this.nav.setRoot(LoginPage);
  }
}
