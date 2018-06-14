import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {UserServiceCleint} from '../services/user.service.cleint';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  login(username, password) {
    console.log([username, password]);
    this.service.login(username, password)
      .then(() => this.router.navigate(['profile']));

    // this.router.navigate(['profile']);
  }


  constructor(private router: Router,
              private service: UserServiceCleint) { }

  ngOnInit() {
  }



}
