import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";
import {UserServiceCleint} from '../services/user.service.cleint';
import {SectionServiceClient} from '../services/section.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.css']
})
export class CourseGridComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private userService: UserServiceCleint,
              private sectionService: SectionServiceClient) { }

  courses: Course[] = [];
  enrolledCourses: Course[] = [];
  otherCourses: Course[] = [];
  user: User = new User();
  username;
  password;
  sections = [];
  ngOnInit() {
    // this.service.findAllCourses()
    //   .then(courses => this.courses = courses);

    this.service.findAllCourses()
      .then( courses => {
        this.courses = courses;

        this.userService.profile()
          .then(user => {
            this.user = user;
            this.userService.findUserById(user._id)
              .then(newuser => {
                this.user = newuser;
                console.log('user');
                console.log(this.user);
              });
          });
        this.sectionService
          .findSectionsForStudent()
          .then(sections => {
            this.sections = sections;

            for (let i = 0; i < this.courses.length; i++) {
              for (let j = 0; j < this.sections.length; j++) {
                if (this.sections[j].courseId === this.courses[i].id){
                  this.enrolledCourses.push(this.courses[i]);
                } else {
                  this.otherCourses.push(this.courses[i]);
                }
              }
            }// end of fr

            console.log('courses');
            console.log(this.courses);
            console.log('section');
            console.log(this.sections);
            console.log('enrolled');
            console.log(this.enrolledCourses);
            console.log('unenroll');
            console.log(this.otherCourses);
          });
      });
    // this.userService.profile()
    //   .then(user => this.user = user);

    // this.sectionService
    //   .findSectionsForStudent()
    //   .then(sections => this.sections = sections);
    // for (let i = 0; i < this.courses.length; i++) {
    //   for (let j = 0; j < this.sections.length; j++) {
    //     if (this.sections[j].courseId === this.courses[i].id){
    //       this.enrolledCourses.push(this.courses[i]);
    //     } else {
    //       this.otherCourses.push(this.courses[i]);
    //     }
    //   }
    // }// end of fr


  }

}
