import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";

@Component({
  selector: 'app-course-viewer',
  templateUrl: './course-viewer.component.html',
  styleUrls: ['./course-viewer.component.css']
})
export class CourseViewerComponent implements OnInit {

  constructor(private service: CourseServiceClient,
              private route: ActivatedRoute,
              private normalrouter: Router) {
    this.route.params.subscribe(params => this.loadCourse(params['courseId']));
  }

  course: Course = new Course();
  loadCourse(courseId) {
    this.service.findCourseById(courseId)
      .then(course => this.course = course);
  }

  home() {
    this.normalrouter.navigate(['home']);
  }

  ngOnInit() {
  }

}
