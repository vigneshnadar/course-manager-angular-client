import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';
import {CourseServiceClient} from '../services/course.service.client';
import {UserServiceCleint} from '../services/user.service.cleint';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {


  courseId = '';
  sectionName = '';
  seats = '';
  sections = [];
  isAdmin = true;
  selectedSection;
  currentCourse;

  constructor(private route: ActivatedRoute,
              private sectionService: SectionServiceClient,
              private router: Router,
              private courseService: CourseServiceClient,
              private userService: UserServiceCleint) {

    this.route.params.subscribe(params => this.loadSections(params['courseId']));
    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.courseService.findCourseById(this.courseId)
        .then(course => {
          this.currentCourse = course;
          this.sectionName = course.title + ' Section 1';
        });
      });


    this.userService.profile()
      .then(user => {
        // this.user = user;
        console.log(user._id);


        this.userService.findUserById(user._id)
          .then(newuser => {
            // this.user = newuser;
            console.log('user');
            console.log(newuser);
            this.isAdmin = newuser.admin;
          });
      });
  }

  loadSections(courseId) {
    this.courseId = courseId;
    this.sectionService.findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }
  createSection(sectionName, seats) {
    this.sectionService.createSection(this.courseId, sectionName, seats)
    .then(() => {
      this.loadSections(this.courseId);
    });
  }

  populateField(id, name, seats) {
    this.sectionName = name;
    this.seats = seats;
    this.selectedSection = id;
  }

  // deleteSection(sectionName, seats) {
  //   this.sectionService.createSection(this.courseId, sectionName, seats)
  //     .then(() => {
  //       this.loadSections(this.courseId);
  //     });
  // }

  ngOnInit() {
  }


  enroll(section) {
    console.log(section);
    // alert(section._id);
    this.sectionService.enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }




  unenroll(section) {
    console.log(section);
    alert(section._id);
    this.sectionService.unenrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }


  deleteSection(section) {
    console.log(section);
    alert(section._id);
    this.sectionService.deleteSection(section._id)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }


  editSection(sectionName, seats) {
    // console.log(section);
    alert(this.selectedSection);
    this.sectionService.editSection( this.selectedSection, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

}
