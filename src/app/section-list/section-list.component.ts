import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';

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
  isAdmin = false;

  constructor(private route: ActivatedRoute,
              private sectionService: SectionServiceClient,
              private router: Router) {

    this.route.params.subscribe(params => this.loadSections(params['courseId']));

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

  ngOnInit() {
  }


  enroll(section) {
    console.log(section);
    alert(section._id);
    this.sectionService.enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

}
