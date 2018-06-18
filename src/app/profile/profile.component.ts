import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceCleint} from '../services/user.service.cleint';
import {Router} from "@angular/router";
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceCleint,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  user: User = new User();
  username;
  password;
  sections = [];
  update(user: User) {
    console.log(user);
    this.service.updateProfile(user.username, user.password, user.firstName, user.lastName, user.email)
      .then( () => console.log('update'));
        // user => this.user = user);
  }

  ngOnInit() {
    this.service.profile()
      .then(user => {
        this.user = user;
        console.log(user._id);


        this.service.findUserById(user._id)
          .then(newuser => {
            this.user = newuser;
            console.log('user');
            console.log(this.user);
          });
      });
    // 5b22b2076200cb34dd7193cf

    // this.service.findUserById('5b22b2076200cb34dd7193cf')
    //   .then(newuser => {
    //     this.user = newuser;
    //     console.log('user');
    //     console.log(this.user);
    //   });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }
  logout() {
this.service
  .logout()
  .then(() => this.router.navigate(['login']));
  }

}
