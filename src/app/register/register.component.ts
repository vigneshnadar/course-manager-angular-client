import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceCleint} from '../services/user.service.cleint';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: UserServiceCleint) { }

  username;
  password;
  password2;
  isAdmin = false;
  register(username, password, password2) {
    console.log([username, password, password2]);
    if ( password !== password2) {
      alert('Passwords dont match');
    } else {
      if ( username === 'admin' && password === 'admin') {
        this.isAdmin = true;
      }
      this.service.createUser(username, password, this.isAdmin)
        .then(() => this.router.navigate(['profile']));
    }
  }

  ngOnInit() {
  }

}
